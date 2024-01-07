import json

from django.contrib.auth import get_user_model
from rest_framework import HTTP_HEADER_ENCODING
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed, ValidationError

from .jwt import decode_jwt


User = get_user_model()


class TokenAuthentication(BaseAuthentication):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def authenticate(self, request):
        token = request.META.get("HTTP_AUTHORIZATION")

        if token is None:
            return None

        segments = token.split(".")

        if len(segments) == 0:
            return None

        if len(segments) != 3:
            raise AuthenticationFailed(
                "Authorization header must contain three space-delimited values",
                code="bad_authorization_header",
            )

        if segments[1] is None:
            return None

        validated_token = decode_jwt(segments[1])

        return self.get_user(validated_token), validated_token

    def get_user(self, validated_token):
        res = json.loads(validated_token)
        try:
            user_id = res.get("id")
        except KeyError:
            raise ValidationError("No user matched given ID")

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise AuthenticationFailed("User does not exist", code="user_not_found")

        return user
