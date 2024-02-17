from rest_framework.permissions import BasePermission, IsAuthenticated


class CustomPermission(BasePermission):
    def has_permission(self, request, view):
        required_roles = getattr(view, "required_roles", {})
        user = request.user

        return IsAuthenticated().has_permission(
            request, view
        ) and user.role in required_roles.get(request.method, [])
