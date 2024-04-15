from django.apps import AppConfig


class TaskConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "task"

    def ready(self):
        # pylint: disable=import-outside-toplevel, unused-import
        import task.signals  # noqa: F401
