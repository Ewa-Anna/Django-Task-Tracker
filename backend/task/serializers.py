from django.utils import timezone

from rest_framework import serializers

from user.models import CustomUser
from user.serializers import ProfileSerializer
from tags.serializers import CustomTagSerializer
from tags.models import CustomTags

from .models import Project, Task, Comment, Attachment


class AttachmentSerializer(serializers.ModelSerializer):
    uploader = serializers.HiddenField(default=serializers.CurrentUserDefault())
    url = serializers.SerializerMethodField()
    filename_to_display = serializers.SerializerMethodField()

    class Meta:
        model = Attachment
        fields = [
            "id",
            "url",
            "created",
            "task",
            "project",
            "comment",
            "uploader",
            "filename_to_display",
        ]

    def get_url(self, obj):
        request = self.context.get("request")
        if obj.file:
            cloudinary_url = obj.file.url
            transformed_url = cloudinary_url.replace(
                "/upload/", "/upload/fl_attachment/"
            )
            return (
                request.build_absolute_uri(transformed_url)
                if request
                else transformed_url
            )
        return None

    def get_filename_to_display(self, obj):
        if obj.file:
            file_url = obj.file.url
            file_name = file_url.split("/")[-1]
            filename_without_suffix = file_name.rsplit("_", 1)[0]
            return filename_without_suffix
        return None


class OwnerSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = CustomUser
        fields = ["id", "first_name", "last_name", "email", "role", "profile"]
        extra_kwargs = {
            "first_name": {"required": False},
            "last_name": {"required": False},
            "email": {"required": False},
        }


class AssigneeSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    email = serializers.EmailField()
    role = serializers.CharField(required=False)
    profile = ProfileSerializer(read_only=True)

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass


class CustomCreatedBySerializer(serializers.StringRelatedField):
    def to_representation(self, value):
        if value:
            return {
                "id": value.id,
                "first_name": value.first_name,
                "last_name": value.last_name,
                "email": value.email,
                "photo": value.profile.photo,
            }
        return None

    def to_internal_value(self, data):
        pass


class ProjectCreateSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(required=False)
    assignees = serializers.ListField(required=False)
    attachments = AttachmentSerializer(many=True, required=False)

    class Meta:
        model = Project
        fields = [
            "id",
            "assignees",
            "tags",
            "title",
            "description",
            "deadline",
            "visibility",
            "status",
            "archive",
            "attachments",
            "owner",
        ]

    def create(self, validated_data):
        attachments_data = validated_data.pop("attachments", [])
        assignees_data = validated_data.pop("assignees", [])
        tags_data = validated_data.pop("tags", [])
        project = Project.objects.create(**validated_data)

        for assignee in assignees_data:
            project.assignees.add(assignee)

        for tag_id in tags_data:
            try:
                tag = CustomTags.objects.get(id=tag_id)
                project.tags.add(tag)
            except CustomTags.DoesNotExist:
                pass

        for attachment_data in attachments_data:
            Attachment.objects.create(project=project, **attachment_data)

        return project

    def update(self, instance, validated_data):
        attachments_data = validated_data.pop("attachments", [])
        assignees_data = validated_data.pop("assignees", None)
        tags_data = validated_data.pop("tags", None)

        instance.__dict__.update(validated_data)

        if assignees_data is not None:
            instance.assignees.clear()
            for assignee in assignees_data:
                instance.assignees.add(assignee)

        if tags_data is not None:
            instance.tags.clear()
            for tag_id in tags_data:
                try:
                    tag = CustomTags.objects.get(id=tag_id)
                    instance.tags.add(tag)
                except CustomTags.DoesNotExist:
                    pass

        instance.save()

        for attachment_data in attachments_data:
            Attachment.objects.create(project=instance, **attachment_data)

        return instance

    def validate_assignees(self, value):
        max_assignees = 10

        if len(value) > max_assignees:
            raise serializers.ValidationError(
                f"Maximum {max_assignees} assignees allowed for the project."
            )

        return value

    def validate_attachments(self, value):
        max_attachments = 3

        if len(value) > max_attachments:
            raise serializers.ValidationError(
                f"Maximum {max_attachments} attachments allowed for the project."
            )

        return value

    def validate_deadline(self, value):
        today = timezone.now()

        if value <= today:
            raise serializers.ValidationError(
                "The deadline must be set to a future date."
            )

        return value


