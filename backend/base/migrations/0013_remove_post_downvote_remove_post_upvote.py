# Generated by Django 4.0.1 on 2022-02-26 23:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0012_post_totalvote_alter_post_downvote'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='downVote',
        ),
        migrations.RemoveField(
            model_name='post',
            name='upVote',
        ),
    ]
