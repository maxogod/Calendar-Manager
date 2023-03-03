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


class Routine(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    name = models.CharField(max_length=200)

    sleep_schedule = models.CharField(max_length=200, null=False, blank=False)
    unavailability = models.JSONField(null=True, blank=False)
    # unavailability is a list w/ (timestart, timeend) [[x, y], [i. k]]
    sleep_time = models.IntegerField(null=False, blank=False)
    bed_time = models.TimeField(null=False, blank=False)
    task_count = models.IntegerField(null=True, blank=False)

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name


class Task(models.Model):
    routine = models.ForeignKey(Routine, on_delete=models.CASCADE)

    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)

    days_a_week = models.IntegerField(null=True, blank=False)
    importance = models.IntegerField(null=False, blank=False)

    days = models.JSONField(null=True, blank=False)
    starttime = models.TimeField(null=True)
    endtime = models.TimeField(null=True)

    def __str__(self) -> str:
        return self.title
