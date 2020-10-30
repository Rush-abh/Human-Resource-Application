# Create your models here.
from django.db import models
from api.employee.models import Employee
from api.teams.models import Teams
# Create your models here.


class Project(models.Model):
    teams = models.OneToOneField(Teams, on_delete=models.CASCADE)
    project_leader = models.ForeignKey(Employee, on_delete=models.CASCADE)
    project_name = models.CharField(max_length=30)
    project_description = models.CharField(max_length=200)
