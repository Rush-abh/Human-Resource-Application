# Create your models here.
from django.db import models
from api.goal.models import Goal
from api.employee.models import Employee
# Create your models here.


class Comment(models.Model):
    goal_id = models.ForeignKey(Goal, on_delete=models.CASCADE)
    comment_date = models.DateField()
    comment_time = models.TimeField()
    commenter_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    comment_message = models.CharField(max_length=100)
