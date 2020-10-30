from .serializers import LeaveSerializer
from rest_framework import viewsets
from .models import Leave

# CRUDL operations for login details
class LeaveViewSet(viewsets.ModelViewSet):
    serializer_class = LeaveSerializer
    queryset = Leave.objects.all()