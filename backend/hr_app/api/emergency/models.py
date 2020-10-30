from django.db import models

# Create your models here.
from api.employee.models import Employee, Person


class EmergencyContact(Person):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    postcode = models.IntegerField()
    relation = models.TextField()
