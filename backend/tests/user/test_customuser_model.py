import pytest
import json

from django.contrib.auth import get_user_model

from rest_framework import status


CustomUser = get_user_model()


@pytest.mark.django_db
def test_get_user(authenticated_api_client, user_data):
    user, _ = CustomUser.objects.get_or_create(
        email=user_data["email"], defaults=user_data
    )
    response = authenticated_api_client.get(f"/task-tracker/v1/user/users/{user.id}/")
    print(response.data)
    assert response.status_code == status.HTTP_200_OK
    assert CustomUser.objects.count() == 1
    assert response.data["email"] == user.email
    assert response.data["first_name"] == "Test"
    assert "profile" in response.data


@pytest.mark.django_db
@pytest.mark.xfail
def test_create_user(admin_authenticated_api_client):
    user2 = {
        "username": "test2@example.com",
        "first_name": "Test2",
        "last_name": "User2",
        "email": "test2@example.com",
        "password": "password123",
        "theme": "dark_blue",
        "role": "guest",
    }
    json_data = json.dumps(user2)
    response = admin_authenticated_api_client.post(
        f"/task-tracker/v1/user/users/", json_data, content_type="application/json"
    )
    assert response.status_code == status.HTTP_201_CREATED
    assert CustomUser.objects.count() == 1


@pytest.mark.django_db
def test_update_user(authenticated_api_client, user_data):
    user, _ = CustomUser.objects.get_or_create(
        email=user_data["email"], defaults=user_data
    )
    new_data = {"first_name": "Updated First Name"}
    json_data = json.dumps(new_data)
    response = authenticated_api_client.patch(
        f"/task-tracker/v1/user/users/{user.id}/",
        json_data,
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_200_OK
    user.refresh_from_db()
    assert user.first_name == new_data["first_name"]
    assert user.first_name == "Updated First Name"


@pytest.mark.django_db
def test_delete_user(authenticated_api_client, user_data):
    user, _ = CustomUser.objects.get_or_create(
        email=user_data["email"], defaults=user_data
    )
    response = authenticated_api_client.delete(
        f"/task-tracker/v1/user/users/{user.id}/"
    )
    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert CustomUser.objects.count() == 0


@pytest.mark.django_db
def test_get_user_no_login(api_client, user_data):
    user, _ = CustomUser.objects.get_or_create(
        email=user_data["email"], defaults=user_data
    )
    response = api_client.get(f"/task-tracker/v1/user/users/{user.id}/")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
