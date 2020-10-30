from .models import Approval
from .serializer import ApprovalSerializer
from rest_framework import viewsets


class ApprovalViewSet(viewsets.ModelViewSet):
    serializer_class = ApprovalSerializer
    queryset = Approval.objects.all()
