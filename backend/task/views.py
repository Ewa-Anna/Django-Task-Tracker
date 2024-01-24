from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import DictionaryContentSerializer, TaskSerializer
from .models import PRIORITY, STATUS, VISIBILITY, Project
from user.models import ROLES, THEMES


class DictionaryContentView(APIView):
    def get(self, request, dictionary_name):
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
        else:
            return Response(
                {"error": f"Dictionary with name {dictionary_name} not found"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = DictionaryContentSerializer(
            data={"dictionary_name": dictionary_name, "content": content}
        )
        serializer.is_valid(raise_exception=True)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class ProjectDeleteView(APIView):
    def get(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
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
                status=status.HTTP_200_OK,
            )
        except Project.DoesNotExist:
            return Response(
                {"message": "Project not found"}, status=status.HTTP_404_NOT_FOUND
            )
