from django.http import HttpRequest
from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication

from .models import ChangeLog
from .serializers import ChangeLogSerializer
# from user.permissions import IsAdmin


User = get_user_model()


class ChangeLogView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    serializer_class = ChangeLogSerializer
    
    # @staticmethod
    # def get_changed_by_user(request):
    #     if request.user.is_authenticated:
    #         return request.user
    #     else:
    #         return User.objects.get(username='anonymous')

    def get_queryset(self):
        return ChangeLog.objects.all()
    
    def get(self, request):
        queryset = self.get_queryset()
        serialized_data = self.serializer_class(queryset, many=True).data
        return Response({"detail": "Success", "data": serialized_data}, status=status.HTTP_200_OK,)