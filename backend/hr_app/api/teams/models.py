# Create your models here.
from django.db import models
from api.employee.models import Employee
# Create your models here.


class Teams(models.Model):
    team_name = models.CharField(max_length=30)
    date_formed = models.DateField()
    time_formed = models.TimeField()
