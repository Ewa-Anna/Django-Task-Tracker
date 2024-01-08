from django.contrib.auth import get_user_model, logout
from django.core.mail import EmailMessage
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes

from rest_framework.viewsets import ModelViewSet
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.response import Response
from rest_framework.views import APIView

from user.permissions import IsAdmin

from .serializers import UserSerializer


User = get_user_model()


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        logout(request)
        self.perform_destroy(instance)
        return Response(status=HTTP_204_NO_CONTENT)

    def send_auth_email(self, user):
        current_site = get_current_site(self.request)
        domain = current_site.domain
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        mail_subject = "Activate your account"
        protocol = self.request.scheme

        url = f"{protocol}://{domain}/task-tracker/v1/user/activate/{uid.decode()}/{token}"
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


class ActivationUserEmailView(APIView):
    permission_classes = []
    authentication_classes = []

    def get(self, request, uidb64, token):
        try:
            uid = str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response(
                "Thank you for your email confirmation. You can now login to your account.",
                status=HTTP_200_OK,
            )
        else:
            return Response(
                "Activation link is invalid or expired.", status=HTTP_400_BAD_REQUEST
            )
