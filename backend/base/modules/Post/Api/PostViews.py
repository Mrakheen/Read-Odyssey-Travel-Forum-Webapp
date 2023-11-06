from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.parsers import MultiPartParser, FormParser
from base.models import Post

from base.modules.Post.Api.Validators import (
    CreatePostValidator,
    UpdatePostValidator,
)
from base.modules.Post.Api.Actions import (
    CreatePostAction,
    ReadPostAction,
    UpdatePostAction,
    ShowAllPostAction,
    DeletePostAction,
    GetUserPostAction,
)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def createPost(request):
    validation_result = CreatePostValidator.validate(request)
    if validation_result is not None:
        return validation_result

    # Handle image upload
    image = request.data.get('image')  # Assuming the field name for the image is 'image'

    # Create the post using the CreatePostAction
    response = CreatePostAction.create(request, image=image)

    return response



@api_view(['GET'])
def readPost(request, pk):
    return ReadPostAction.read(request, pk)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updatePost(request, pk):
    # Handle image upload
    image = request.data.get('image')  # Assuming the field name for the image is 'image'

    if UpdatePostValidator.validate(request) is not None:
        return UpdatePostValidator.validate(request)

    return UpdatePostAction.update(request, pk, image=image)


@api_view(['GET'])
def showAllPost(request, sub):
    return ShowAllPostAction.show(request, sub)

from rest_framework.response import Response
from rest_framework import status

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletePost(request, pk):
    try:
        post = Post.objects.get(id=pk)
    except Post.DoesNotExist:
        return Response({"message": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

    # Close the file to release any locks
    post.image.close()

    # Delete the post
    response = DeletePostAction.delete(request, pk)
    
    if response.status_code == 200:
        # Successfully deleted the post, now redirect to the original subreddit page
        return Response({"message": "Post deleted successfully"}, status=status.HTTP_200_OK)

    # Return the response in case of an error during deletion
    return response

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getUserPost(request, username):
    return GetUserPostAction.get(request, username)
