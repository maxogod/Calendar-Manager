from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    email = models.EmailField(unique=True, null=True)
    avatar = models.TextField(null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class GoogleUser(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    uid = models.CharField(max_length=200)
    extra_info = models.JSONField(null=False, blank=False)

    def __str__(self) -> str:
        return '(Google) ' + self.user.username


class Calendar(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    name = models.CharField(max_length=200)

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name


class Event(models.Model):
    calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE)

    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField()

    def __str__(self) -> str:
        return self.title
