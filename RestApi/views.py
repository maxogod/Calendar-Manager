from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from django.contrib.auth import authenticate, login, logout

from . import serializers
import json
from django.core.serializers.json import DjangoJSONEncoder

from .models import User, Routine


# User Auth
class SessionView(APIView):
    """
    Api to see current session user and Login/Logout
    """

    # Get current session data
    def get(self, request, format=None):
        try:
            user = User.objects.get(id=request.user.id)
        except:
            user = {'id': None, 'username': None, 'email': None, }

        serializer = serializers.UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Update current session (Login/Logout)
    def post(self, request, format=None):

        # Logout
        if 'email' in request.data.keys() and request.data['email'] is None:
            logout(request)
            return Response('logged out', status=status.HTTP_200_OK)

        serializer = serializers.UserSerializer(data=request.data)

        if serializer.is_valid():

            # Auth and Login
            user = authenticate(
                request, email=request.data['email'], password=request.data['password'])

            if user is not None:
                login(request, user)
                return Response({'success': True}, status=status.HTTP_200_OK)
            else:
                return Response({'success': False}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    """
    Api to register a new user
    """

    # Create new User (Sign up)
    def post(self, request, format=None):
        serializer = serializers.CreateUserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()  # Create User
            login(request, user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GoogleOauth(APIView):
    """
    API to register/login a user after it is authenticated by google.
    """

    def post(self, request, format=None):
        serializer = serializers.GoogleOauthSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()  # Create/Get User
            login(request, user)
            return Response({'success': True}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Routine Creation
class RoutineGet(APIView):

    def get(self, request, pk, format=None):
        routine = Routine.objects.get(id=pk)
        serializer = serializers.RoutineSerializer()
        return Response(status=status.HTTP_200_OK)


class RoutineCreate(APIView):

    def post(self, request, format=None):
        serializer = serializers.RoutineSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(request.user, request.data['tasks'])
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
