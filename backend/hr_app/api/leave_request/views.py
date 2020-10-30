from .models import LeaveRequest
from .serializer import LeaveRequestSerializer
from rest_framework import viewsets


class LeaveRequestViewSet(viewsets.ModelViewSet):
    serializer_class = LeaveRequestSerializer
    queryset = LeaveRequest.objects.all()
