from .models import Notification
from .serializer import NotificationSerializer
from rest_framework import viewsets


class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()
