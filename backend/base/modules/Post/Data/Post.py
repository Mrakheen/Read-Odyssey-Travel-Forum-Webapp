from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator

class Post(models.Model):
    # Whenever the user that created this post got deleted, we set it to null so the product dont just dissapear
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    nsfw = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(
        null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    numComments = models.IntegerField(
        null=True, blank=True, default=0)
    
    image = models.ImageField(upload_to = 'image_video/',blank=True,null=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif', 'mp4', 'avi', 'mkv'])])
    subRibbit = models.CharField(max_length=20, null=True, blank=True)
    locationTagLink = models.TextField(null=True, blank=True)
    locationName = models.TextField(null=True, blank=True)

    def __str__(self):
        return str(self.id)
    
    