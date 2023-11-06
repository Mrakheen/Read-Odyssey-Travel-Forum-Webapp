from base.models import Post
from base.serializers import PostSerializer
from base.views.baseViews import error, response
from better_profanity import profanity

def checkPostId(id):
    return Post.objects.filter(id=id).exists()

def update(request, pk, image=None):
    # If 'image' is not provided in the request, 'image' will be None by default.

    if not checkPostId(pk):
        return error('Post ID not found')

    post = Post.objects.get(id=pk)

    # Update post attributes based on the data from the request.
    post.title = profanity.censor(request.data['title'])
    post.content = profanity.censor(request.data['content'])
    post.nsfw = request.data['nsfw']

    if image:
        # Handle the image update
        new_image = request.FILES.get('image')

        if post.image:
            # If the post already has an image, delete it before updating.
            post.image.delete()

        post.image = new_image

    # Save the updated post to the database.
    post.save()

     # Serialize the updated post using PostSerializer.
    serialized_post = PostSerializer(post).data

    # Return the serialized post in the response.
    return response('Post updated', data=serialized_post)
