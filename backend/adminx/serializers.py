from rest_framework import serializers

from .models import ChangeLog, ContactForm


class ChangeLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChangeLog
        fields = "__all__"


class ContactFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactForm
        fields = "__all__"