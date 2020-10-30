from .models import TimeSheetRequest
from .serializer import TimeSheetRequestSerializer
from rest_framework import viewsets


class TimeSheetRequestViewSet(viewsets.ModelViewSet):
    serializer_class = TimeSheetRequestSerializer
    queryset = TimeSheetRequest.objects.all()
