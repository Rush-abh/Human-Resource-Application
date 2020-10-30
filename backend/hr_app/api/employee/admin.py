from django.contrib import admin

# Register your models here.
from .models import Employee, MedicalProfile, GeneralPractitioner

# class EmployeeAdmin(admin):
#     pass


admin.site.register(Employee)
admin.site.register(MedicalProfile)
admin.site.register(GeneralPractitioner)
