from django.shortcuts import render

# Create your views here.

from .models import Administrator
from .serializer import AdministratorSerializer
from rest_framework import viewsets


class AdministratorViewSet(viewsets.ModelViewSet):
    serializer_class = AdministratorSerializer
    queryset = Administrator.objects.all()
