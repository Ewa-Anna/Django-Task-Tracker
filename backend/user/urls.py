from rest_framework.routers import DefaultRouter
from django.urls.conf import include
from django.urls import re_path

from .viewsets import UserViewSet


router = DefaultRouter()

router.register(
    r"users",
    UserViewSet,
    basename="users",
)

urlpatterns = [
    re_path(r"", include(router.urls)),
]
