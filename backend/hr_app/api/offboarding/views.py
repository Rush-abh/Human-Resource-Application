from django.shortcuts import render
from rest_framework import viewsets
from .models import Offboarding
from .serializer import OffboardingSerializer

# Create your views here.
class OffboardingViewSet(viewsets.ModelViewSet):
    serializer_class = OffboardingSerializer
    queryset = Offboarding.objects.all()
    