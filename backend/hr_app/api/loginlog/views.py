from .serializers import LoginLogSerializer
from rest_framework import viewsets
from .models import LoginLog


# CRUDL operations for login details
class LoginLogViewSet(viewsets.ModelViewSet):
    serializer_class = LoginLogSerializer
    queryset = LoginLog.objects.all()


# #needs method to make log when login id is generated
# when login button is pressed, signal will be generated
# here if signal recieved, log will be generated


