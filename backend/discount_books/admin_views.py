from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth import get_user_model
from django.db.models import Count, Q, Sum
from books.models import Book, Category
from users.serializers import UserSerializer
from books.serializers import BookSerializer, CategorySerializer

User = get_user_model()


class AdminDashboardViewSet(viewsets.ViewSet):
    """ViewSet for admin dashboard endpoints."""
    permission_classes = [IsAuthenticated, IsAdminUser]

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get dashboard statistics."""
        total_users = User.objects.count()
        total_books = Book.objects.count()
        available_books = Book.objects.filter(is_available=True).count()
        total_categories = Category.objects.count()
        verified_users = User.objects.filter(is_verified=True).count()

        return Response({
            'total_users': total_users,
            'verified_users': verified_users,
            'unverified_users': total_users - verified_users,
            'total_books': total_books,
            'available_books': available_books,
            'unavailable_books': total_books - available_books,
            'total_categories': total_categories,
        }, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def recent_users(self, request):
        """Get recently created users."""
        limit = request.query_params.get('limit', 10)
        users = User.objects.order_by('-created_at')[:int(limit)]
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def recent_books(self, request):
        """Get recently added books."""
        limit = request.query_params.get('limit', 10)
        books = Book.objects.order_by('-created_at')[:int(limit)]
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def users_by_category(self, request):
        """Get user statistics by category."""
        categories = Category.objects.annotate(book_count=Count('book')).order_by('-book_count')
        data = [
            {
                'name': cat.name,
                'book_count': cat.book_count,
            }
            for cat in categories
        ]
        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def books_by_condition(self, request):
        """Get book statistics by condition."""
        conditions = Book.objects.values('condition').annotate(count=Count('id')).order_by('-count')
        return Response(conditions, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def inventory_summary(self, request):
        """Get inventory summary."""
        total_inventory = Book.objects.filter(is_available=True).aggregate(
            total_quantity=Sum('quantity'),
            avg_price=Sum('selling_price') / Count('id')
        )
        
        return Response({
            'total_quantity_available': total_inventory['total_quantity'] or 0,
            'average_book_price': round(total_inventory['avg_price'] or 0, 2),
            'total_value': round(
                Book.objects.filter(is_available=True).aggregate(
                    value=Sum('selling_price')
                )['value'] or 0, 2
            ),
        }, status=status.HTTP_200_OK)


class AdminUserViewSet(viewsets.ViewSet):
    """ViewSet for admin user management."""
    permission_classes = [IsAuthenticated, IsAdminUser]

    @action(detail=False, methods=['get'])
    def list_users(self, request):
        """List users. By default only regular (non-staff) users are returned."""
        page = request.query_params.get('page', 1)
        page_size = request.query_params.get('page_size', 20)
        regular_only = request.query_params.get('regular_only', 'true').lower() != 'false'

        users = User.objects.all().order_by('-created_at')
        if regular_only:
            users = users.filter(is_staff=False, is_superuser=False)

        start = (int(page) - 1) * int(page_size)
        end = start + int(page_size)

        total = users.count()
        users_page = users[start:end]

        serializer = UserSerializer(users_page, many=True)
        return Response({
            'total': total,
            'page': page,
            'page_size': page_size,
            'results': serializer.data,
        }, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def verify_user(self, request):
        """Verify a user account."""
        user_id = request.data.get('user_id')
        try:
            user = User.objects.get(id=user_id)
            user.is_verified = True
            user.save()
            return Response({
                'message': 'User verified successfully.',
                'user': UserSerializer(user).data,
            }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({
                'error': 'User not found.',
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def deactivate_user(self, request):
        """Deactivate a regular user account."""
        user_id = request.data.get('user_id')
        try:
            user = User.objects.get(id=user_id)
            if user.is_staff or user.is_superuser:
                return Response({
                    'error': 'Admin accounts cannot be deactivated from this panel.'
                }, status=status.HTTP_403_FORBIDDEN)
            if user == request.user:
                return Response({
                    'error': 'You cannot deactivate your own account.'
                }, status=status.HTTP_403_FORBIDDEN)
            user.is_active = False
            user.save()
            return Response({
                'message': 'User deactivated successfully.',
                'user': UserSerializer(user).data,
            }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({
                'error': 'User not found.',
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def activate_user(self, request):
        """Activate a regular user account."""
        user_id = request.data.get('user_id')
        try:
            user = User.objects.get(id=user_id)
            if user.is_staff or user.is_superuser:
                return Response({
                    'error': 'Admin accounts cannot be managed from this panel.'
                }, status=status.HTTP_403_FORBIDDEN)
            user.is_active = True
            user.save()
            return Response({
                'message': 'User activated successfully.',
                'user': UserSerializer(user).data,
            }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({
                'error': 'User not found.',
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def delete_user(self, request):
        """Permanently delete a regular user account."""
        user_id = request.data.get('user_id')
        try:
            user = User.objects.get(id=user_id)
            if user.is_staff or user.is_superuser:
                return Response({
                    'error': 'Admin accounts cannot be deleted from this panel.'
                }, status=status.HTTP_403_FORBIDDEN)
            if user == request.user:
                return Response({
                    'error': 'You cannot delete your own account.'
                }, status=status.HTTP_403_FORBIDDEN)
            user.delete()
            return Response({
                'message': 'User deleted successfully.',
            }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({
                'error': 'User not found.',
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def create_user(self, request):
        """Create a new user account as admin."""
        try:
            username = request.data.get('username')
            email = request.data.get('email')
            password = request.data.get('password')
            first_name = request.data.get('first_name', '')
            last_name = request.data.get('last_name', '')
            is_staff = request.data.get('is_staff', False)
            is_verified = request.data.get('is_verified', False)

            # Validate required fields
            if not username or not email or not password:
                return Response({
                    'error': 'username, email, and password are required.'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Check if username exists
            if User.objects.filter(username=username).exists():
                return Response({
                    'error': 'Username already exists.'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Check if email exists
            if User.objects.filter(email=email).exists():
                return Response({
                    'error': 'Email already exists.'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Create user
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name,
                is_staff=is_staff,
                is_verified=is_verified,
            )

            return Response({
                'message': 'User created successfully.',
                'user': UserSerializer(user).data,
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)


class AdminBookViewSet(viewsets.ViewSet):
    """ViewSet for admin book management."""
    permission_classes = [IsAuthenticated, IsAdminUser]

    @action(detail=False, methods=['get'])
    def list_books(self, request):
        """List all books (including unavailable)."""
        page = request.query_params.get('page', 1)
        page_size = request.query_params.get('page_size', 20)
        
        books = Book.objects.all().order_by('-created_at')
        start = (int(page) - 1) * int(page_size)
        end = start + int(page_size)
        
        total = books.count()
        books_page = books[start:end]
        
        serializer = BookSerializer(books_page, many=True)
        return Response({
            'total': total,
            'page': page,
            'page_size': page_size,
            'results': serializer.data,
        }, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def delete_book(self, request):
        """Delete a book."""
        book_id = request.data.get('book_id')
        try:
            book = Book.objects.get(id=book_id)
            book.delete()
            return Response({
                'message': 'Book deleted successfully.',
            }, status=status.HTTP_200_OK)
        except Book.DoesNotExist:
            return Response({
                'error': 'Book not found.',
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def toggle_availability(self, request):
        """Toggle book availability."""
        book_id = request.data.get('book_id')
        try:
            book = Book.objects.get(id=book_id)
            book.is_available = not book.is_available
            book.save()
            return Response({
                'message': 'Book availability toggled.',
                'book': BookSerializer(book).data,
            }, status=status.HTTP_200_OK)
        except Book.DoesNotExist:
            return Response({
                'error': 'Book not found.',
            }, status=status.HTTP_404_NOT_FOUND)
