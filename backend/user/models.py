import cloudinary
import cloudinary.uploader

from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    PermissionsMixin,
    AbstractBaseUser,
)
from django.core.exceptions import ValidationError


def validate_file_size(value):
    max_file_size_mb = 20
    max_file_size_bytes = max_file_size_mb * 1024 * 1024

    if value.size > max_file_size_bytes:
        raise ValidationError("File size exceeds maximum limit (20MB).")


ROLES = [
    ("guest", "Guest"),
    ("member", "Member"),
    ("manager", "Manager"),
    ("admin", "Admin"),
]

THEMES = [
    ("dark_blue", "Dark Blue"),
    ("light_blue", "Light Blue"),
]

GENDER = [
    ("male", "Male"),
    ("female", "Female"),
    ("empty", "Prefer not to say"),
]


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        user = self.model(
            username=username,
            email=self.normalize_email(email),
            **extra_fields,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    # Guest - basic role - read-only
    def create_guest(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("role", "guest")
        return self.create_user(username, email, password, **extra_fields)

    # Member - more advanced role - add and edit tickets
    def create_member(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("role", "member")
        return self.create_user(username, email, password, **extra_fields)

    # Manager - additionally can delete tickets and create projects
    def create_manager(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("role", "manager")
        return self.create_user(username, email, password, **extra_fields)

    # Admin - custom admin for dashboards and advanced roles
    def create_admin(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("role", "admin")
        return self.create_user(username, email, password, **extra_fields)

    # Superuser - Django's default superuser
    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_admin", True)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(username, email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=100, unique=True)
    first_name = models.CharField(max_length=150, null=False, blank=False)
    last_name = models.CharField(max_length=150, null=False, blank=False)

    email = models.EmailField(max_length=255, unique=True, blank=False, null=False)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    theme = models.CharField(max_length=20, choices=THEMES, default="dark_blue")
    role = models.CharField(max_length=20, choices=ROLES, default="guest")

    join_date = models.DateTimeField(auto_now_add=True)
    last_loggin = models.DateTimeField(auto_now=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return str(self.username)


class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    photo = models.FileField(
        upload_to="photos/%Y/%m/%d/", validators=[validate_file_size]
    )
    birthdate = models.DateField(blank=True, null=True, verbose_name="Date of Birth")
    gender = models.CharField(max_length=20, choices=GENDER, blank=True)

    is_configured = models.BooleanField(default=False)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["user__username"]
        indexes = [models.Index(fields=["user"])]

    def __str__(self):
        return f"{self.user.username}'s profile"

    def delete(self, *args, **kwargs):
        if self.photo:
            public_id = "/".join(self.photo.name.split("/")[-7:])
            cloudinary.uploader.destroy(public_id)
            print(f"Deleted file with public ID: {public_id}")
        super().delete(*args, **kwargs)
