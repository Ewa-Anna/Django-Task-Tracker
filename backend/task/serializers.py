from django.utils import timezone

from rest_framework import serializers

from .models import Project, Task, Comment, Attachment
from user.models import CustomUser
from user.serializers import ProfileSerializer
from tags.serializers import CustomTagSerializer


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


class ProjectCreateSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(write_only=True, required=False)

    class Meta:
        model = Project
        fields = [
            "assignees",
            "tags",
            "title",
            "description",
            "deadline",
            "visibility",
            "status",
            "archive",
            "owner",
        ]


class ProjectSerializer(serializers.ModelSerializer):
    owner = OwnerSerializer(read_only=True)
    assignees = AssigneeSerializer(many=True, required=False)
    tags = CustomTagSerializer(many=True, read_only=True)  
    created_by = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )
    updated_by = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )

    class Meta:
        model = Project
        fields = "__all__"

    def validate_deadline(self, value):
        today = timezone.now()

        if value <= today:
            raise serializers.ValidationError(
                "The deadline must be set to a future date."
            )

        return value

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


class TaskSerializer(serializers.ModelSerializer):
    owner = OwnerSerializer(read_only=True, source="owner")
    assignees = AssigneeSerializer(many=True, required=False)
    owner = serializers.StringRelatedField(default=serializers.CurrentUserDefault())
    created_by = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )
    updated_by = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )

    class Meta:
        model = Task
        fields = "__all__"

    def create(self, validated_data):
        assignees_data = validated_data.pop("assignees", [])
        task = Task.objects.create(**validated_data)
        self.create_assignees(task, assignees_data)
        return task

    def create_assignees(self, task, assignees_data):
        assignees = []
        for assignee_data in assignees_data:
            assignee_id = assignee_data.get("id")

            if assignee_id is not None:
                assignees.append(CustomUser.objects.get(pk=assignee_id))
            else:
                assignee_serializer = AssigneeSerializer(data=assignee_data)
                assignee_serializer.is_valid(raise_exception=True)
                assignees.append(assignee_serializer.save())

        task.assignees.set(assignees)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["owner"] = OwnerSerializer(instance.owner).data
        return representation


class CommentSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )
    updated_by = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )

    class Meta:
        model = Comment
        fields = "__all__"


class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ["file"]


class DictionaryContentSerializer(serializers.Serializer):
    dictionary_name = serializers.CharField(max_length=255)
    content = serializers.DictField()
