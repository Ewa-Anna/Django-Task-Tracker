from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from django.contrib.auth import get_user_model

from .views import ChangeLogView
from task.models import Project, Task, Comment
from .models import ChangeLog

User = get_user_model()

from django.dispatch import Signal

# track_project_changes = Signal()

# @receiver(post_save, sender=Project)
# def track_project_changes(sender, instance, created, user, **kwargs):
#     if kwargs.get('using') == 'default':
#         return
#     change_type = "create" if created else "update"
#     ChangeLog.objects.create(project=instance, change_type=change_type, changed_by=user)


# @receiver(pre_delete, sender=Project)
# def track_project_deletion(sender, instance, **kwargs):
#     changed_by = ChangeLogView.get_changed_by_user(kwargs.get('request'))
#     ChangeLog.objects.create(project=instance, change_type="delete", changed_by=changed_by)


# @receiver(post_save, sender=Task)
# def track_task_changes(sender, instance, created, **kwargs):
#     change_type = "create" if created else "update"
#     changed_by = ChangeLogView.get_changed_by_user(kwargs.get('request'))
#     ChangeLog.objects.create(task=instance, change_type=change_type, changed_by=changed_by)


# @receiver(pre_delete, sender=Task)
# def track_task_deletion(sender, instance, **kwargs):
#     changed_by = ChangeLogView.get_changed_by_user(kwargs.get('request'))
#     ChangeLog.objects.create(task=instance, change_type="delete", changed_by=changed_by)


# @receiver(post_save, sender=Comment)
# def track_comment_changes(sender, instance, created, **kwargs):
#     change_type = "create" if created else "update"
#     changed_by = ChangeLogView.get_changed_by_user(kwargs.get('request'))
#     ChangeLog.objects.create(comment=instance, change_type=change_type, changed_by=changed_by)


# @receiver(pre_delete, sender=Comment)
# def track_comment_deletion(sender, instance, **kwargs):
#     changed_by = ChangeLogView.get_changed_by_user(kwargs.get('request'))
#     ChangeLog.objects.create(comment=instance, change_type="delete", changed_by=changed_by)
