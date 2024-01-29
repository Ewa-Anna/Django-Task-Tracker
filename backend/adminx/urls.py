from django.urls.conf import path

from .views import ChangeLogView, ContactFormView

app_name = "adminx"

urlpatterns = [
    path("", ChangeLogView.as_view(), name="change_log_view"),
    path("contact/", ContactFormView.as_view(), name="contact_form"),
]
