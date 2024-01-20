from django.apps import AppConfig


class AdminxConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "adminx"

    def ready(self):
        import adminx.signals
