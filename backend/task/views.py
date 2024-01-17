from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import DictionaryContentSerializer
from .models import PRIORITY, STATUS, VISIBILITY
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
