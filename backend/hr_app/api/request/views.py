from .models import Request
from .serializer import RequestSerializer
from rest_framework import viewsets


class RequestViewSet(viewsets.ModelViewSet):
    serializer_class = RequestSerializer
    queryset = Request.objects.all()
