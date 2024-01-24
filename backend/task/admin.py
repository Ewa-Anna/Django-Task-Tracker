from django.contrib import admin
from task.models import Task, Project, Comment, Attachment

# To add CustomAdmin - list_display, search_Fields, fieldsets

admin.site.register(Task)
admin.site.register(Project)
admin.site.register(Comment)
admin.site.register(Attachment)
