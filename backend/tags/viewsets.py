from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response

from user.permissions import CustomPermission
from .models import CustomTags
from .serializers import CustomTagSerializer


class CustomTagViewSet(viewsets.ModelViewSet):
    queryset = CustomTags.objects.all()
    serializer_class = CustomTagSerializer
    permission_classes = [IsAuthenticated, CustomPermission]

    required_roles = {
        "GET": ["guest", "member", "manager", "admin"],
        "POST": ["admin"],
        "PUT": ["admin"],
        "PATCH": ["admin"],
        "DELETE": ["admin"],
    }

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True, "messege": "Tag created successfully"}, status=status.HTTP_201_CREATED)
        return Response({"success": False, "messege": f"Something went wrong: {serializer.errors['name'][0]}"}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True, "messege": "Tag updated successfully"})
        return Response({"success": False, "messege": f"Something went wrong: {serializer.errors['name'][0]}"}, status=status.HTTP_400_BAD_REQUEST)
