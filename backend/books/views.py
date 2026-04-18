from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Q
from .models import Book, Category, Message
from .serializers import BookSerializer, CategorySerializer, MessageSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    """ViewSet for Book Category."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


class BookViewSet(viewsets.ModelViewSet):
    """ViewSet for Book model."""
    serializer_class = BookSerializer
    
    def get_queryset(self):
        """Filter queryset based on action."""
        if self.action in ['list', 'search', 'best_deals']:
            # Public endpoints show only available AND admin-approved books
            return Book.objects.filter(is_available=True, is_approved=True)
        return Book.objects.all()
    
    def get_permissions(self):
        """Set permissions based on action."""
        if self.action in ['create', 'update', 'partial_update', 'destroy', 'my_books']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        """Set seller to current user, mark available, and set pending approval."""
        serializer.save(seller=self.request.user, is_available=True, is_approved=False)

    def check_object_permissions(self, request, obj):
        """Check if user can modify this book (only seller can)."""
        if self.action in ['update', 'partial_update', 'destroy']:
            if obj.seller != request.user and not request.user.is_staff:
                from rest_framework.exceptions import PermissionDenied
                raise PermissionDenied("You can only edit books you have listed.")
        super().check_object_permissions(request, obj)

    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def search(self, request):
        """
        Search books by title, author, or description.
        Query params:
        - q: search query
        - category: category filter
        - min_price: minimum price
        - max_price: maximum price
        - condition: condition filter
        """
        queryset = self.get_queryset()
        
        # Search query
        search_query = request.query_params.get('q', None)
        if search_query:
            queryset = queryset.filter(
                title__icontains=search_query
            ) | queryset.filter(
                author__icontains=search_query
            ) | queryset.filter(
                description__icontains=search_query
            )
        
        # Category filter
        category = request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category__iexact=category)
        
        # Price range filter
        min_price = request.query_params.get('min_price', None)
        max_price = request.query_params.get('max_price', None)
        
        if min_price:
            queryset = queryset.filter(selling_price__gte=min_price)
        if max_price:
            queryset = queryset.filter(selling_price__lte=max_price)
        
        # Condition filter
        condition = request.query_params.get('condition', None)
        if condition:
            queryset = queryset.filter(condition=condition)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_books(self, request):
        """Get user's own book listings."""
        queryset = Book.objects.filter(seller=request.user).order_by('-created_at')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def best_deals(self, request):
        """Get books with highest discount percentage."""
        queryset = self.get_queryset().order_by('-selling_price')[:10]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def pending_approval(self, request):
        """Admin-only: list all books awaiting approval."""
        if not (request.user.is_staff or request.user.is_superuser):
            return Response({'error': 'Admin access required.'}, status=status.HTTP_403_FORBIDDEN)
        queryset = Book.objects.filter(is_approved=False, is_available=True).select_related('seller').order_by('-created_at')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def approve(self, request, pk=None):
        """Admin-only: approve a book listing so it appears on the marketplace."""
        if not (request.user.is_staff or request.user.is_superuser):
            return Response({'error': 'Admin access required.'}, status=status.HTTP_403_FORBIDDEN)
        book = self.get_object()
        book.is_approved = True
        book.save()
        serializer = self.get_serializer(book)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def reject(self, request, pk=None):
        """Admin-only: reject and remove a book listing."""
        if not (request.user.is_staff or request.user.is_superuser):
            return Response({'error': 'Admin access required.'}, status=status.HTTP_403_FORBIDDEN)
        book = self.get_object()
        book.delete()
        return Response({'message': 'Book listing rejected and removed.'}, status=status.HTTP_200_OK)


class MessageViewSet(viewsets.ViewSet):
    """ViewSet for buyer-seller messaging."""
    permission_classes = [IsAuthenticated]

    def create(self, request):
        """Send or reply to a message about a book."""
        from django.contrib.auth import get_user_model
        User = get_user_model()

        book_id = request.data.get('book')
        content = request.data.get('content', '').strip()
        recipient_username = request.data.get('recipient_username', None)

        if not book_id or not content:
            return Response({'error': 'book and content are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            book = Book.objects.get(pk=book_id)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Determine recipient:
        # - If recipient_username is provided (seller replying to buyer), use that user
        # - Otherwise default to the book's seller (buyer initiating conversation)
        if recipient_username:
            try:
                recipient = User.objects.get(username=recipient_username)
            except User.DoesNotExist:
                return Response({'error': 'Recipient not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            recipient = book.seller

        # Prevent messaging yourself
        if recipient == request.user:
            return Response({'error': 'You cannot send a message to yourself.'}, status=status.HTTP_400_BAD_REQUEST)

        message = Message.objects.create(
            book=book,
            sender=request.user,
            recipient=recipient,
            content=content,
        )
        serializer = MessageSerializer(message)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def inbox(self, request):
        """Get messages. Admins see all messages; regular users see only their received messages."""
        if request.user.is_staff or request.user.is_superuser:
            messages = Message.objects.all().select_related('book', 'sender', 'recipient').order_by('-created_at')
        else:
            messages = Message.objects.filter(recipient=request.user).select_related('book', 'sender')
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    def sent(self, request):
        """Get all messages sent by the current user. Admins see all sent messages."""
        if request.user.is_staff or request.user.is_superuser:
            messages = Message.objects.all().select_related('book', 'sender', 'recipient').order_by('-created_at')
        else:
            messages = Message.objects.filter(sender=request.user).select_related('book', 'recipient')
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    def thread(self, request, book_id=None):
        """Get the full message thread. Admins can see all threads."""
        try:
            book = Book.objects.get(pk=book_id)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found.'}, status=status.HTTP_404_NOT_FOUND)

        if request.user.is_staff or request.user.is_superuser:
            # Admins see all messages for this book
            messages = Message.objects.filter(book=book).select_related('sender', 'recipient')
        else:
            messages = Message.objects.filter(
                book=book
            ).filter(
                Q(sender=request.user) | Q(recipient=request.user)
            ).select_related('sender', 'recipient')

        # Mark received messages as read
        messages.filter(recipient=request.user, is_read=False).update(is_read=True)

        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    def unread_count(self, request):
        """Get unread message count. Admins see total unread across all users."""
        if request.user.is_staff or request.user.is_superuser:
            count = Message.objects.filter(is_read=False).count()
        else:
            count = Message.objects.filter(recipient=request.user, is_read=False).count()
        return Response({'unread_count': count})
