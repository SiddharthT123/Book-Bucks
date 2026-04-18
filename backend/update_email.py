import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'discount_books.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

admin_user = User.objects.get(username='admin')
admin_user.email = 'udbhavtanikella@gmail.com'
admin_user.save()
print(f'✓ Admin email updated to: {admin_user.email}')
