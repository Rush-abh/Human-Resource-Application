from .models import Goal
from .serializer import GoalSerializer
from rest_framework import viewsets


class GoalViewSet(viewsets.ModelViewSet):
    serializer_class = GoalSerializer
    # queryset = Goal.objects.all()

    def get_queryset(self):
        if self.request.query_params.get('employee_id'):
            return Goal.objects.filter(employeeID=self.request.query_params.get('employee_id'))
        return Goal.objects.all()

