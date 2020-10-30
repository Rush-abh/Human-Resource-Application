from django.shortcuts import render

# Create your views here.

from .models import Employee_Archive, ResidencyStatus_Archive
from .serializer import Employee_ArchiveSerializer, ResidencyStatus_ArchiveSerializer
from rest_framework import viewsets

class Employee_ArchiveViewSet(viewsets.ModelViewSet):
    serializer_class = Employee_ArchiveSerializer
    queryset = Employee_Archive.objects.all()

class ResidencyStatus_ArchiveViewSet(viewsets.ModelViewSet):
    serializer_class = ResidencyStatus_ArchiveSerializer
    queryset = ResidencyStatus_Archive.objects.all()
