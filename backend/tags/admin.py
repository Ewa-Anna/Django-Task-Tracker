from django.contrib import admin
from tags.models import CustomTags


class TagsAdmin(admin.ModelAdmin):
    list_display = [
        "name",
    ]
    list_filter = [
        "name",
    ]


admin.site.register(CustomTags, TagsAdmin)
