from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers import DictionaryContentSerializer, TaskSerializer, ProjectSerializer
from .models import PRIORITY, STATUS, VISIBILITY, Project, TYPE
from user.models import ROLES, THEMES
from user.permissions import CustomPermission


class DictionaryContentView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, dictionary_name):
        dictionary_name = dictionary_name.lower()
        if dictionary_name == "priority":
            content = dict(PRIORITY)
        elif dictionary_name == "status":
            content = dict(STATUS)
        elif dictionary_name == "visibility":
            content = dict(VISIBILITY)
        elif dictionary_name == "roles":
            content = dict(ROLES)
        elif dictionary_name == "themes":
            content = dict(THEMES)
        elif dictionary_name == "type":
            content = dict(TYPE)
        else:
            return Response(
                {"error": f"Dictionary with name {dictionary_name} not found"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = DictionaryContentSerializer(
            data={"dictionary_name": dictionary_name, "content": content}
        )
        serializer.is_valid(raise_exception=True)

        return Response(content, status=status.HTTP_200_OK)


class ProjectOwnerList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        owned_projects = Project.objects.filter(owner=request.user)
        serializer = ProjectSerializer(owned_projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ProjectDeleteView(APIView):
    permission_classes = [IsAuthenticated, CustomPermission]

    required_roles = {
        "GET": ["guest", "member", "manager", "admin"],
        "POST": ["manager", "admin"],
        "PUT": ["manager", "admin"],
        "PATCH": ["manager", "admin"],
        "DELETE": ["admin"],
    }

    def handle_exception(self, exc):
        if isinstance(exc, PermissionDenied):
            response_data = {
                "detail": "You do not have permission to perform this action. If this is a mistake, please contact your administrator to acquire permission."
            }
            return Response(response_data, status=status.HTTP_403_FORBIDDEN)

        return super().handle_exception(exc)

    def get(self, request, pk):
        try:
            project = get_object_or_404(Project, pk=pk)
            tasks = project.related_projects.all()
            task_serializer = TaskSerializer(tasks, many=True)

            message = f"Are you sure you want to delete project '{project.title}' with the following tasks?"
            return Response({"message": message, "tasks": task_serializer.data})
        except Project.DoesNotExist:
            return Response(
                {"message": "Project not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def delete(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
            project.delete()
            return Response(
                {"message": "Project and associated tasks deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Project.DoesNotExist:
            return Response(
                {"message": "Project not found"}, status=status.HTTP_404_NOT_FOUND
            )
