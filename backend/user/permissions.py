from rest_framework.permissions import BasePermission


class CustomPermission(BasePermission):
    def has_permission(self, request, view):
        required_roles = getattr(view, "required_roles", {})
        user = request.user

        if user.role in required_roles.get(request.method, []):
            return True
        else:
            return False
