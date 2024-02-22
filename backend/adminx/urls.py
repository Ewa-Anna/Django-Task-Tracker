from django.urls.conf import path

from .views import (
    ChangeLogView,
    ContactFormView,
    LastActivity,
    TaskStatistics,
    APILogsView,
)

app_name = "adminx"

urlpatterns = [
    path("", ChangeLogView.as_view(), name="change_log_view"),
    path("contact/", ContactFormView.as_view(), name="contact_form"),
    path("last-activity/", LastActivity.as_view(), name="last_activity"),
    path("task-statistics/", TaskStatistics.as_view(), name="task_statistics"),
    path("api/logs/", APILogsView.as_view(), name="api_logs"),
]
