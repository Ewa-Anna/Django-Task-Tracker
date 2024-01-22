from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from .models import Project, Task, ChangeLog, CHANGE_TYPES


@receiver(post_save, sender=Project)
@receiver(post_save, sender=Task)
def create_change_log(sender, instance, created, **kwargs):
    if created:
        change_type = CHANGE_TYPES[0][0]  # Create
    else:
        change_type = CHANGE_TYPES[1][0]  # Update

    ChangeLog.objects.create(
        project=instance if isinstance(instance, Project) else None,
        task=instance if isinstance(instance, Task) else None,
        change_type=change_type,
        changed_by=instance.created_by if created else instance.updated_by,
        timestamp=timezone.now(),
    )
