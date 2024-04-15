# from django.core.management.base import BaseCommand
# from datetime import timedelta
# from django.utils import timezone

# from adminx.models import RecentActivity


# class Command(BaseCommand):
#     help = "Cleanup old records from RecentActivity table"

#     def handle(self, *args, **options):
#         max_records = 100
#         threshold_date = timezone.now() - timedelta(days=30)
#         records_to_delete = RecentActivity.objects.filter(
#             timestamp__lt=threshold_date
#         ).order_by("timestamp")[:max_records]
#         records_to_delete.delete()
#         self.stdout.write(self.style.SUCCESS("Cleanup completed successfully."))
