from base.models import Post, Subribbit, SubribbitMember, UserProfile, User
from base.serializers import PostSerializer
from base.views.baseViews import error, response
from base.traits import NotifyUser
from better_profanity import profanity
from rest_framework import status 

def sendNotification(postCreator, subribbitOwner, subribbitName, subribbit):
    if postCreator.id != subribbitOwner.id:
        title = 'New post on your Subredyssey'
        text = '' + postCreator.username + ' has just posted on your Subredyssey r/' + subribbitName 
        link = '/community/' + str(subribbit.name)
        NotifyUser.send(subribbitOwner, title, text, link)

def checkSubribbitExist(subribbitName):
    checkSubribbitExist = Subribbit.objects.filter(name = subribbitName)

    if len(checkSubribbitExist) > 0:
        return True
    else:
        return False

def checkUserIsInSubribbit(user, subribbit):
    if subribbit.ownerId == user.id:
        return True

    userprofile = UserProfile.objects.get(userId = user.id)
    checkMemberExist = SubribbitMember.objects.filter(userprofile = userprofile, subribbit = subribbit)

    if len(checkMemberExist) > 0:
        return True
    else:
        return False

@staticmethod
def create(request, image=None):  # Accept the 'image' argument with a default value of None
    user = request.user

    # Access the fields directly from request.data
    title = profanity.censor(request.data.get('title', ''))
    content = profanity.censor(request.data.get('content', ''))
    nsfw = request.data.get('nsfw', '')

    if request.data['subribbit'] != 'home':
        if not checkSubribbitExist(request.data['subribbit']):
            return error('Subredyssey name not found', status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)

        subribbit = Subribbit.objects.get(name=request.data['subribbit'])

        if not checkUserIsInSubribbit(user, subribbit):
            return error('You are not assigned to this subredyssey', status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)

    # Check for uploaded image
    if image:  # Check if 'image' is provided
        # You can add additional validation for image files here
        # For example, check file size, file type, etc.

        # Create the post with the image
        post = Post(
            user=user,
            title=title,
            content=content,
            nsfw=nsfw,
            subRibbit=request.data['subribbit'],
            image=image  # Save the uploaded image
        )
    else:
        # Create the post without an image
        post = Post(
            user=user,
            title=title,
            content=content,
            nsfw=nsfw,
            subRibbit=request.data['subribbit']
        )

    post.save()

    userProfile = UserProfile.objects.get(userId=user.id)
    userProfile.numPosts += 1
    userProfile.save()

    serializer = PostSerializer(post, many=False)

    if request.data['subribbit'] != 'home':
        subribbit = Subribbit.objects.get(name=request.data['subribbit'])
        sendNotification(post.user, User.objects.get(id=subribbit.ownerId), subribbit.name, subribbit)

    return response('Post created', serializer.data)

