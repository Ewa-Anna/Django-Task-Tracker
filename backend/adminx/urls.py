from django.urls.conf import path

from .views import ChangeLogView, ContactFormView, LastActivity

app_name = "adminx"

urlpatterns = [
    path("", ChangeLogView.as_view(), name="change_log_view"),
    path("contact/", ContactFormView.as_view(), name="contact_form"),
    path("last-activity/", LastActivity.as_view(), name="last_activity"),
]
