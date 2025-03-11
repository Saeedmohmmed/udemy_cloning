from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import User
from courses.models import Course
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['id'] = str(user.id)
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['image'] = "/media/" + str(user.image)
        token['courses'] = Course.objects.filter(instructor=user).count()
        # ...

        return token
    

class IncludedUserSerial(serializers.ModelSerializer):
    class Meta:
        model= User
        fields=['id', 'first_name', 'last_name']