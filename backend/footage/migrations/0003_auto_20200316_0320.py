# Generated by Django 2.2.7 on 2020-03-16 03:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('footage', '0002_auto_20200316_0000'),
    ]

    operations = [
        migrations.AlterField(
            model_name='footagehandler',
            name='FileField',
            field=models.FileField(upload_to='mediaLib/'),
        ),
    ]
