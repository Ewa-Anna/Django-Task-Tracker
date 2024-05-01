from django.core.files.uploadedfile import UploadedFile
from django.contrib.auth import get_user_model, login, logout
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django_rest_passwordreset.views import ResetPasswordConfirm

from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication, SessionAuthentication

from task.models import Project, Task
from task.serializers import ProjectSerializer, TaskSerializer

from .serializers import (
    UserSerializer,
    LoginSerializer,
    ChangePasswordSerializer,
    CustomPasswordTokenSerializer,
    ProfileSerializer,
    UserProfileSerializer,
)
from .models import Profile
from .permissions import IsProfileComplete


User = get_user_model()


class LoginView(APIView):
    """
    This view is for login purposes.
    In reponse it returns basic user data.
    """

    permission_classes = []
    authentication_classes = []

    def post(self, request):
        serializer = LoginSerializer(
            data=request.data, context={"request": self.request}
        )

        try:
            serializer.is_valid(raise_exception=True)
        except serializers.ValidationError as e:
            error_message = e.detail.get("non_field_errors", ["Unknown error"])[0]
            return Response(
                {"success": False, "message": error_message},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = serializer.validated_data["user"]

        login(request, user, backend="user.backends.EmailBackend")

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
            "photo": profile.photo.url if profile.photo else None,
            "birthdate": profile.birthdate,
            "gender": profile.gender,
            "csrf_token": request.META.get("CSRF_COOKIE"),
        }

        response = Response(response_data, status=status.HTTP_202_ACCEPTED)
        return response


class LogoutView(APIView):
    """
    This view is for logout purposes.
    """

    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def post(self, request):
        logout(request)
        return Response(
            {"detail": "Successfully logged out."}, status=status.HTTP_200_OK
        )


class RegistrationView(generics.CreateAPIView):
    """
    This view is for registration purposes.
    """

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

        # pylint: disable=broad-exception-caught
        except Exception as e:
            print(f"Error sending email: {e}")

    def perform_create(self, serializer):
        user = serializer.save()
        user.is_active = False
        user.save()

        self.send_auth_email(user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except serializers.ValidationError as e:
            error_message = {field: messages[0] for field, messages in e.detail.items()}
            if "Passwords do not match" in error_message:
                return Response(
                    {"success": False, "message": "Passwords do not match"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            return Response(
                {"success": False, "message": error_message},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = serializer.save()

        # self.perform_create(serializer)

        login(self.request, user, backend="user.backends.EmailBackend")

        response_data = {
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "csrf_token": request.META.get("CSRF_COOKIE"),
        }
        return Response(response_data, status=status.HTTP_201_CREATED)


class ActivationUserEmailView(APIView):
    """
    This view is for activation of user's email.
    """

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
    """
    This view allows user to change their password.
    """

    queryset = User.objects.all()
    permission_classes = [IsAuthenticated, IsProfileComplete]
    serializer_class = ChangePasswordSerializer


class CustomPasswordTokenView(ResetPasswordConfirm, generics.GenericAPIView):
    """
    This view is for validating password update.
    """

    queryset = User.objects.all()
    serializer_class = CustomPasswordTokenSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(
            {"success": True, "message": "Password updated successfully."},
            status=status.HTTP_200_OK,
        )


class DashboardView(APIView):
    """
    This view allows listing data for the user's profile and permits editing them.
    Additionally, it returns a list of projects owned by the user,
    projects assigned to the user, and assigned tasks.
    """

    permission_classes = [IsAuthenticated, IsProfileComplete]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    serializers = UserProfileSerializer
    parser_classes = [MultiPartParser, FormParser, FileUploadParser]

    def get_user_data(self, user):
        profile = Profile.objects.get_or_create(user=user)[0]
        user_data = {
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "role": user.role,
            "join_date": user.join_date,
            "last_login": user.last_login,
            "bio": profile.bio,
            "photo": profile.photo.url if profile.photo else None,
            "birthdate": profile.birthdate,
            "gender": profile.gender,
        }
        return user_data

    def get(self, request):
        user = request.user
        user_data = self.get_user_data(user)

        projects = Project.objects.filter(owner=user)
        project_serializer = ProjectSerializer(
            projects, many=True, context={"request": request}
        )
        user_data["projects"] = project_serializer.data

        assigned_projects = Project.objects.filter(assignees=user)
        assigned_project_serializer = ProjectSerializer(
            assigned_projects, many=True, context={"request": request}
        )
        user_data["assigned_projects"] = assigned_project_serializer.data

        assigned_tasks = Task.objects.filter(assignees=user)
        assigned_task_serializer = TaskSerializer(
            assigned_tasks, many=True, context={"request": request}
        )
        user_data["assigned_tasks"] = assigned_task_serializer.data

        return Response(user_data)

    def update_user_profile(self, user, profile, request_data):
        user_fields = ["first_name", "last_name"]
        profile_fields = ["bio", "birthdate", "gender"]

        for field in user_fields:
            setattr(user, field, request_data.get(field, getattr(user, field)))

        for field in profile_fields:
            setattr(profile, field, request_data.get(field, getattr(profile, field)))

        photo_file = request_data.get("photo")
        if isinstance(photo_file, UploadedFile):
            profile.photo = photo_file

        user.save()
        profile.save()

    def post(self, request):
        user = request.user
        user.first_name = request.data.get("first_name", user.first_name)
        user.last_name = request.data.get("last_name", user.last_name)
        user.save()

        profile, _ = Profile.objects.get_or_create(user=user)
        profile.bio = request.data.get("bio", profile.bio)

        profile.birthdate = request.data.get("birthdate", profile.birthdate)
        profile.gender = request.data.get("gender", profile.gender)
        profile.save()

        user_data = self.get_user_data(user)
        return Response(user_data, status=status.HTTP_200_OK)

    def patch(self, request):
        user = request.user
        profile, _ = Profile.objects.get_or_create(user=user)
        self.update_user_profile(user, profile, request.data)

        user_data = self.get_user_data(user)
        return Response(user_data, status=status.HTTP_200_OK)


class DeactivateAccountView(APIView):
    """
    This view allows user to deactivate their account.
    """

    permission_classes = [IsAuthenticated, IsProfileComplete]

    def post(self, request):
        user = request.user
        user.is_active = False
        user.save()

        return Response(
            {"message": "Account deactivated successfully."}, status=status.HTTP_200_OK
        )


class SessionValidationView(APIView):
    """
    This view allows to validate the session.
    For redirecting purposes, when the session is expired.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
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
            "photo": profile.photo.url if profile.photo else None,
            "birthdate": profile.birthdate,
            "gender": profile.gender,
            "csrf_token": request.META.get("CSRF_COOKIE"),
        }
        response_data["success"] = True
        response_data["message"] = "Session is valid"

        return Response(response_data, status=status.HTTP_200_OK)


class OnboardingView(APIView):
    """
    This view allows user to first-time update the profile in order to set
    is_configured value to True.
    """

    parser_classes = [MultiPartParser, FormParser, FileUploadParser]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        profile = request.user.profile
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Profile updated successfully"}, status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
