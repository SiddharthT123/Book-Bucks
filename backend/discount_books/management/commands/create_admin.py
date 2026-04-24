import os
from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = (
        'Create a superuser account from environment variables. '
        'Requires DJANGO_SUPERUSER_USERNAME, DJANGO_SUPERUSER_EMAIL, '
        'and DJANGO_SUPERUSER_PASSWORD to be set.'
    )

    def handle(self, *args, **options):
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
            raise CommandError(
                f"Missing required environment variable(s): {', '.join(missing)}"
            )

        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.WARNING(
                f"User '{username}' already exists; no changes made."
            ))
            return

        User.objects.create_superuser(
            username=username,
            email=email,
            password=password,
        )
        self.stdout.write(self.style.SUCCESS(
            f"Superuser '{username}' created successfully."
        ))
