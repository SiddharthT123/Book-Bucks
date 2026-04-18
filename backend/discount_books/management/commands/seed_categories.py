from django.core.management.base import BaseCommand
from books.models import Category


class Command(BaseCommand):
    help = 'Create default book categories'

    def handle(self, *args, **options):
        categories = [
            'Fiction',
            'Non-Fiction',
            'Science Fiction',
            'Mystery',
            'Romance',
            'Thriller',
            'Biography',
            'History',
            'Self-Help',
            'Business',
            'Technology',
            'Education',
            'Children',
            'Young Adult',
            'Poetry',
        ]

        created_count = 0
        for category_name in categories:
            category, created = Category.objects.get_or_create(name=category_name)
            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f'Created category: {category_name}'))
            else:
                self.stdout.write(self.style.WARNING(f'Category already exists: {category_name}'))

        self.stdout.write(
            self.style.SUCCESS(f'\nSuccessfully created {created_count} new categories')
        )
