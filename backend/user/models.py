from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    PermissionsMixin,
    AbstractBaseUser,
)


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
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)

    email = models.EmailField(max_length=255, unique=True, blank=False, null=False)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    theme = models.CharField(
        max_length=20, choices=THEMES, default="dark_blue", editable=False
    )
    role = models.CharField(
        max_length=20, choices=ROLES, default="guest", editable=False
    )

    join_date = models.DateTimeField(auto_now_add=True)
    last_loggin = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return str(self.username)


class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    photo = models.URLField(blank=True)
    birthdate = models.DateField(blank=True, null=True, verbose_name="Date of Birth")

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["user__username"]
        indexes = [models.Index(fields=["user"])]

    def __str__(self):
        return f"{self.user.username}'s profile"
