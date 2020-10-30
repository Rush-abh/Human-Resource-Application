# Create your views here.
import json

from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import EmergencyContact
from api.employee.models import Employee
from .serializer import EmergencyContactSerializer, UpdateEmergencyContactSerializer
from rest_framework import viewsets, status


class EmergencyContactViewSet(viewsets.ModelViewSet):
    #serializer_class = EmergencyContactSerializer
    #queryset = EmergencyContact.objects.all()

    '''Need to implement a logic to allow admin to view records marked as deleted in admin panel'''

    def get_queryset(self):
        if self.request.method == 'GET' and self.request.query_params.get('login_id'):
            employee = Employee.objects.get(
                Emp_ID=self.request.query_params.get('login_id'))
            return EmergencyContact.objects.filter(employee=employee)
        return EmergencyContact.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'PUT':
            return UpdateEmergencyContactSerializer
        return EmergencyContactSerializer

    def update(self, request, *args, **kwargs):
        if request.method == 'PUT':
            emergency_contact = EmergencyContact.objects.get(
                id=kwargs.pop('pk'))
            serializer = UpdateEmergencyContactSerializer(
                emergency_contact, data=request.POST)
            if serializer.is_valid():
                serializer.save()
                data = json.dumps(serializer.data, indent=4,
                                  sort_keys=True, default=str)
                return HttpResponse(data, status=status.HTTP_200_OK)
            data = json.dumps(serializer.errors, indent=4,
                              sort_keys=True, default=str)
            return HttpResponse(data, status=status.HTTP_400_BAD_REQUEST)
