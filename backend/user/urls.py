from rest_framework.routers import DefaultRouter
from django.urls.conf import include, path
from django.urls import re_path

from .views import (
    LoginView,
    RegistrationView,
    DashboardView,
    LogoutView,
    ActivationUserEmailView,
    ChangePasswordView,
)
from .viewsets import UserViewSet


router = DefaultRouter()

router.register(
    r"users",
    UserViewSet,
    basename="users",
)

urlpatterns = [
    re_path(r"", include(router.urls)),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path(
        "activate/<slug:uidb64>/<slug:token>/",
        ActivationUserEmailView.as_view(),
        name="activate",
    ),
    path(
        "change_password/<int:pk>/",
        ChangePasswordView.as_view(),
        name="change_password",
    ),
    path("register/", RegistrationView.as_view(), name="register"),
    path("dashboard/", DashboardView.as_view(), name="dashboard"),
]
