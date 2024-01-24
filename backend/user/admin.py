from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from user.models import CustomUser, Profile


class CustomUserAdmin(UserAdmin):
    list_display = (
        "username",
        "email",
        "first_name",
        "last_name",
        "role",
        "theme",
        "is_active",
        "is_staff",
        "is_admin",
        "join_date",
        "last_loggin",
    )
    list_filter = ("is_active", "is_staff", "is_admin", "role", "theme")
    search_fields = ("username", "email", "first_name", "last_name")

    fieldsets = (
        (None, {"fields": ("username", "email", "password")}),
        ("Personal Info", {"fields": ("first_name", "last_name")}),
        (
            "Permissions",
            {"fields": ("is_active", "is_staff", "is_admin", "role", "theme")},
        ),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username", "email", "password1", "password2"),
            },
        ),
    )


class ProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "bio", "photo", "birthdate", "created", "updated")
    search_fields = ("user__username",)

    fieldsets = (
        (None, {"fields": ("user",)}),
        ("Profile Info", {"fields": ("bio", "photo", "birthdate")}),
    )


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Profile, ProfileAdmin)
