from .models import Teams
from .serializer import TeamsSerializer
from rest_framework import viewsets


class TeamsViewSet(viewsets.ModelViewSet):
    serializer_class = TeamsSerializer
    queryset = Teams.objects.all()
