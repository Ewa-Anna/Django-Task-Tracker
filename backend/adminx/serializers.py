from rest_framework import serializers

from .models import ChangeLog


class ChangeLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChangeLog
        fields = "__all__"
