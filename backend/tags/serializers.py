from rest_framework import serializers

from .models import CustomTags


class CustomTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomTags
        fields = "id", "name"
