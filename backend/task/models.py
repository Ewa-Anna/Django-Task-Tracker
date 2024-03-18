import cloudinary
import cloudinary.uploader

from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError

from user.models import CustomUser
from tags.models import CustomTags


def validate_file_size(value):
    max_file_size_mb = 20
    max_file_size_bytes = max_file_size_mb * 1024 * 1024

    if value.size > max_file_size_bytes:
        raise ValidationError("File size exceeds maximum limit (20MB).")


PRIORITY = [
    ("low", "Low"),
    ("medium", "Medium"),
    ("high", "High"),
    ("critical", "Critical"),
]

STATUS = [
    ("pending", "Pending"),
    ("open", "Open"),
    ("closed", "Closed"),
    ("cancelled", "Cancelled"),
]

VISIBILITY = [("public", "Public"), ("private", "Private")]


TYPE = [
    ("bug", "Bug"),
    ("feature", "Feature"),
    ("question", "Question"),
    ("improvement", "Improvement"),
    ("other", "Other"),
]


class Project(models.Model):
    title = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    deadline = models.DateTimeField()
    owner = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="owned_projects"
    )
    visibility = models.CharField(
        max_length=10,
        choices=VISIBILITY,
        default="public",
    )
    assignees = models.ManyToManyField(
        CustomUser, related_name="assigned_projects", blank=True
    )
    status = models.CharField(max_length=20, choices=STATUS, default="pending")

    archive = models.BooleanField(default=False)

    tags = models.ManyToManyField(CustomTags, blank=True)

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="created_by_project",
        blank=True,
        null=True,
    )
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="updated_by_project",
        blank=True,
        null=True,
    )

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created"]
        indexes = [models.Index(fields=["title", "owner", "deadline"])]

    def __str__(self):
        return f"{self.title}"

    def save(self, *args, **kwargs):
        user = kwargs.pop("user", None)
        self.updated_by = user
        super().save(*args, **kwargs)


class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    priority = models.CharField(max_length=20, choices=PRIORITY, default="low")
    status = models.CharField(max_length=20, choices=STATUS, default="pending")
    type = models.CharField(max_length=20, choices=TYPE, default="question")

    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="related_projects"
    )
    assignees = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        related_name="assigned_tasks",
        blank=True,
        null=True,
    )
    archive = models.BooleanField(default=False)

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="created_by_task",
        blank=True,
        null=True,
    )
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="updated_by_task",
        blank=True,
        null=True,
    )

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created", "priority", "status"]
        indexes = [models.Index(fields=["title", "project", "priority", "status"])]

    def __str__(self):
        return f"{self.title} for {self.project}"


class Comment(models.Model):
    text = models.TextField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="created_by_comment",
        blank=True,
        null=True,
    )
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="updated_by_comment",
        blank=True,
        null=True,
    )

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created"]

    def __str__(self):
        return f"Comment by {self.created_by}"


class Attachment(models.Model):
    task = models.ForeignKey(
        Task,
        on_delete=models.CASCADE,
        related_name="attachments",
        null=True,
        blank=True,
    )
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="attachments",
        null=True,
        blank=True,
    )
    comment = models.ForeignKey(
        Comment,
        on_delete=models.CASCADE,
        related_name="attachments",
        null=True,
        blank=True,
    )

    file = models.FileField(
        upload_to="attachments/%Y/%m/%d/", validators=[validate_file_size]
    )
    uploader = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created"]

    def __str__(self):
        return f"Attachement added by {self.uploader.username}"
    
    def delete(self, *args, **kwargs):
        if self.file:
            public_id = "/".join(self.file.name.split("/")[-7:])
            cloudinary.uploader.destroy(public_id)
            print(f"Deleted file with public ID: {public_id}")
        super().delete(*args, **kwargs)
