from django.contrib.auth import get_user_model
from django.core.mail import EmailMessage

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import SessionAuthentication

from .models import ChangeLog, ContactForm
from .serializers import ChangeLogSerializer, ContactFormSerializer
from user.permissions import CustomPermission


User = get_user_model()


class ChangeLogView(APIView):
    permission_classes = [IsAuthenticated, CustomPermission]
    authentication_classes = [SessionAuthentication]
    serializer_class = ChangeLogSerializer

    required_roles = {
        "GET": ["manager", "admin"],
        "POST": ["admin"],
        "PUT": ["admin"],
        "PATCH": ["admin"],
        "DELETE": ["admin"],
    }

    def get_queryset(self):
        return ChangeLog.objects.all()

    def get(self, request):
        queryset = self.get_queryset()
        serialized_data = self.serializer_class(queryset, many=True).data
        return Response(
            {"detail": "Success", "data": serialized_data},
            status=status.HTTP_200_OK,
        )


class ContactFormView(APIView):
    queryset = ContactForm.objects.all()
    serializer_class = ContactFormSerializer
    permission_classes = [CustomPermission]

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
        serialized_data = self.serializer_class(queryset, many=True).data
        return Response(
            serialized_data,
            status=status.HTTP_200_OK,
        )

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = ContactFormSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        self.send_email_notification(serializer.validated_data)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def send_email_notification(self, data):
        subject = f"Thank You for Contacting BugBard - Confirmation"
        message = f"We received your message as follows:\n\nName: {data['name']}\nEmail: {data['email']}\nMessage: {data['message']}\n\nSomeone will contact you shortly.\n\nBest regards,\nBugBard Administration"

        try:
            email = EmailMessage(subject, message, to=[data["email"]])
            email.send()

        except Exception as e:
            print(f"Error sending email: {e}")

    def get_permissions(self):
        if self.request.method == "POST":
            return [AllowAny()]
        return super().get_permissions()
