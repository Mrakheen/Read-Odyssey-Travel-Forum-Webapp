# Generated by Django 4.0.1 on 2022-02-11 03:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_post_subribbit'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='userName',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
