from rest_framework import serializers

from .models import ChangeLog, ContactForm
from task.models import Task
from task.serializers import TaskSerializer, ProjectSerializer


class ChangeLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChangeLog
        fields = "__all__"


class ContactFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactForm
        fields = "__all__"


class LastActivitySerializer(serializers.ModelSerializer):
    task = TaskSerializer(read_only=True)
    project = ProjectSerializer(read_only=True)
    class Meta:
        model = Task
        fields = "__all__"