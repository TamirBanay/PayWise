from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver


class User(AbstractUser):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    walletID = models.IntegerField(primary_key=True)


@receiver(post_save, sender=User)
def create_user_wallet(sender, instance, created, **kwargs):
    if created:
        wallet = Wallet(user=instance)
        # Generate a unique value for the walletID field
        wallet.walletID = instance.id + 1000
        wallet.save()
