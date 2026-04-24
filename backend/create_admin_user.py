"""Standalone script to create a superuser.

Reads credentials from environment variables:
    DJANGO_SUPERUSER_USERNAME
    DJANGO_SUPERUSER_EMAIL
    DJANGO_SUPERUSER_PASSWORD

Prefer `python manage.py create_admin` when possible; this script exists
for environments where running management commands is inconvenient.
"""
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'discount_books.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

missing = [
    name for name, value in (
        ('DJANGO_SUPERUSER_USERNAME', username),
        ('DJANGO_SUPERUSER_EMAIL', email),
        ('DJANGO_SUPERUSER_PASSWORD', password),
    ) if not value
]
if missing:
    sys.stderr.write(
        f"Error: missing required environment variable(s): {', '.join(missing)}\n"
    )
    sys.exit(1)

if User.objects.filter(username=username).exists():
    print(f"User '{username}' already exists; no changes made.")
else:
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f"Superuser '{username}' created successfully.")
