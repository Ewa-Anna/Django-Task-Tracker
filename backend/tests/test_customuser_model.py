import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

CustomUser = get_user_model()


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def user_data():
    return {
        "username": "testuser",
        "first_name": "Test",
        "last_name": "User",
        "email": "test@example.com",
        "password": "password123",
        "theme": "dark_blue",
        "role": "guest",
    }


@pytest.mark.django_db
def test_create_user(api_client, user_data):
    response = api_client.post("/task-tracker/v1/user/users/", user_data)
    assert response.status_code == status.HTTP_201_CREATED
    assert CustomUser.objects.count() == 1


@pytest.mark.django_db
def test_get_user(api_client, user_data):
    user = CustomUser.objects.create_user(**user_data)
    response = api_client.get(f"/task-tracker/v1/user/users/{user.id}/")
    assert response.status_code == status.HTTP_200_OK
    assert response.data["username"] == user.username


@pytest.mark.django_db
def test_update_user(api_client, user_data):
    user = CustomUser.objects.create_user(**user_data)
    new_data = {"first_name": "Updated First Name"}
    response = api_client.patch(f"/task-tracker/v1/user/users/{user.id}/", new_data)
    assert response.status_code == status.HTTP_200_OK
    user.refresh_from_db()
    assert user.first_name == new_data["first_name"]


@pytest.mark.django_db
def test_delete_user(api_client, user_data):
    user = CustomUser.objects.create_user(**user_data)
    response = api_client.delete(f"/task-tracker/v1/user/users/{user.id}/")
    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert CustomUser.objects.count() == 0
