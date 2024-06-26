from django.db.models import Q
from django.contrib.auth import get_user_model, logout
from django.forms import ValidationError

from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# pylint: disable=import-error, no-name-in-module
from backend.pagination import (
    CustomPagination,
)
from .serializers import UserSerializer
from .permissions import CustomPermission, IsProfileComplete


User = get_user_model()


class UserViewSet(ModelViewSet):
    """
    This viewset allows basic methods for maintaining user.
    E.g. lists all users, list user with given id, etc.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, CustomPermission, IsProfileComplete]
    pagination_class = CustomPagination

    # pylint: disable=duplicate-code
    required_roles = {
        "GET": ["guest", "member", "manager", "admin"],
        "POST": ["admin"],
        "PUT": ["admin"],
        "PATCH": ["admin"],
        "DELETE": ["admin"],
    }

    def get_queryset(self):
        queryset = super().get_queryset()
        query = self.request.query_params.get("query")
        role = self.request.query_params.get("role")
        valid_roles = ["guest", "member", "manager", "admin"]

        if query:
            queryset = queryset.filter(
                Q(first_name__icontains=query) | Q(last_name__icontains=query)
            )

        if role:
            if role not in valid_roles:
                raise ValidationError({"role": "Invalid role specified."})
            queryset = queryset.filter(role=role)

        return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        logout(request)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
