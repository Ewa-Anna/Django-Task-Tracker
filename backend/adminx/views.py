import json
from smtplib import SMTPException, SMTPAuthenticationError

from django.contrib.auth import get_user_model
from django.core.mail import EmailMessage
from django.db.models import Count
from django.http import JsonResponse

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import SessionAuthentication

from drf_api_logger.models import APILogsModel

from task.serializers import TaskSerializer
from task.models import Task, Project
from user.permissions import CustomPermission, IsProfileComplete
from backend.pagination import CustomPagination

from .models import ChangeLog, ContactForm
from .serializers import (
    ChangeLogSerializer,
    ContactFormSerializer,
    LastActivitySerializer,
)


User = get_user_model()


class ChangeLogView(APIView):
    """
    This view allows user to retrieve changes made in the database for
    projects, tasks, and comments.
    """

    permission_classes = [IsAuthenticated, CustomPermission, IsProfileComplete]
    authentication_classes = [SessionAuthentication]
    serializer_class = ChangeLogSerializer
    pagination_class = CustomPagination

    required_roles = {
        "GET": ["manager", "admin"],
        "POST": ["admin"],
        "PUT": ["admin"],
        "PATCH": ["admin"],
        "DELETE": ["admin"],
    }

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(queryset, request)
        serializer = self.serializer_class(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    def get_queryset(self):
        return ChangeLog.objects.all()


class ContactFormView(APIView):
    """
    This view is for contact form functionality.
    """

    queryset = ContactForm.objects.all()
    serializer_class = ContactFormSerializer
    permission_classes = [CustomPermission]
    pagination_class = CustomPagination

    required_roles = {
        "GET": ["manager", "admin"],
        "POST": ["admin"],
        "PUT": ["admin"],
        "PATCH": ["admin"],
        "DELETE": ["admin"],
    }

    def get_queryset(self):
        return ContactForm.objects.all()

    def get(self, request):
        queryset = self.get_queryset()
        paginator = self.pagination_class()
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        serialized_data = self.serializer_class(paginated_queryset, many=True).data
        return paginator.get_paginated_response(serialized_data)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = ContactFormSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        self.send_email_notification(serializer.validated_data)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def send_email_notification(self, data):
        subject = "Thank You for Contacting BugBard - Confirmation"
        message = (
            f"We received your message as follows:\n\n"
            f"Name: {data['name']}\n"
            f"Email: {data['email']}\n"
            f"Message: {data['message']}\n\n"
            f"Someone will contact you shortly.\n\n"
            f"Best regards,\n"
            f"BugBard Administration"
        )

        try:
            email = EmailMessage(subject, message, to=[data["email"]])
            email.send()

        except SMTPAuthenticationError as e:
            print(f"Error authenticating SMTP server: {e}")

        except SMTPException as e:
            print(f"Error sending email: {e}")

    def get_permissions(self):
        if self.request.method == "POST":
            return [AllowAny()]
        return super().get_permissions()


class LastActivity(ListAPIView):
    """
    This view shows last activity made in the application.
    With no query parameters it returns 4 newest public tasks.
    With ?data=mytasks it returns 4 newest task for current user.
    """

    serializer_class = LastActivitySerializer
    permission_classes = [IsAuthenticated, IsProfileComplete]
    pagination_class = None

    def get_queryset(self):
        my_tasks = Task.objects.filter(assignees=self.request.user)
        public_projects = Project.objects.filter(visibility="public")
        public_tasks = Task.objects.filter(project__in=public_projects)

        query_param = self.request.query_params.get("data")

        if query_param == "mytasks":
            queryset = my_tasks.order_by("-created")[:4]
        else:
            queryset = public_tasks.order_by("-created")[:4]

        return queryset


class TaskStatistics(APIView):
    """
    This view returns statistics for all tasks and for tasks of a currently logged in user.
    It returns type of task (bug, improvements, question, etc.) and amount of them for pie chart.
    """

    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, IsProfileComplete]
    pagination_class = None

    def get(self, request, *args, **kwargs):
        data_type = request.query_params.get("data")
        if data_type == "alltasks":
            queryset = Task.objects.all()
        elif data_type == "usertasks":
            queryset = Task.objects.filter(assignees=self.request.user)
        else:
            return Response({"error": "Invalid data parameter"}, status=400)

        task_counts = queryset.values("type").annotate(count=Count("type"))
        task_data = {task["type"]: task["count"] for task in task_counts}

        return Response(task_data)


class APILogsView(APIView):
    def get(self, request, *args, **kwargs):
        current_user = request.user
        who = current_user.first_name if current_user.is_authenticated else None
        api_logs = APILogsModel.objects.order_by("-added_on")

        logs_data = []
        for log in api_logs:
            response_data = json.loads(log.response)

            created_by = response_data.get("created_by", {})

            logs_data.append(
                {
                    "api": log.api,
                    "method": log.method,
                    "status_code": log.status_code,
                    "added_on": log.added_on.isoformat(),
                }
            )

        return JsonResponse(logs_data, safe=False)
