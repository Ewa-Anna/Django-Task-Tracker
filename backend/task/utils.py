from rest_framework.response import Response
from rest_framework import status


def handle_permission_denied():
    response_data = {
        "detail": "You do not have permission to perform this action. "
        "If this is a mistake, please contact your administrator "
        "to acquire permission."
    }
    return Response(response_data, status=status.HTTP_403_FORBIDDEN)
