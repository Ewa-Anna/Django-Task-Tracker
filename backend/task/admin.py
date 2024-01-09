from django.contrib import admin
from task.models import Task, Project, Comment, Attachment

admin.site.register(Task)
admin.site.register(Project)
admin.site.register(Comment)
admin.site.register(Attachment)