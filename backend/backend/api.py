from django.urls import path
from django.urls.conf import include


urlpatterns = [
    path("user/", include("user.urls")),
]
