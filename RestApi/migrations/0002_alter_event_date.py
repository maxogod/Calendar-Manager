# Generated by Django 4.1.5 on 2023-02-03 15:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('RestApi', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='date',
            field=models.DateField(),
        ),
    ]
