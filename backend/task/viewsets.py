from django.utils import timezone

from rest_framework import viewsets
from rest_framework.decorators import action

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import Project, Task, Comment, Attachment
from .serializers import (
    ProjectSerializer,
    TaskSerializer,
    CommentSerializer,
    AttachmentSerializer,
)
# from adminx.signals import track_project_changes
from backend.pagination import CustomPagination


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = CustomPagination

    @action(detail=False, methods=["get"])
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                "title",
                openapi.IN_QUERY,
                description="Filter by title",
                type=openapi.TYPE_STRING,
            ),
            openapi.Parameter(
                "owner",
                openapi.IN_QUERY,
                description="Filter by owner",
                type=openapi.TYPE_STRING,
            ),
            openapi.Parameter(
                "tags",
                openapi.IN_QUERY,
                description="Filter by tags (input only one tag per query)",
                type=openapi.TYPE_ARRAY,
                items=openapi.Items(type="string"),
            ),
            openapi.Parameter(
                "ordering",
                openapi.IN_QUERY,
                description="Ordering of results",
                type=openapi.TYPE_STRING,
            ),
            openapi.Parameter(
                "visibility",
                openapi.IN_QUERY,
                description="Filter by visibility",
                type=openapi.TYPE_STRING,
                enum=["public", "private"],
            ),
            openapi.Parameter(
                "start_date",
                openapi.IN_QUERY,
                description="Filter by start date (YYYY-MM-DD)",
                type=openapi.TYPE_STRING,
                format="date",
            ),
            openapi.Parameter(
                "end_date",
                openapi.IN_QUERY,
                description="Filter by end date (YYYY-MM-DD)",
                type=openapi.TYPE_STRING,
                format="date",
            ),
        ],
    )
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
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

    
    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
        
    #     if kwargs.get('using') == 'default':
    #         headers = self.get_success_headers(serializer.data)
    #         return Response(serializer.data, status=201, headers=headers)

    #     track_project_changes.send(
    #         sender=Project,
    #         instance=serializer.instance,
    #         created=True,
    #         user=request.user,  
    #     )

    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=201, headers=headers)

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    pagination_class = CustomPagination

    @action(detail=False, methods=["get"])
    def task(self, request):
        title = request.query_params.get("title")
        description = request.query_params.get("description")
        priority = request.query_params.get("priority")
        status = request.query_params.get("status")
        project = request.query_params.get("project")
        owner = request.query_params.get("owner")
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

        if project:
            queryset = queryset.filter(project=project)

        if owner:
            queryset = queryset.filter(owner__username=owner)

        if assignees:
            assignee_list = assignees.split(",")
            queryset = queryset.filter(assignees__username__in=assignee_list)

        paginator = CustomPagination()
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        serializer = TaskSerializer(paginated_queryset, many=True)
        return paginator.get_paginated_response(serializer.data)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    pagination_class = CustomPagination

    @action(detail=False, methods=["get"])
    def comment(self, request):
        project = request.query_params.get("project")
        task = request.query_params.get("task")
        creator = request.query_params.get("creator")

        queryset = Comment.objects.all()

        if project:
            queryset = queryset.filter(project=project)

        if task:
            queryset = queryset.filter(task=task)

        if creator:
            queryset = queryset.filter(creator__username=creator)

        paginator = CustomPagination()
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        serializer = CommentSerializer(paginated_queryset, many=True)
        return paginator.get_paginated_response(serializer.data)


class AttachmentViewSet(viewsets.ModelViewSet):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer
