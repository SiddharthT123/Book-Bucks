import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'discount_books.settings')
django.setup()

from books.models import Book
from django.contrib.auth import get_user_model

User = get_user_model()

# Check existing books with null seller
books_with_null_seller = Book.objects.filter(seller__isnull=True).count()
print(f"Books with NULL seller: {books_with_null_seller}")

if books_with_null_seller > 0:
    # Get admin user
    admin = User.objects.get(username='admin')
    print(f"Admin user: {admin.id}")
    
    # Update all null seller books to admin
    updated = Book.objects.filter(seller__isnull=True).update(seller=admin)
    print(f"Updated {updated} books to admin seller")
else:
    print("No books with NULL seller found")

# List all books
all_books = Book.objects.all()
print(f"\nTotal books: {all_books.count()}")
for book in all_books:
    print(f"  - {book.title} (seller: {book.seller.username if book.seller else 'NULL'})")
