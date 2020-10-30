from rest_framework import serializers
from .models import TeamMember


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        unique_together = ('teams_id', 'employee_id')
        fields = "__all__"
