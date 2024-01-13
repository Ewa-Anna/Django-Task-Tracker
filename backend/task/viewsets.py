from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Project, Task, Comment, Attachment
from .serializers import (
    ProjectSerializer,
    TaskSerializer,
    CommentSerializer,
    AttachmentSerializer,
)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    
    @action(detail=False, methods=["get"])
    def project(self, request):
        title = request.query_params.get("title")
        owner = request.query_params.get("owner")
        tags = request.query_params.getlist("tags")
        ordering = request.query_params.get("ordering")
        visibility = request.query_params.get("visibility", "public")
    
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

        serializer = ProjectSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class AttachmentViewSet(viewsets.ModelViewSet):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer
