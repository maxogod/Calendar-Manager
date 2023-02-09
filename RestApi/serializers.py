from rest_framework.serializers import ModelSerializer, CharField
from RestApi.models import User


class CreateUserSerializer(ModelSerializer):
    """
    Serializer for the creation of new users based on the given data
    """

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'password',
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }

    def save(self):
        user = User(
            username=self.validated_data['username'],
            email=self.validated_data['email'],
        )
        password = self.validated_data['password']
        user.set_password(password)
        user.save()
        return user


class UserSerializer(ModelSerializer):
    """
    Serializer to get the session's user or log a user in
    """

    email = CharField(max_length=255)

    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'username',
            'password',
            'avatar',
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'required': False}
        }
