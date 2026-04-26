from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model."""
    
    class Meta:
        model = CustomUser
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'phone_number',
            'address',
            'city',
            'state',
            'postal_code',
            'country',
            'bio',
            'profile_picture',
            'is_active',
            'is_verified',
            'is_staff',
            'is_superuser',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'is_active', 'is_verified', 'is_staff', 'is_superuser']


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""
    password = serializers.CharField(write_only=True, min_length=6)
    password_confirm = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = CustomUser
        fields = [
            'username',
            'email',
            'password',
            'password_confirm',
            'first_name',
            'last_name',
        ]

    def validate(self, data):
        """Validate password confirmation."""
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({
                'password_confirm': 'Passwords do not match.'
            })
        
        # Check if username exists
        if CustomUser.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError({
                'username': 'Username already exists.'
            })
        
        # Check if email exists
        if CustomUser.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({
                'email': 'Email already exists.'
            })
        
        return data

    def create(self, validated_data):
        """Create and return a new user instance."""
        validated_data.pop('password_confirm')
        user = CustomUser.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    """Serializer for user login."""
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        """Validate credentials."""
        email = data.get('email')
        password = data.get('password')

        # Find user by email
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError({
                'email': 'No account found with this email.'
            })

        # Check if account is deactivated before authenticating
        if not user.is_active:
            raise serializers.ValidationError({
                'error': 'Your account has been deactivated. Please contact admin@books4bucks.com for assistance.'
            })

        # Authenticate user
        user = authenticate(username=user.username, password=password)
        if not user:
            raise serializers.ValidationError({
                'password': 'Invalid password.'
            })

        data['user'] = user
        return data


class ChangePasswordSerializer(serializers.Serializer):
    """Serializer for changing password."""
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=6)
    new_password_confirm = serializers.CharField(write_only=True, min_length=6)

    def validate(self, data):
        """Validate passwords."""
        if data['new_password'] != data['new_password_confirm']:
            raise serializers.ValidationError({
                'new_password_confirm': 'Passwords do not match.'
            })
        return data
