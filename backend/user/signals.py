from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import EmailMessage
from django.urls import reverse

from django_rest_passwordreset.signals import reset_password_token_created

from .models import CustomUser, Profile


@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=CustomUser)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()


@receiver(reset_password_token_created)
def password_reset_token_created(
    sender, instance, reset_password_token, *args, **kwargs
):
    context = {
        "current_user": reset_password_token.user,
        "first_name": reset_password_token.user.first_name,
        "email": reset_password_token.user.email,
        # pylint: disable=consider-using-f-string
        "reset_password_url": "{}?token={}".format(
            instance.request.build_absolute_uri(reverse("user:password_reset_confirm")),
            reset_password_token.key,
        ),
    }

    email_msg = (
        f"Hello {context['first_name']}, "
        f"We've received a request to reset your password. "
        f"Please click on the link below to reset your password: "
        f"{context['reset_password_url']}"
    )

    msg = EmailMessage(
        f"BugBard: Password reset for {context['email']}",
        email_msg,
        "admin@BugBard.com",
        [reset_password_token.user.email],
    )

    msg.send()
