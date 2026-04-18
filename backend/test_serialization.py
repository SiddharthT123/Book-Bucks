import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'discount_books.settings')
django.setup()

from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from books.models import Book
import json

User = get_user_model()

# Get admin user
admin = User.objects.get(username='admin')
print(f"Admin user: {admin.username} (is_staff: {admin.is_staff})")

# Generate token
refresh = RefreshToken.for_user(admin)
token = str(refresh.access_token)
print(f"\nToken generated (first 50 chars): {token[:50]}...")

# Test the serialization of books by the admin
books = Book.objects.filter(seller=admin)
print(f"\nBooks for admin: {books.count()}")

# Try to serialize
from books.serializers import BookSerializer
serializer = BookSerializer(books, many=True)
print(f"Serialized data: {json.dumps(serializer.data, indent=2, default=str)}")
