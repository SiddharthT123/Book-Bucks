from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0004_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='is_approved',
            field=models.BooleanField(default=False),
        ),
    ]
