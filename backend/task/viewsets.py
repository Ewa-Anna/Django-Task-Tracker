from django.utils import timezone

from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework import serializers

from user.permissions import CustomPermission, IsProfileComplete

# pylint: disable=import-error, no-name-in-module
from backend.pagination import (
    CustomPagination,
    CommentPagination,
)

from .models import Project, Task, Comment, Attachment
from .serializers import (
    ProjectSerializer,
    ProjectCreateSerializer,
    TaskSerializer,
    TaskCreateSerializer,
    CommentSerializer,
    AttachmentSerializer,
)
from .utils import handle_permission_denied


class ProjectViewSet(viewsets.ModelViewSet):
    """
    This is a basic viewset for project.
    """

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticated, CustomPermission, IsProfileComplete]
    parser_classes = [MultiPartParser, FormParser, FileUploadParser]

    # pylint: disable=duplicate-code
    required_roles = {
        "GET": ["guest", "member", "manager", "admin"],
        "POST": ["manager", "admin"],
        "PUT": ["manager", "admin"],
        "PATCH": ["manager", "admin"],
        "DELETE": ["admin"],
    }

    def get_serializer_class(self):
        if self.action == "create":
            return ProjectCreateSerializer
        return ProjectSerializer

    @action(detail=False, methods=["get"])
    def project(self, request):
        title = request.query_params.get("title")
        owner = request.query_params.get("owner")
        tags = request.query_params.getlist("tags")
        ordering = request.query_params.get("ordering")
        visibility = request.query_params.get("visibility", "public")

        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")

        queryset = Project.objects.all()

        if title:
            queryset = queryset.filter(title__icontains=title)

        if owner:
            queryset = queryset.filter(owner__username=owner)

        if tags:
            queryset = queryset.filter(tags__name__in=tags)

        if ordering:
            queryset = queryset.order_by(ordering)

        if visibility:
            queryset = queryset.filter(visibility=visibility)

        if start_date:
            start_date = timezone.make_aware(
                timezone.datetime.strptime(start_date, "%Y-%m-%d")
            )
            queryset = queryset.filter(deadline__date__gte=start_date)

        if end_date:
            end_date = timezone.make_aware(
                timezone.datetime.strptime(end_date, "%Y-%m-%d")
            )
            queryset = queryset.filter(deadline__date__lte=end_date)

        paginator = CustomPagination()
        paginated_queryset = paginator.paginate_queryset(queryset, request)

        serializer = ProjectSerializer(paginated_queryset, many=True)

        return paginator.get_paginated_response(serializer.data)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

    def handle_exception(self, exc):
        if isinstance(exc, PermissionDenied):
            return handle_permission_denied()

        return super().handle_exception(exc)

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            tags_data = serializer.validated_data.pop("tags", [])
            project = serializer.save(created_by=self.request.user)
            project.tags.set(tags_data)

            response_data = {
                "success": True,
                "message": "Project created successfully.",
            }
            return Response(response_data, status=status.HTTP_201_CREATED)

        except serializers.ValidationError as e:
            response_data = {"success": False, "message": e.detail}
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

        # pylint: disable=broad-except
        except Exception as e:
            response_data = {
                "success": False,
                "message": f"Error creating project: {e}",
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        if request.user.is_admin:
            return super().update(request, *args, **kwargs)

        if request.user != instance.created_by:
            return Response(
                {"detail": "You don't have permission to edit this project."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().update(request, *args, **kwargs)


class TaskViewSet(viewsets.ModelViewSet):
    """
    This is a basic viewset for task.
    """

    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticated, CustomPermission, IsProfileComplete]
    parser_classes = [MultiPartParser, FormParser, FileUploadParser]

    required_roles = {
        "GET": ["guest", "member", "manager", "admin"],
        "POST": ["member", "manager", "admin"],
        "PUT": ["member", "manager", "admin"],
        "PATCH": ["member", "manager", "admin"],
        "DELETE": ["admin"],
    }

    def get_serializer_class(self):
        if self.action == "create" or "update":
            return TaskCreateSerializer
        return TaskSerializer

    @action(detail=False, methods=["get"])
    def task(self, request):
        title = request.query_params.get("title")
        description = request.query_params.get("description")
        priority = request.query_params.get("priority")
        status = request.query_params.get("status")
        task_type = request.query_params.get("type")
        project = request.query_params.get("project")
        assignees = request.query_params.get("assignees")

        queryset = Task.objects.all()

        if title:
            queryset = queryset.filter(title__icontains=title)

        if description:
            queryset = queryset.filter(description__icontains=description)

        if priority:
            queryset = queryset.filter(priority=priority)

        if status:
            queryset = queryset.filter(status=status)

        if task_type:
            queryset = queryset.filter(task_type=task_type)

        if project:
            queryset = queryset.filter(project=project)

        if assignees:
            assignee_list = assignees.split(",")
            queryset = queryset.filter(assignees__username__in=assignee_list)

        paginator = CustomPagination()
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        serializer = TaskSerializer(paginated_queryset, many=True)
        return paginator.get_paginated_response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

    def handle_exception(self, exc):
        if isinstance(exc, PermissionDenied):
            return handle_permission_denied()

        return super().handle_exception(exc)

    def create(self, request, *args, **kwargs):
        try:
            attachment = request.FILES.get("attachment")
            if attachment:
                serializer.validated_data["attachment"] = attachment
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(created_by=request.user)
            response_data = {"success": True, "message": "Task created successfully."}

            return Response(response_data, status=status.HTTP_201_CREATED)

        # pylint: disable=broad-except
        except Exception as e:
            response_data = {
                "success": False,
                "message": f"Error creating ticket: {e}.",
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        if request.user.is_admin:
            return super().update(request, *args, **kwargs)

        if request.user != instance.created_by:
            return Response(
                {"detail": "You don't have permission to edit this task."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().update(request, *args, **kwargs)


class CommentViewSet(viewsets.ModelViewSet):
    """
    This is a basic viewset for comment.
    """

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    pagination_class = CommentPagination
    permission_classes = [IsAuthenticated, CustomPermission, IsProfileComplete]
    parser_classes = [MultiPartParser, FormParser, FileUploadParser]

    required_roles = {
        "GET": ["guest", "member", "manager", "admin"],
        "POST": ["guest", "member", "manager", "admin"],
        "PUT": ["guest", "member", "manager", "admin"],
        "PATCH": ["guest", "member", "manager", "admin"],
        "DELETE": ["manager", "admin"],
    }

    @action(detail=False, methods=["get"])
    def comment(self, request):
        project = request.query_params.get("project")
        task = request.query_params.get("task")
        created_by = request.query_params.get("created_by")

        queryset = Comment.objects.all()

        if project:
            queryset = queryset.filter(project=project)

        if task:
            queryset = queryset.filter(task=task)

        if created_by:
            queryset = queryset.filter(created_by__username=created_by)

        paginator = CommentPagination()
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        serializer = CommentSerializer(paginated_queryset, many=True)
        return paginator.get_paginated_response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

    def handle_exception(self, exc):
        if isinstance(exc, PermissionDenied):
            return handle_permission_denied()

        return super().handle_exception(exc)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        if request.user.is_admin:
            return super().update(request, *args, **kwargs)

        if request.user != instance.created_by:
            return Response(
                {"detail": "You don't have permission to edit this comment."},
                status=status.HTTP_403_FORBIDDEN,
            )

        attachments_data = request.data.get("attachments", [])
        if attachments_data:
            for attachment_data in attachments_data:
                Attachment.objects.create(comment=instance, **attachment_data)

        return super().update(request, *args, **kwargs)


class AttachmentViewSet(viewsets.ModelViewSet):
    """
    This is a basic viewset for attachement.
    """

    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer
    permission_classes = [IsAuthenticated, CustomPermission, IsProfileComplete]
    parser_classes = [MultiPartParser, FormParser, FileUploadParser]

    required_roles = {
        "GET": ["guest", "member", "manager", "admin"],
        "POST": ["guest", "member", "manager", "admin"],
        "PUT": ["guest", "member", "manager", "admin"],
        "PATCH": ["guest", "member", "manager", "admin"],
        "DELETE": ["admin"],
    }
