from rest_framework.routers import DefaultRouter
from django.urls import re_path
from django.urls.conf import include, path

from .viewsets import CustomTagViewSet


tags_router = DefaultRouter()

tags_router.register(r"", CustomTagViewSet)

urlpatterns = [re_path(r"", include(tags_router.urls))]
