from django.contrib import admin
from .models import User, Routine, Task, GoogleUser
# Register your models here.

admin.site.register(User)
admin.site.register(Routine)
admin.site.register(Task)
admin.site.register(GoogleUser)
