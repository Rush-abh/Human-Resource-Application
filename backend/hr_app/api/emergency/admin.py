from django.contrib import admin

# Register your models here.
from .models import EmergencyContact


@admin.register(EmergencyContact)
class EmergencyContactAdmin(admin.ModelAdmin):
    fields = ['first_name', 'last_name']
