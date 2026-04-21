from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.conf import settings
from .models import CustomUser, EmailVerificationToken
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    LoginSerializer,
    ChangePasswordSerializer,
)


def _send_verification_email(user, token_obj):
    verify_url = f"{settings.FRONTEND_URL}/verify-email?token={token_obj.token}"
    send_mail(
        subject="Verify your Discount Books account",
        message=(
            f"Hi {user.first_name or user.username},\n\n"
            f"Please verify your email address by clicking the link below:\n\n"
            f"{verify_url}\n\n"
            f"This link expires in 24 hours.\n\n"
            f"If you didn't create an account, you can ignore this email."
        ),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )


class AuthViewSet(viewsets.ViewSet):
    """ViewSet for authentication endpoints."""
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'])
    def register(self, request):
        """
        Register a new user and send a verification email.

        Expected fields:
        - username (str)
        - email (str)
        - password (str)
        - password_confirm (str)
        - first_name (str, optional)
        - last_name (str, optional)
        """
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            token_obj = EmailVerificationToken.create_for_user(user)
            try:
                _send_verification_email(user, token_obj)
            except Exception:
                pass  # console backend will print; SMTP failures shouldn't block registration

            return Response({
                'message': 'Registration successful. Please check your email to verify your account.',
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def verify_email(self, request):
        """Verify a user's email using the token sent to their address."""
        token_str = request.data.get('token', '').strip()
        if not token_str:
            return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token_obj = EmailVerificationToken.objects.select_related('user').get(token=token_str)
        except EmailVerificationToken.DoesNotExist:
            return Response({'error': 'Invalid verification link.'}, status=status.HTTP_400_BAD_REQUEST)

        if not token_obj.is_valid():
            return Response({'error': 'This verification link has expired or already been used.'}, status=status.HTTP_400_BAD_REQUEST)

        user = token_obj.user
        user.is_verified = True
        user.save(update_fields=['is_verified'])

        token_obj.is_used = True
        token_obj.save(update_fields=['is_used'])

        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'Email verified successfully.',
            'user': UserSerializer(user).data,
            'token': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def resend_verification(self, request):
        """Resend the verification email to an unverified user."""
        email = request.data.get('email', '').strip()
        if not email:
            return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            # Return success to avoid user enumeration
            return Response({'message': 'If that email exists, a verification link has been sent.'}, status=status.HTTP_200_OK)

        if user.is_verified:
            return Response({'error': 'This account is already verified.'}, status=status.HTTP_400_BAD_REQUEST)

        token_obj = EmailVerificationToken.create_for_user(user)
        try:
            _send_verification_email(user, token_obj)
        except Exception:
            pass

        return Response({'message': 'If that email exists, a verification link has been sent.'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def login(self, request):
        """
        Login a user.
        
        Expected fields:
        - email (str)
        - password (str)
        """
        serializer = LoginSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'message': 'Login successful.',
                'user': {
                    **UserSerializer(user).data,
                    'is_admin': user.is_staff,   
    },
                'token': str(refresh.access_token),
                'refresh': str(refresh),
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def logout(self, request):
        """
        Logout a user (token blacklist - implement if using token blacklist).
        """
        return Response({
            'message': 'Logout successful.',
        }, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        """
        Get current user profile.
        """
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=['put'], permission_classes=[IsAuthenticated])
    def update_profile(self, request):
        """
        Update current user profile.
        """
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Profile updated successfully.',
                'user': serializer.data,
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def change_password(self, request):
        """
        Change user password.
        
        Expected fields:
        - old_password (str)
        - new_password (str)
        - new_password_confirm (str)
        """
        user = request.user
        serializer = ChangePasswordSerializer(data=request.data)
        
        if serializer.is_valid():
            # Verify old password
            if not user.check_password(serializer.data['old_password']):
                return Response({
                    'old_password': 'Incorrect password.'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Set new password
            user.set_password(serializer.data['new_password'])
            user.save()
            
            return Response({
                'message': 'Password changed successfully.',
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for User model."""
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return queryset based on permissions."""
        if self.action == 'list':
            # Only allow users to see their own profile
            return CustomUser.objects.filter(id=self.request.user.id)
        return CustomUser.objects.all()

    @action(detail=True, methods=['get'])
    def profile(self, request, pk=None):
        """Get user profile by ID."""
        try:
            user = self.get_object()
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        except CustomUser.DoesNotExist:
            return Response({
                'error': 'User not found.'
            }, status=status.HTTP_404_NOT_FOUND)
