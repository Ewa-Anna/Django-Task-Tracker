from rest_framework.routers import DefaultRouter
from django.urls.conf import include, path
from django.urls import re_path

from .views import LoginView, RegistrationView, DashboardView
from .viewsets import UserViewSet, ActivationUserEmailView


router = DefaultRouter()

router.register(
    r"users",
    UserViewSet,
    basename="users",
)

urlpatterns = [
    re_path(r"", include(router.urls)),
    path("login/", LoginView.as_view(), name="login"),
    path(
        "activate/<slug:uidb64>/<slug:token>/",
        ActivationUserEmailView.as_view(),
        name="activate",
    ),
    path("register/", RegistrationView.as_view(), name="register"),
    path("dashboard/", DashboardView.as_view(), name="dashboard"),
]
