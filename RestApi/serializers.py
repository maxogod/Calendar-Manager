from rest_framework.serializers import ModelSerializer, CharField
from RestApi.models import User, GoogleUser, Routine, Task
from .routine_manager import RoutineManager


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


class RoutineSerializer(ModelSerializer):
    """
    routine object that we get from frontend ->
    {
        name: '',
        sleep_schedule: 'NIGHT/DAY',
        unavailability: null/[[x, y], [i, k]],
        sleep_time: number,
        bed_time: number,

        tasks: [
            {
                title: '',
                description: '',
                days_a_week: number,
                starttime: number/null,
                endtime: number/null,
                importance: number,
            },
            {
                title: '',
                description: '',
                days_a_week: number,
                starttime: number/null,
                endtime: number/null,
                importance: number,
            }
        ]
    }

    ----

    RoutineManager algorithm will take care of the oranization of tasks by dates
    and this serializer will create the routine on save
    """
    class Meta:
        model = Routine

        fields = [
            'id',
            'name',
            'sleep_schedule',
            'sleep_time',
            'bed_time',
        ]

    def save(self, user, tasks):
        routine = Routine(
            user=user,
            name=self.validated_data['name'],
            sleep_schedule=self.validated_data['sleep_schedule'],
            sleep_time=self.validated_data['sleep_time'],
            bed_time=self.validated_data['bed_time'],
        )
        routine.save()
        manager = RoutineManager(routine, tasks)
        processed_tasks = manager.process()
        for task in processed_tasks:
            new_task = Task(
                routine=routine,
                title=task['title'],
                description=task['description'],
                days_a_week=task['days_a_week'],
                importance=task['importance'],
                days=task['days'],
                starttime=task['starttime'],
                endtime=task['endtime'],
            )
            new_task.save()
        return routine


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task

        fields = [
            'id',
            'title',
            'description',
            'days',
            'starttime',
            'endtime',
            'importance',
        ]
