from base.models import Post, PostVote, Subribbit
from base.serializers import PostSerializer
from base.views.baseViews import error, response
from base.traits import GetPostsWithUserVoteStatus

def checkHaveVoted(userId, postId):
    return PostVote.objects.filter(userId=userId, postId=postId).exists()

def checkSubExist(subName):
    return Subribbit.objects.filter(name=subName).exists()

def validateSort(sortField):
    allowedSorts = ['rating', 'numComments']
    return sortField in allowedSorts

def sortAndSearch(request, sub):
    sortField = request.GET.get('sort', '')
    searchValue = request.GET.get('search', '')

    queryset = Post.objects.all()

    if sub != '-':
        if not checkSubExist(sub):
            return 'Subredyssey not found'
        queryset = queryset.filter(subRibbit=sub)

    if searchValue:
        queryset = queryset.filter(title__icontains=searchValue)

    if sortField and not validateSort(sortField):
        return 'Targeted sort field not found'

    if sortField:
        queryset = queryset.order_by('-' + sortField, '-createdAt')
    else:
        queryset = queryset.order_by('-createdAt')

    return queryset

def show(request, sub):
    posts = sortAndSearch(request, sub)
    
    if isinstance(posts, str):
        return error(posts)

    serializedPosts = PostSerializer(posts, many=True).data
    copySerializedPosts = list(serializedPosts)

    returnPosts = GetPostsWithUserVoteStatus.get(copySerializedPosts, request.user)

    return response('All posts retrieved', returnPosts)
