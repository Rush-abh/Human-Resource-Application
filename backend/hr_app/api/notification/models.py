# Create your models here.
from django.db import models
from api.employee.models import Employee
# Create your models here.


class Notification(models.Model):
    NOTIFICATION_CHOICES = (('Approval_Notification', 'APPROVAL_NOTIFICATION'), ('Announcement_Notification', 'ANNOUNCEMENT_NOTIFICATION'), ('Request_Notification', 'REQUEST_NOTIFICATION'), ('Scheduled_shift_Notification', 'SCHEDULED_SHIFT_NOTIFICATION'), ('Shift_Tracking_Notification', 'SHIFT_TRACKING_NOTIFICATION'), ('Comments_Notification', 'COMMENTS_NOTIFICATION'),
                            ('Other_Notification', 'NA'))
    Emp = models.ForeignKey(Employee, on_delete=models.CASCADE)
    notification_type = models.CharField(choices=NOTIFICATION_CHOICES,
                                         default='NA', max_length=50)
    notification_title = models.CharField(max_length=30)
    notification_message = models.CharField(max_length=200)
    notification_date = models.DateField()
    notification_time = models.TimeField()
