from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.exceptions import PermissionDenied


class CustomPermission(BasePermission):
    def has_permission(self, request, view):
        required_roles = getattr(view, "required_roles", {})
        user = request.user

        return IsAuthenticated().has_permission(
            request, view
        ) and user.role in required_roles.get(request.method, [])


class IsProfileComplete(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if request.user.profile.is_configured:
                return True
            else:
                raise PermissionDenied(
                    "Please configure your profile first before accessing this page."
                )
        return False
