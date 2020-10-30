from django.db import models
from ..employee.models import Person, Identification
import uuid

# Create your models here.

class Employee_Archive(Person):
    Emp_ID = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)


class ResidencyStatus_Archive(Identification):
    Emp_ID = models.ForeignKey('Employee_Archive', on_delete = models.CASCADE)
