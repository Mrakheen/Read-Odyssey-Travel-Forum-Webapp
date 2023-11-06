from rest_framework import serializers
from base.models import Post, PostVote
from base.traits import GetHumanTimeDifferenceToNow

def get_post_total_votes(post_id):
    find_post = Post.objects.get(id=post_id)
    find_post_votes = PostVote.objects.filter(postId=find_post.id)

    total_votes = 0

    for vote in find_post_votes:
        total_votes += vote.vote

    return total_votes

def get_post_number_of_voters(post_id):
    find_post_votes = PostVote.objects.filter(postId=post_id)
    return len(find_post_votes)

class PostSerializer(serializers.ModelSerializer):
    humanTimeDiffCreatedAt = serializers.SerializerMethodField(read_only=True)
    numOfComments = serializers.SerializerMethodField(read_only=True)
    totalVotes = serializers.SerializerMethodField(read_only=True)
    votesReceived = serializers.SerializerMethodField(read_only=True)
    userName = serializers.SerializerMethodField(read_only=True)
    image = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=True, required=False)
    
    class Meta:
        model = Post
        fields = '__all__'

    def get_humanTimeDiffCreatedAt(self, instance):
        """
        Get the human-readable time difference between post creation and now.
        """
        return GetHumanTimeDifferenceToNow.get(instance.createdAt)

    def get_numOfComments(self, instance):
        """
        Get the number of comments on the post.
        """
        return len(instance.comment_set.all())

    def get_totalVotes(self, instance):
        """
        Get the total votes (upvotes - downvotes) for the post.
        """
        return get_post_total_votes(instance.id)

    def get_votesReceived(self, instance):
        """
        Get the number of users who voted on the post.
        """
        return get_post_number_of_voters(instance.id)
    
    def get_userName(self, instance):
        """
        Get the username of the post's owner.
        """
        return instance.user.username
