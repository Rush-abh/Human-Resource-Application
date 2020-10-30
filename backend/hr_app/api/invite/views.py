from django.shortcuts import render

# Create your views here.

from .models import Invite
from .serializer import InviteSerializer
from rest_framework import viewsets


class InviteViewSet(viewsets.ModelViewSet):
    serializer_class = InviteSerializer
    queryset = Invite.objects.all()
