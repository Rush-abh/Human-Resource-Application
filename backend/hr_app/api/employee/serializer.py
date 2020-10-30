from rest_framework import serializers
from .models import Employee, MedicalProfile, GeneralPractitioner, Compensation, ResidencyStatus, Payroll


class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ["first_name", "last_name", "Emp_ID"]


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "__all__"


class CreateEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "__all__"


class UpdateBasicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        exclude = ['Emp_ID', 'login', 'mobile_number', 'telephone_number', 'street', 'city', 'state', 'postcode',
                   'country', 'personal_email_address', 'company_email_address', 'position', 'employee_status',
                   'start_date', 'termination_date', 'last_login']


class UpdateMedicalProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalProfile
        exclude = ['Login', 'id']


class MedicalProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalProfile
        fields = "__all__"


class UpdateMedicalProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalProfile
        exclude = ['Login', 'id']


class GeneralPractitionerSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralPractitioner
        fields = "__all__"


class UpdateGeneralPractitionerSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralPractitioner
        exclude = ['employee', 'id', 'city', 'country', 'medical_condition']


class UpdateProfileContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = (
        'company_email_address', 'mobile_number', 'telephone_number', 'street', 'city', 'state', 'postcode', 'country')


class CompensationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compensation
        fields = "__all__"


class ResidencyStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResidencyStatus
        fields = "__all__"


class PayrollSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payroll
        fields = "__all__"
