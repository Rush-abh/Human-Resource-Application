from django.db import models
from ..administrator.models import Administrator

# Create your models here.


class Announcement(models.Model):
    Admin = models.ForeignKey(Administrator, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, blank=False, null=False)
    description = models.CharField(max_length=500, blank=False, null=False)
    created_date = models.DateField()
    created_time = models.TimeField()
