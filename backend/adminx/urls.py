from django.urls.conf import path

from .views import ChangeLogView

app_name = "adminx"

urlpatterns = [
    path("", ChangeLogView.as_view(), name="change_log_view"),
]
