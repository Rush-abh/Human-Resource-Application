from .models import Comment
from .serializer import CommentSerializer
from rest_framework import viewsets


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