class ProjectSerializer(serializers.ModelSerializer):
    owner = OwnerSerializer(read_only=True)
    assignees = AssigneeSerializer(many=True, required=False)
    attachments = AttachmentSerializer(read_only=True, many=True)
    tags = CustomTagSerializer(many=True, read_only=True)
    created_by = CustomCreatedBySerializer(
        read_only=True, default=serializers.CurrentUserDefault()
    )

    updated_by = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )

    class Meta:
        model = Project
        fields = "__all__"

    def create(self, validated_data):
        assignees_data = validated_data.pop("assignees", [])
        project = Project.objects.create(**validated_data)
        self.create_assignees(project, assignees_data)
        return project

    def create_assignees(self, project, assignees_data):
        assignees = []
        for assignee_data in assignees_data:
            assignee_id = assignee_data.get("id")

            if assignee_id is not None:
                assignees.append(CustomUser.objects.get(pk=assignee_id))
            else:
                assignee_serializer = AssigneeSerializer(data=assignee_data)
                assignee_serializer.is_valid(raise_exception=True)
                assignees.append(assignee_serializer.save())

        project.assignees.set(assignees)

    # def validate_owner(self, value):
    #     if isinstance(value, CustomUser):
    #         value = value.id
    #     try:
    #         user = CustomUser.objects.get(pk=value, is_active=True)
    #     except CustomUser.DoesNotExist:
    #         raise serializers.ValidationError(
    #             "Invalid owner. User does not exist or is not active."
    #         )

    #     return value


class TaskCreateSerializer(serializers.ModelSerializer):
    attachments = AttachmentSerializer(many=True, required=False)
    comments_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Task
        fields = [
            "id",
            "assignees",
            "title",
            "description",
            "priority",
            "status",
            "type",
            "project",
            "archive",
            "attachments",
            "comments_count",
        ]

    def validate_attachments(self, value):
        max_attachments = 3

        if len(value) > max_attachments:
            raise serializers.ValidationError(
                f"Maximum {max_attachments} attachments allowed for the project."
            )

        return value

    def create(self, validated_data):
        attachments_data = validated_data.pop("attachments", [])
        task = Task.objects.create(**validated_data)

        for attachment_data in attachments_data:
            Attachment.objects.create(task=task, **attachment_data)

        return task

    def get_comments_count(self, obj):
        return Comment.objects.filter(task=obj).count()


class TaskSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField(default=serializers.CurrentUserDefault())
    attachments = AttachmentSerializer(read_only=True, many=True, required=False)
    created_by = CustomCreatedBySerializer(
        read_only=True, default=serializers.CurrentUserDefault()
    )
    updated_by = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )

    class Meta:
        model = Task
        fields = "__all__"

    def create_assignees(self, task, assignee_data):
        assignee_id = assignee_data.get("id")

        if assignee_id is not None:
            assignee = CustomUser.objects.get(pk=assignee_id)
            task.assignees = assignee


class CommentSerializer(serializers.ModelSerializer):
    created_by = CustomCreatedBySerializer(
        read_only=True, default=serializers.CurrentUserDefault()
    )
    updated_by = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )
    attachments = AttachmentSerializer(many=True, required=False)

    class Meta:
        model = Comment
        fields = "__all__"

    def validate_attachments(self, value):
        max_attachments = 3

        if len(value) > max_attachments:
            raise serializers.ValidationError(
                f"Maximum {max_attachments} attachments allowed for the project."
            )

        return value


class DictionaryContentSerializer(serializers.Serializer):
    dictionary_name = serializers.CharField(max_length=255)
    content = serializers.DictField()

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass


class CommentCreateSerializer(serializers.ModelSerializer):
    attachments = AttachmentSerializer(many=True, required=False)

    class Meta:
        model = Comment
        fields = ["id", "attachments", "text", "project", "task", "created_by"]

    def create(self, validated_data):
        attachments_data = validated_data.pop("attachments", [])
        comment = Comment.objects.create(**validated_data)

        for attachment_data in attachments_data:
            Attachment.objects.create(comment=comment, **attachment_data)

        return comment

    def validate_attachments(self, value):
        max_attachments = 3

        if len(value) > max_attachments:
            raise serializers.ValidationError(
                f"Maximum {max_attachments} attachments allowed for the comment."
            )

        return value
