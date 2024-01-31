from django.db import models

from user.models import CustomUser
from task.models import Project, Task, Comment


CHANGE_TYPES = (
    ("create", "Create"),
    ("update", "Update"),
    ("delete", "Delete"),
)


class ChangeLog(models.Model):
    project = models.ForeignKey(Project, on_delete=models.DO_NOTHING, null=True)
    task = models.ForeignKey(Task, on_delete=models.DO_NOTHING, null=True)
    comment = models.ForeignKey(Comment, on_delete=models.DO_NOTHING, null=True)
    change_type = models.CharField(max_length=10, choices=CHANGE_TYPES)
    changed_by = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)
    timestamp = models.DateTimeField(auto_now_add=True)


class ContactForm(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"ContactForm {self.id} - {self.name}"
