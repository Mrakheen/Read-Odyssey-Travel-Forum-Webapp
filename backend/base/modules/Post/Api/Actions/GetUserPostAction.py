from base.models import Post, User
from base.serializers import PostSerializer
from base.views.baseViews import error, response
from base.traits import GetPostsWithUserVoteStatus

def validateSort(sortField):
    allowedSorts = ['rating', 'numComments']
    if sortField not in allowedSorts:
        return False
    return True

def sort(request, user):
    sortField = request.GET.get('sort', '')

    if sortField and not validateSort(sortField):
        return 'Targeted sort field not found'

    queryset = Post.objects.filter(user=user)
    
    if sortField:
        queryset = queryset.order_by('-' + sortField, '-createdAt')
    else:
        queryset = queryset.order_by('-createdAt')

    return queryset

def checkUsername(username):
    return User.objects.filter(username=username).exists()

def get(request, username):
    if not checkUsername(username):
        return error('Username not found')

    user = User.objects.get(username=username)
    posts = sort(request, user)

    if isinstance(posts, str):
        return error(posts)

    serialized = PostSerializer(posts, many=True).data
    copySerializedPosts = list(serialized)

    returnPosts = GetPostsWithUserVoteStatus.get(copySerializedPosts, request.user)

    return response('User posts retrieved', returnPosts)
