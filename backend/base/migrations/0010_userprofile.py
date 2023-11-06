# Generated by Django 4.0.1 on 2022-02-20 09:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_rename_comment_commentlike_commentid_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userId', models.IntegerField(blank=True, null=True, unique=True)),
                ('gravatarURL', models.CharField(blank=True, max_length=200, null=True)),
            ],
        ),
    ]
