from django.urls import path
from . import views

urlpatterns = [
    path('session/', views.SessionView.as_view(), name='session'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('google_oauth/', views.GoogleOauth.as_view(), name='google_oauth'),
    path('routine/<str:pk>', views.RoutineGet.as_view(), name='routine'),
    path('routine/create/', views.RoutineCreate.as_view(), name='routine_create'),
]
