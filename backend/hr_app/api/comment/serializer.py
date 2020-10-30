from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('goal_id', 'comment_date', 'comment_time',
                  'commenter_id', 'comment_message')
