import json

from django.http import HttpResponse
from django.shortcuts import render


# Create your views here.
from django.views.decorators.csrf import csrf_exempt

from api.project.models import Project
from api.project.serializer import ProjectSerializerWithManager
from api.teammember.models import TeamMember
from .models import Employee, MedicalProfile, GeneralPractitioner, Compensation, ResidencyStatus, Payroll
from .serializer import EmployeeSerializer, UpdateBasicInfoSerializer, MedicalProfileSerializer, \
    UpdateMedicalProfileSerializer, GeneralPractitionerSerializer, UpdateGeneralPractitionerSerializer, \
    CompensationSerializer, CreateEmployeeSerializer, UpdateProfileContactSerializer, ResidencyStatusSerializer, \
    PayrollSerializer
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated


class EmployeeViewSet(viewsets.ModelViewSet):
    #serializer_class = EmployeeSerializer
    # queryset = Employee.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST' or self.request.method == 'PUT':
            return CreateEmployeeSerializer
        return EmployeeSerializer

    def get_queryset(self):
        if self.request.method == 'GET' and self.request.query_params.get('login_id'):
            return Employee.objects.filter(login=self.request.query_params.get('login_id'))
        return Employee.objects.all()


class BasicInfoViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Employee.objects.filter(login=self.request.user.LoginID)

    def get_serializer_class(self):
        if self.request.method == 'PUT':
            return UpdateBasicInfoSerializer
        return EmployeeSerializer

    def update(self, request, *args, **kwargs):
        if request.method == 'PUT':
            basic_info = Employee.objects.get(
                Emp_ID=request.POST.get('Emp_ID'))
            serializer = UpdateBasicInfoSerializer(
                basic_info, data=request.POST)
            if serializer.is_valid():
                serializer.save()
                data = json.dumps(serializer.data, indent=4, sort_keys=True)
                return HttpResponse(data, status=status.HTTP_200_OK)


# @csrf_exempt
class MedicalProfileViewSet(viewsets.ModelViewSet):

    def get_queryset(self):
        if self.request.method == 'GET' and self.request.query_params.get('login_id'):
            return MedicalProfile.objects.filter(Login=self.request.query_params.get('login_id'))
        return MedicalProfile.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'PUT':
            return UpdateMedicalProfileSerializer
        return MedicalProfileSerializer

    def update(self, request, *args, **kwargs):
        if request.method == 'PUT':
            medical_profile = MedicalProfile.objects.get(
                id=request.POST.get('id'))
            serializer = UpdateMedicalProfileSerializer(
                medical_profile, data=request.POST)
            if serializer.is_valid():
                serializer.save()
                data = json.dumps(serializer.data, indent=4,
                                  sort_keys=True, default=str)
                return HttpResponse(data, status=status.HTTP_200_OK)


class GeneralPractitionerViewSet(viewsets.ModelViewSet):
    # serializer_class = GeneralPractitionerSerializer
    # queryset = GeneralPractitioner.objects.all()

    def get_serializer_class(self):
        return GeneralPractitionerSerializer

    def get_queryset(self):
        if self.request.query_params.get('login_id'):
            employee = Employee.objects.get(
                login=self.request.query_params.get('login_id'))
            return GeneralPractitioner.objects.filter(employee=employee)
        return GeneralPractitioner.objects.all()

    def update(self, request, *args, **kwargs):
        if request.method == 'PUT':
            general_practitioner = GeneralPractitioner.objects.get(
                id=kwargs.pop('pk'))
            serializer = UpdateGeneralPractitionerSerializer(
                general_practitioner, data=request.POST)
            if serializer.is_valid():
                serializer.save()
                data = json.dumps(serializer.data, indent=4,
                                  sort_keys=True, default=str)
                return HttpResponse(data, status=status.HTTP_200_OK)
            else:
                data = json.dumps(serializer.errors, indent=4,
                                  sort_keys=True, default=str)
                return HttpResponse(data, status=status.HTTP_400_BAD_REQUEST)

# Class with methods to fetch and update the contact information
class ProfileContactViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        if self.request.method == 'PUT':
            return UpdateProfileContactSerializer
        return EmployeeSerializer

    def get_queryset(self):
        if self.request.query_params.get('login_id'):
            return Employee.objects.filter(login=self.request.query_params.get('login_id'))
        return Employee.objects.all()

    def update(self, request, *args, **kwargs):
        if request.method == 'PUT':
            profile_contact = Employee.objects.get(id=kwargs.pop('pk'))
            serializer = UpdateProfileContactSerializer(profile_contact, data=request.POST)
            if serializer.is_valid():
                serializer.save()
                data = json.dumps(serializer.data, indent=4, sort_keys=True, default=str)
                return HttpResponse(data, status=status.HTTP_200_OK)
            else:
                data = json.dumps(serializer.errors, indent=4, sort_keys=True, default=str)
                return HttpResponse(data, status=status.HTTP_400_BAD_REQUEST)


class CompensationViewSet(viewsets.ModelViewSet):
    serializer_class = CompensationSerializer

    def get_queryset(self):
        if self.request.query_params.get('employee_id'):
            return Compensation.objects.filter(employee=self.request.query_params.get('employee_id'))
        return Compensation.objects.all()


class ResidencyStatusViewSet(viewsets.ModelViewSet):
    serializer_class = ResidencyStatusSerializer

    def get_queryset(self):
        if self.request.method == 'GET' and self.request.query_params.get('emp_id'):
            return ResidencyStatus.objects.filter(emp_id=self.request.query_params.get('emp_id'))
        return ResidencyStatus.objects.all()

# CRUD operations for employee payroll details
class PayrollViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        return PayrollSerializer

    def get_queryset(self):
        if self.request.method == 'GET' and self.request.query_params.get('emp_id'):
            return Payroll.objects.filter(emp_id=self.request.query_params.get('emp_id'))
        return Payroll.objects.all()


def employee_job_info(request):
    employee = Employee.objects.select_related('login').get(pk=request.GET['login_id'])
    teammembers = TeamMember.objects.select_related('employee').filter(employee=employee)
    projects = [ProjectSerializerWithManager(Project.objects.get(teams=teammember.teams)).data for teammember in teammembers]
    # managers = [{project}]

    data = {
        'start_date': employee.start_date,
        'position': employee.position,
        'status': employee.employee_status,
        'projects': projects
    }
    data = json.dumps(data, indent=4, sort_keys=True, default=str)
    return HttpResponse(data, status=status.HTTP_200_OK)
