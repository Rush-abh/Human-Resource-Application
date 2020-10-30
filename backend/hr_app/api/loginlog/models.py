from django.db import models


class LoginLog(models.Model):

    # Login status choices
    SUCCESS = 'SUCCESS'
    FAILED = 'FAILED'
    LOGIN_STATUS_CHOICES = [(SUCCESS, 'SUCCESS'), (FAILED, 'FAILED')]

    # fields of model
    LogID = models.AutoField(primary_key=True, unique=True, null=False, editable=False)
    # LoginID = models.ForeignKey(Login, on_delete=models.CASCADE)
    LoginStatus = models.CharField(max_length=8, choices=LOGIN_STATUS_CHOICES, default=FAILED)
    LoginDateTime = models.DateTimeField(auto_now_add=True)