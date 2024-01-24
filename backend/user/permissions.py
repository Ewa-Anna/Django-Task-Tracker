from rest_framework.permissions import BasePermission
from rest_framework.response import Response
from rest_framework import status

class IsGuest(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user.is_authenticated and request.user.role == "guest")


class IsMember(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user.is_authenticated and request.user.role in ["guest", "member"]
        )


class IsManager(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user.is_authenticated
            and request.user.role in ["guest", "member", "manager"]
        )


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user.is_authenticated
            and request.user.role in ["guest", "member", "manager", "admin"]
            or request.user.is_superuser
        )


class CustomPermission(BasePermission):
    def has_permission(self, request, view):
        required_roles = getattr(view, "required_roles", {})
        user = request.user

        if user.role in required_roles.get(request.method, []):
            return True
        else:
            return False
