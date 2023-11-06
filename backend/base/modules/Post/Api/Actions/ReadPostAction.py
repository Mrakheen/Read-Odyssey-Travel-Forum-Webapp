from base.models import Post, PostVote
from base.serializers import PostSerializer
from base.views.baseViews import error, response
from base.traits import GetSinglePostWithUserVoteStatus

def checkPostId(id):
    return Post.objects.filter(id=id).exists()

def checkHaveVoted(userId, postId):
    return PostVote.objects.filter(userId=userId, postId=postId).exists()

def read(request, pk):
    if not checkPostId(pk):
        return error('Post ID not found')

    post = Post.objects.get(id=pk)
    serializer = PostSerializer(post, many=False).data

    returnDictionary = GetSinglePostWithUserVoteStatus.get(serializer, request.user)

    return response('Post retrieved', returnDictionary)
