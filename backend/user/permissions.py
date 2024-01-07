from rest_framework.permissions import BasePermission


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
