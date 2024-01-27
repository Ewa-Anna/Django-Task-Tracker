from rest_framework.routers import DefaultRouter
from django.urls.conf import include, path
from django.urls import re_path
from django_rest_passwordreset.views import (
    reset_password_request_token,
    reset_password_validate_token,
    reset_password_confirm,
)

from .views import (
    LoginView,
    RegistrationView,
    DashboardView,
    LogoutView,
    ActivationUserEmailView,
    ChangePasswordView,
    DeactivateAccountView,
)
from .viewsets import UserViewSet


app_name = "user"

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
    path("password_reset/", reset_password_request_token, name="password_reset"),
    path(
        "password_reset/validate_token/",
        reset_password_validate_token,
        name="password_reset_validate_token",
    ),
    path(
        "password_reset/confirm/", reset_password_confirm, name="password_reset_confirm"
    ),
    path(
        "deactivate-account/",
        DeactivateAccountView.as_view(),
        name="deactivate-account",
    ),
    path("register/", RegistrationView.as_view(), name="register"),
    path("dashboard/", DashboardView.as_view(), name="dashboard"),
]
