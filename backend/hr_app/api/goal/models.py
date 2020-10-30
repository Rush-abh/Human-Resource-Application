from django.db import models
from api.employee.models import Employee
# Create your models here.


class Goal(models.Model):
    employeeID = models.ForeignKey(Employee, on_delete=models.CASCADE)
    goal_title = models.CharField(max_length=50)
    goal_created_date = models.DateField()
    goal_created_time = models.TimeField()
    goal_three_months = models.TextField()
    goal_six_months = models.TextField()
    goal_twelve_months = models.TextField()
