from django.db import models
import uuid
from django.conf import settings
from accounts.models import User
def imagesave(instance,filename):
    extension = filename.split(".")[-1]
    return "banners/%s.%s"%(instance.id, extension)

class Banner(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_by          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.created_by.first_name


class BannerImage(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title               = models.CharField(max_length=50, null=True, blank=True)
    description         = models.CharField(max_length=255, null=True, blank=True)
    image               = models.ImageField(default="Banner/default.webp",upload_to=imagesave, null=True)
    banner              = models.ForeignKey(Banner, on_delete=models.CASCADE)
    created_by          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.title or str(self.id)
