from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = 'Create a superuser account for admin'

    def handle(self, *args, **options):
        # Check if admin already exists
        if User.objects.filter(username='admin').exists():
            self.stdout.write(self.style.WARNING('Admin user already exists'))
            return

        # Create superuser
        User.objects.create_superuser(
            username='admin',
            email='admin@discountbooks.com',
            password='admin123',
            first_name='Admin',
            last_name='User'
        )

        self.stdout.write(
            self.style.SUCCESS('Successfully created admin user with:')
        )
        self.stdout.write('  Username: admin')
        self.stdout.write('  Email: admin@discountbooks.com')
        self.stdout.write('  Password: admin123')
        self.stdout.write('  URL: http://localhost:8000/admin/')
