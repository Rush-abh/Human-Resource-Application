from django.db import models
from ..employee.models import Employee
from ..administrator.models import Administrator

# Create your models here.

class Invite(models.Model):

    Admin = models.ForeignKey(Administrator, on_delete=models.CASCADE)
    Emp = models.ForeignKey(Employee, on_delete=models.CASCADE)
    Invite_Status = models.CharField(max_length=15)
    Invite_Date = models.DateField()
    Invite_Time = models.DateField()
