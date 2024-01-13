from django.db import models

from taggit.managers import TaggableManager

from user.models import CustomUser


PRIORITY = [
    ("low", "Low"),
    ("medium", "Medium"),
    ("high", "High"),
    ("critical", "Critical"),
]

STATUS = [
    ("blocked", "Blocked"),
    ("pending", "Pending"),
    ("assigned", "Assigned"),
    ("in_progess", "In Progress"),
    ("completed", "Completed"),
    ("cancelled", "Cancelled"),
]


class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    deadline = models.DateTimeField()
    owner = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="owned_projects"
    )
    visibility = models.CharField(
        max_length=10,
        choices=[("public", "Public"), ("private", "Private")],
        default="public",
    )

    tags = TaggableManager()

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created"]
        indexes = [models.Index(fields=["title", "owner", "deadline"])]

    def __str__(self):
        return self.title


class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    priority = models.CharField(max_length=20, choices=PRIORITY, default="low")
    status = models.CharField(max_length=20, choices=STATUS, default="pending")

    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="related_projects"
    )
    owner = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="owned_tasks"
    )
    assignees = models.ManyToManyField(
        CustomUser, related_name="assigned_tasks", blank=True
    )

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created", "priority", "status"]
        indexes = [
            models.Index(fields=["title", "owner", "project", "priority", "status"])
        ]

    def __str__(self):
        return f"{self.title} for {self.project}"


class Comment(models.Model):
    text = models.TextField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created"]

    def __str__(self):
        return f"Comment by {self.creator.username}"


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
    file = models.FileField(upload_to="documents/attachments/%Y/%m/%d/")
    uploader = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created"]

    def __str__(self):
        return f"Attachement added by {self.uploader.username}"
