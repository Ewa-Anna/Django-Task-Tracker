from django.utils import timezone
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
from django_rest_passwordreset.serializers import (
    PasswordValidateMixin,
    PasswordTokenSerializer,
)

from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import Profile, CustomUser, GENDER, THEMES


User = get_user_model()


class ProfileSerializer(ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ["user", "bio", "url", "birthdate", "gender", "photo"]
        read_only_fields = ["is_configured"]

    def get_url(self, obj):
        if obj.photo and hasattr(obj.photo, "url") and obj.photo.url:
            return obj.photo.url
        # pylint: disable=C0301
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png"  # noqa: E501

    def validate_birthdate(self, value):
        today = timezone.now()

        if value > today:
            raise serializers.ValidationError(
                "The birthdate cannot be set to a future date."
            )

        return value

    def update(self, instance, validated_data):
        instance.bio = validated_data.get("bio", instance.bio)
        instance.photo = validated_data.get("photo", instance.photo)
        instance.birthdate = validated_data.get("birthdate", instance.birthdate)
        instance.gender = validated_data.get("gender", instance.gender)

        if any(
            field in validated_data for field in ["bio", "photo", "birthdate", "gender"]
        ):
            instance.is_configured = True

        instance.save()
        return instance


class UserSerializer(ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    theme = serializers.CharField(default="dark_blue")
    role = serializers.CharField(default="guest")

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "password",
            "confirm_password",
            "profile",
            "theme",
            "role",
            "join_date",
            "last_loggin",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "theme": {"required": False},
            "role": {"required": False},
        }

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        confirm_password = validated_data.pop("confirm_password")

        email = validated_data.get("email")
        username = validated_data.get("username", email)

        if password != confirm_password:
            raise serializers.ValidationError(
                {"success": False, "message": "Passwords do not match"}
            )

        user = CustomUser(username=username, **validated_data)
        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        label="Password",
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
    )

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            user = authenticate(
                request=self.context.get("request"),
                email=email,
                password=password,
            )

            if not user:
                msg = "Incorrect email or password"
                raise serializers.ValidationError(msg, code="authorization")

        else:
            msg = "Both fields are required"
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass


class ChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    new_password_confirm = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ["old_password", "new_password", "new_password_confirm"]

    def validate(self, attrs):
        if attrs["new_password"] != attrs["new_password_confirm"]:
            raise serializers.ValidationError(
                {"new_password": "Passwords do not match."}
            )
        return attrs

    def validate_old_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError(
                {"old_password": "Old password is not correct."}
            )
        return value

    def update(self, instance, validated_data):
        instance.set_password(validated_data["new_password"])
        instance.save()
        return instance


class CustomPasswordTokenSerializer(PasswordValidateMixin, serializers.ModelSerializer):
    password = serializers.CharField(label="Password", write_only=True, required=True)
    confirm_password = serializers.CharField(
        label="Confirm password", write_only=True, required=True
    )
    token = serializers.CharField()

    class Meta:
        model = CustomUser
        fields = ["password", "confirm_password", "token"]


class CustomPasswordActivateSerializer(
    PasswordTokenSerializer, serializers.ModelSerializer
):
    password = serializers.CharField(label="Password", write_only=True, required=True)
    confirm_password = serializers.CharField(
        label="Confirm password", write_only=True, required=True
    )
    token = serializers.CharField()


# pylint: disable=abstract-method
class UserProfileSerializer(serializers.Serializer):
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    bio = serializers.CharField(required=False)
    # photo = serializers.ImageField(required=False)
    birthdate = serializers.DateField(required=False)
    gender = serializers.ChoiceField(choices=GENDER, required=False)
    theme = serializers.ChoiceField(choices=THEMES, required=False)
