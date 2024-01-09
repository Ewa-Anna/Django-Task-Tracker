from django.contrib.auth import get_user_model, authenticate

from djoser.conf import settings
from djoser.serializers import TokenCreateSerializer

from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import Profile


User = get_user_model()


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class UserSerializer(ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "profile"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(label="Username", write_only=True)
    password = serializers.CharField(
        label="Password",
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
    )

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        if username and password:
            user = authenticate(
                request=self.context.get("request"),
                username=username,
                password=password,
            )

            if not user:
                msg = "Incorrect username or password"
                raise serializers.ValidationError(msg, code="authorization")

        else:
            msg = "Both fields are required"
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs


class CustomTokenCreateSerializer(TokenCreateSerializer):
    def validate(self, attrs):
        password = attrs.get("password")
        params = {settings.LOGIN_FIELD: attrs.get(settings.LOGIN_FIELD)}
        self.user = authenticate(
            request=self.context.get("request"), **params, password=password
        )
        if not self.user:
            self.user = User.objects.filter(**params).first()
            if self.user and not self.user.check_password(password):
                self.fail("invalid_credentials")

        if self.user:
            return attrs
        self.fail("invalid_credentials")
