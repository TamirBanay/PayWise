# Generated by Django 4.1.7 on 2023-05-06 14:53

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mysite', '0026_alter_vouchers_dateofacquire_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vouchers',
            name='dateOfAcquire',
            field=models.DateTimeField(default=datetime.datetime(2023, 5, 6, 17, 53, 3, 922603)),
        ),
        migrations.AlterField(
            model_name='vouchers',
            name='dateOfExpiry',
            field=models.DateTimeField(default=datetime.datetime(2023, 5, 6, 17, 53, 3, 922603)),
        ),
    ]