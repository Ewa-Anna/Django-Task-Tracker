from django.contrib.auth import get_user_model, login

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import UserSerializer, LoginSerializer

User = get_user_model()


class LoginView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        serializer = LoginSerializer(
            data=request.data, context={"request": self.request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        response_data = {
            "user_id": user.id,
        }
        return Response(response_data, status=status.HTTP_202_ACCEPTED)


class RegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        login(self.request, user)

        response_data = {
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
        }

        response = Response(response_data, status=status.HTTP_201_CREATED)
        response.set_cookie(
            "sessionid",
            request.session.session_key,
            max_age=None,
            expires=None,
            domain=None,
            path="/",
            secure=None,
            httponly=True,
            samesite=None,
        )
        return response


class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        user_data = {
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "role": user.role,
            "join_date": user.join_date,
            "last_loggin": user.last_loggin,
        }
        return Response(user_data)
