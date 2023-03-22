from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class CustomUser(AbstractUser):

    STATUS = (
        ('regular', 'regular'),
        ('subscriber', 'subscriber'),
        ('moderator', 'moderator')
    )


emil = models.EmailField(unique=True)
status = models.CharField(max_length=100, choices = 'STATUS' , default='regular')
decraption = models.TextField(
    'Decraption', max_length=600, default='', blank=True)


def __str__(self):
    return self.username
