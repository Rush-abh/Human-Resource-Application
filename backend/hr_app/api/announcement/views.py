from django.shortcuts import render

# Create your views here.

from .models import Announcement
from .serializer import AnnouncementSerializer
from rest_framework import viewsets


class AnnouncementViewSet(viewsets.ModelViewSet):
    serializer_class = AnnouncementSerializer
    queryset = Announcement.objects.all()
