from django.db.models.signals import pre_save
from django.dispatch import receiver

from .models import Project, Task

@receiver(pre_save, sender=Project)
def archive_related_tasks(sender, instance, **kwargs):
    if instance.archive and instance.id is not None:
        Task.objects.filter(project=instance, archive=False).update(archive=True)