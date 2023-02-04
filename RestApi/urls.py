from django.urls import path
from . import views

urlpatterns = [
    path('session/', views.SessionView.as_view(), name='session'),
    path('register/', views.RegisterView.as_view(), name='register'),
]
