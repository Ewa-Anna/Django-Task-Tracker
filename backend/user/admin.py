from django.contrib import admin
from user.models import CustomUser, Profile


admin.site.register(CustomUser)
admin.site.register(Profile)
