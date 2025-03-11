from rest_framework import serializers
from .models import BannerImage

class BannerImageSerial(serializers.ModelSerializer):
    class Meta:
        model = BannerImage
        fields = ['id', 'image', 'title', 'description']
    
