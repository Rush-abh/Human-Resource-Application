from .models import TeamMember
from .serializer import TeamMemberSerializer
from rest_framework import viewsets


class TeamMemberViewSet(viewsets.ModelViewSet):
    serializer_class = TeamMemberSerializer
    queryset = TeamMember.objects.all()
