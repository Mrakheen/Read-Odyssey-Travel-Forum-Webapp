# Generated by Django 4.1.3 on 2022-11-28 01:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0020_alter_post_rating'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='numComments',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]