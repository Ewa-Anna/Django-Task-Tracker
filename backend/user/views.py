from django.contrib.auth import get_user_model, login, logout
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_str, force_bytes
from django_rest_passwordreset.views import ResetPasswordConfirm

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication, SessionAuthentication

from .serializers import UserSerializer, LoginSerializer, ChangePasswordSerializer, CustomPasswordTokenSerializer
from .models import Profile


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
        login(request, user, backend="user.backends.EmailBackend")
        # token, created = Token.objects.get_or_create(user=user)

        profile = Profile.objects.get_or_create(user=user)[0]

        response_data = {
            "user_id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "theme": user.theme,
            "role": user.role,
            "join_date": user.join_date,
            "last_loggin": user.last_loggin,
            "bio": profile.bio,
            "photo": profile.photo,
            "birthdate": profile.birthdate,
            # "token": token.key,
        }

        return Response(response_data, status=status.HTTP_202_ACCEPTED)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def post(self, request):
        logout(request)
        return Response(
            {"detail": "Successfully logged out."}, status=status.HTTP_200_OK
        )


class RegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def send_auth_email(self, user):
        current_site = get_current_site(self.request)
        domain = current_site.domain
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        mail_subject = "Activate your account"
        protocol = self.request.scheme

        url = f"{protocol}://{domain}/task-tracker/v1/user/activate/{uid}/{token}"
        message = f'<p><a href="{url}">{url}</a></p>'

        try:
            email = EmailMessage(mail_subject, message, to=[user.email])
            email.send()

        except Exception as e:
            print(f"Error sending email: {e}")

    def perform_create(self, serializer):
        user = serializer.save()
        user.is_active = False
        user.save()

        self.send_auth_email(user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # self.perform_create(serializer)

        login(self.request, user, backend="user.backends.EmailBackend")

        response_data = {
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
        }
        return Response(response_data, status=status.HTTP_201_CREATED)


class ActivationUserEmailView(APIView):
    permission_classes = []
    authentication_classes = []

    def get(self, request, uidb64, token):
        try:
            uid = force_bytes(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
            if default_token_generator.check_token(user, token):
                user.is_active = True
                user.save()
                return Response(
                    {"detail": "Your account has been activated. You can now log in."},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"detail": "Activation link is invalid or expired."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response(
                {"detail": "Activation link is invalid or expired."},
                status=status.HTTP_400_BAD_REQUEST,
            )


class ChangePasswordView(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer


class CustomPasswordTokenView(ResetPasswordConfirm, generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = CustomPasswordTokenSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)
    

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

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
