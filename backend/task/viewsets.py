from django.http import Http404
from django.utils import timezone
from django.db.models import Q

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

from .views import CommentForTaskView
from .models import Project, Task, Comment, Attachment
from .serializers import (
    ProjectSerializer,
    ProjectCreateSerializer,
    TaskSerializer,
    TaskCreateSerializer,
    CommentSerializer,
    CommentCreateSerializer,
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
        if self.request.method in ("POST", "PUT", "PATCH"):
            return ProjectCreateSerializer
        return ProjectSerializer

    @action(detail=False, methods=["get"])
    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user

        title = self.request.query_params.get("title")
        owner = self.request.query_params.get("owner")
        tags = self.request.query_params.getlist("tags")
        ordering = self.request.query_params.get("ordering")

        start_date = self.request.query_params.get("start_date")
        end_date = self.request.query_params.get("end_date")

        queryset = queryset.filter(
            Q(visibility="public")
            | (Q(visibility="private") & (Q(owner=user) | Q(assignees=user)))
        )

        if title:
            queryset = queryset.filter(title__icontains=title)

        if owner:
            queryset = queryset.filter(owner__username=owner)

        if tags:
            queryset = queryset.filter(tags__name__in=tags)

        if ordering:
            queryset = queryset.order_by(ordering)

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

        return queryset

    def get_object(self):
        queryset = self.get_queryset()
        lookup_value = self.kwargs[self.lookup_field]
        user = self.request.user

        try:
            obj = (
                queryset.filter(pk=lookup_value)
                .filter(
                    Q(visibility="public")
                    | (Q(visibility="private") & (Q(owner=user) | Q(assignees=user)))
                )
                .distinct()
                .get()
            )
            return obj
        except queryset.model.DoesNotExist as exc:
            raise Http404("Project not found.") from exc
        except queryset.model.MultipleObjectsReturned as exc:
            raise Http404("Multiple projects found with the same ID.") from exc

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

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
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            tags_data = serializer.validated_data.pop("tags", [])
            project = serializer.save(created_by=self.request.user)
            project.tags.set(tags_data)

            attachments_data = request.data.copy().pop("attachments", [])

            processed_attachments_data = []
            for attachment_data in attachments_data:
                processed_attachment_data = {"file": attachment_data}
                processed_attachments_data.append(processed_attachment_data)

            for attachment_data in processed_attachments_data:
                attachment_data["uploader"] = request.user
                Attachment.objects.create(project=project, **attachment_data)

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
        try:
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

            attachments_data = request.data.copy().pop("attachments", [])

            processed_attachments_data = []
            for attachment_data in attachments_data:
                processed_attachment_data = {"file": attachment_data}
                processed_attachments_data.append(processed_attachment_data)

            for attachment_data in processed_attachments_data:
                attachment_data["uploader"] = request.user
                Attachment.objects.create(project=instance, **attachment_data)

            response_data = {
                "success": True,
                "message": "Project updated successfully.",
            }
            return Response(response_data, status=status.HTTP_200_OK)

        except serializers.ValidationError as e:
            response_data = {"success": False, "message": e.detail}
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

        # pylint: disable=broad-except
        except Exception as e:
            response_data = {
                "success": False,
                "message": f"Error updating project: {e}",
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


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
        if self.action == "create":
            return TaskCreateSerializer
        return TaskSerializer

    @action(detail=False, methods=["get"])
    def get_queryset(self):
        queryset = super().get_queryset()
        title = self.request.query_params.get("title")
        description = self.request.query_params.get("description")
        priority = self.request.query_params.get("priority")
        status = self.request.query_params.get("status")
        task_type = self.request.query_params.get("type")
        project = self.request.query_params.get("project")
        assignees = self.request.query_params.get("assignees")

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

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

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
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            task = serializer.save(created_by=self.request.user)

            attachments_data = request.data.copy().pop("attachments", [])

            processed_attachments_data = []
            for attachment_data in attachments_data:
                processed_attachment_data = {"file": attachment_data}
                processed_attachments_data.append(processed_attachment_data)

            for attachment_data in processed_attachments_data:
                attachment_data["uploader"] = request.user
                Attachment.objects.create(task=task, **attachment_data)

            response_data = {"success": True, "message": "Task created successfully."}
            return Response(response_data, status=status.HTTP_201_CREATED)

        except serializers.ValidationError as e:
            response_data = {"success": False, "message": e.detail}
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

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

    @action(detail=True, methods=["get"])
    def comments_count(self, request, pk=None):
        task = self.get_object()
        view = CommentForTaskView()
        view.request = request
        queryset = view.get_queryset()
        comments_count = queryset.filter(task_id=task.id).count()

        serializer = self.get_serializer(task)
        task_data = serializer.data
        task_data["comments_count"] = comments_count

        return Response(task_data)


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

    def get_serializer_class(self):
        if self.action == "create":
            return CommentCreateSerializer
        return CommentSerializer

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

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            # serializer = CommentCreateSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            attachments_data = request.data.copy().pop("attachments", [])
            comment = serializer.save(created_by=self.request.user)

            processed_attachments_data = []
            for attachment_data in attachments_data:
                processed_attachment_data = {"file": attachment_data}
                processed_attachments_data.append(processed_attachment_data)

            for attachment_data in processed_attachments_data:
                attachment_data["uploader"] = request.user
                Attachment.objects.create(comment=comment, **attachment_data)

            response_data = {
                "success": True,
                "message": "Comment created successfully.",
            }
            return Response(response_data, status=status.HTTP_201_CREATED)

        # pylint: disable=broad-except
        except Exception as e:
            response_data = {
                "success": False,
                "message": f"Error creating comment: {e}.",
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

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
