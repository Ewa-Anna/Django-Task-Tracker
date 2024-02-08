from django.db import models


class CustomTags(models.Model):
    name = models.CharField(max_length=25, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Tag: {self.name}"
