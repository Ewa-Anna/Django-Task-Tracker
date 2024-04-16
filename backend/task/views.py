from django.shortcuts import get_object_or_404
from django.db.models import Count

from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated

from user.models import ROLES, THEMES, GENDER
from user.permissions import CustomPermission, IsProfileComplete

# pylint: disable=import-error, no-name-in-module
from backend.pagination import (
    CommentPagination,
)

from .serializers import (
    DictionaryContentSerializer,
    TaskSerializer,
    ProjectSerializer,
    CommentSerializer,
)
from .models import PRIORITY, STATUS, VISIBILITY, Project, TYPE, Task, Comment
from .utils import handle_permission_denied


class DictionaryContentView(APIView):
    """
    This view returns values for a drop down list for frontend.
    Available options: priority, status, visibility, roles, themes, type, gender
    """

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
        elif dictionary_name == "gender":
            content = dict(GENDER)
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
    """
    This view returns list of projects for a given owner.
    """

    permission_classes = [IsAuthenticated, IsProfileComplete]

    def get(self, request):
        owned_projects = Project.objects.filter(owner=request.user)
        serializer = ProjectSerializer(owned_projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProjectAssigneeList(APIView):
    """
    This view returns list of projects for a given assignee.
    """

    permission_classes = [IsAuthenticated, IsProfileComplete]

    def get(self, request):
        assigned_projects = Project.objects.filter(assignees=request.user)
        serializer = ProjectSerializer(assigned_projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TaskAssigneeList(APIView):
    """
    This view returns list of tasks for a given assignee.
    """

    permission_classes = [IsAuthenticated, IsProfileComplete]

    def get(self, request):
        assigned_tasks = Task.objects.filter(assignees=request.user)
        serializer = TaskSerializer(assigned_tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProjectDeleteView(APIView):
    """
    This view allows deleting project with given project id. Only for admin.
    It works two steps:
    1. GET method asks for confirmation of delete.
    2. DELETE method deletes given project and associated tasks.
    """

    permission_classes = [IsAuthenticated, CustomPermission, IsProfileComplete]
    # pylint: disable=duplicate-code
    required_roles = {
        "GET": ["guest", "member", "manager", "admin"],
        "POST": ["manager", "admin"],
        "PUT": ["manager", "admin"],
        "PATCH": ["manager", "admin"],
        "DELETE": ["admin"],
    }

    def handle_exception(self, exc):
        if isinstance(exc, PermissionDenied):
            return handle_permission_denied()

        return super().handle_exception(exc)

    def get(self, request, pk):
        try:
            project = get_object_or_404(Project, pk=pk)
            tasks = project.related_projects.all()
            task_serializer = TaskSerializer(tasks, many=True)

            message = (
                f"Are you sure you want to delete project '{project.title}' "
                f"with the following tasks?"
            )
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


class ProjectTasksView(ListAPIView):
    """
    This view returns list of tasks for given project id.
    """

    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, IsProfileComplete]

    def get_queryset(self):
        project_id = self.kwargs.get("project_id")
        return Task.objects.filter(project_id=project_id)


class ProjectStatistics(APIView):
    """
    This view returns statistics of tasks for given project id.
    Returns total amount of tasks and grouping by type.
    """

    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, IsProfileComplete]

    def get(self, request, project_id):
        total_tasks = Task.objects.filter(project_id=project_id).count()
        task_statistics = (
            Task.objects.filter(project_id=project_id)
            .values("type")
            .annotate(total=Count("id"))
        )
        task_statistics = {stat["type"]: stat["total"] for stat in task_statistics}
        response_data = {"total_tasks": total_tasks, "task_statistics": task_statistics}

        return Response(response_data)


class CommentForTaskView(ListAPIView):
    """
    This view returns all comments for given task id.
    """

    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsProfileComplete]
    pagination_class = CommentPagination

    def get_queryset(self):
        task_id = self.kwargs.get("task_id")
        return Comment.objects.filter(task_id=task_id)
