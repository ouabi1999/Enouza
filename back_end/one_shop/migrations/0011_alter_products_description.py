# Generated by Django 5.1 on 2024-12-28 01:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('one_shop', '0010_alter_products_sizes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products',
            name='description',
            field=models.JSONField(),
        ),
    ]