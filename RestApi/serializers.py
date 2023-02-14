from rest_framework.serializers import ModelSerializer, CharField
from RestApi.models import User, GoogleUser


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


class GoogleOauthSerializer(ModelSerializer):
    class Meta:
        model = GoogleUser
        fields = [
            'uid',
            'extra_info',
        ]
        extra_kwargs = {
            'uid': {'write_only': True, 'required': True},
            'extra_info': {'write_only': True, 'required': True},
        }

    def save(self):
        email = self.validated_data['extra_info']['email']
        try:
            existing_user = User.objects.get(email=email)
            existing_user.avatar = self.validated_data['extra_info']['picture']
            existing_user.username = self.validated_data['extra_info']['name']
            return existing_user
        except:
            pass
        user = User(
            username=self.validated_data['extra_info']['name'],
            email=email,
            avatar=self.validated_data['extra_info']['picture'],
        )
        google_user = GoogleUser(
            user=user,
            uid=self.validated_data['uid'],
            extra_info=self.validated_data['extra_info'],
        )
        user.save()
        google_user.save()
        return user
