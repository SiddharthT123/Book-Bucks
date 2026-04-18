import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'discount_books.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@discountbooks.com', 'admin123')
    print('✓ Admin user created successfully!')
    print('  Username: admin')
    print('  Email: admin@discountbooks.com')
    print('  Password: admin123')
else:
    print('✓ Admin user already exists')
