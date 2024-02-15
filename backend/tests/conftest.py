import pytest

from django.contrib.auth import get_user_model
from django.db import connection

from rest_framework.test import APIClient


CustomUser = get_user_model()


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def authenticated_api_client(api_client, user_data):
    user = CustomUser.objects.create_user(**user_data)
    api_client.force_authenticate(user=user)
    yield api_client
    api_client.force_authenticate(user=None)


@pytest.fixture
def user_data():
    return {
        "username": "test@example.com",
        "first_name": "Test",
        "last_name": "User",
        "email": "test@example.com",
        "password": "password123",
        "theme": "dark_blue",
        "role": "guest",
    }


@pytest.fixture
def cleanup_database():
    yield
    with connection.cursor() as cursor:
        cursor.execute("SET CONSTRAINTS ALL DEFERRED;")
        cursor.execute(
            "TRUNCATE TABLE {};".format(
                ", ".join(
                    '"{}"'.format(table)
                    for table in connection.introspection.table_names()
                )
            )
        )
