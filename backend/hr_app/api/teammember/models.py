# Create your models here.
from django.db import models
from api.employee.models import Employee
from api.teams.models import Teams
# Create your models here.


class TeamMember(models.Model):
    teams = models.ForeignKey(Teams, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
