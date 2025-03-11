from django.db import models
from django.conf import settings
import uuid
from django.core.validators import MaxValueValidator, MinValueValidator

def imagesave(instance,filename):
    extension = filename.split(".")[-1]
    return "courses/%s.%s"%(instance.id, extension)


def industrysave(instance,filename):
    extension = filename.split(".")[-1]
    return "courses/%s.%s"%(instance.id, extension)


def categorysave(instance,filename):
    extension = filename.split(".")[-1]
    return "courses/%s.%s"%(instance.id, extension)


def coursesave(instance,filename):
    extension = filename.split(".")[-1]
    return "courses/%s.%s"%(instance.id, extension)


class Industry(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                = models.CharField(max_length=255)
    description         = models.CharField(max_length=255, null=True, blank=True)
    image               = models.ImageField(default="coursatty-favicon-black.png",upload_to=industrysave, null=True)
    is_deleted          = models.BooleanField(default=False)
    created_at          = models.DateTimeField(auto_now=True, auto_now_add=False)
    created_by          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    def __str__(self) -> str:
        return self.name

class Category(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                = models.CharField(max_length=255)
    description         = models.CharField(max_length=255, null=True, blank=True)
    image               = models.ImageField(default="coursatty-favicon-black.png",upload_to=categorysave, null=True)
    is_deleted          = models.BooleanField(default=False)
    created_at          = models.DateTimeField(auto_now=True, auto_now_add=False)
    created_by          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    industry            = models.ForeignKey(Industry, on_delete=models.CASCADE)
    def __str__(self) -> str:
        return self.name


class SubCategory(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                = models.CharField(max_length=255)
    is_deleted          = models.BooleanField(default=False)
    created_by          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category            = models.ForeignKey(Category, on_delete=models.CASCADE)
    def __str__(self) -> str:
        return self.name

class Course(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                = models.CharField(max_length=255)
    description         = models.TextField()
    instructor          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)
    category            = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    subcategory         = models.ForeignKey(SubCategory, on_delete=models.DO_NOTHING)
    industry            = models.ForeignKey(Industry, on_delete=models.DO_NOTHING, null=True, blank=True)
    image               = models.ImageField(default="coursatty-high-resolution-logo-white.png",upload_to=coursesave, null=True)
    is_deleted          = models.BooleanField(default=False)
    created_at          = models.DateTimeField(auto_now=True, auto_now_add=False)
    price               = models.DecimalField(max_digits=8, decimal_places=2)

    def no_of_ratings(self):
        ratings = user_courses.objects.filter(course=self)
        count = 0
        for x in ratings:
            if x.rating:
                count += 1
        return count
    def avg_rating(self):
        # sum of ratings stars  / len of rating hopw many ratings 
        sum = 0
        ratings = user_courses.objects.filter(course=self) # no of ratings happened to the meal 
        for x in ratings:
            if x.rating:
                sum += x.rating

        if len(ratings) > 0:
            return sum / len(ratings)
        else:
            return 0
    def __str__(self) -> str:
        return self.name


class Section(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                = models.CharField(max_length=255)
    course              = models.ForeignKey(Course, on_delete=models.CASCADE)
    is_deleted          = models.BooleanField(default=False)
    def __str__(self) -> str:
        return self.name

class Content(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    section             = models.ForeignKey(Section, on_delete=models.CASCADE)
    name                = models.CharField(max_length=255)
    is_deleted          = models.BooleanField(default=False)
    video               = models.FileField(upload_to='courses/videos', max_length=100, null=True, blank=True)
    file                = models.FileField(upload_to='courses/files', max_length=100, null=True, blank=True)
    def __str__(self) -> str:
        return self.name

class user_courses(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course              = models.ForeignKey(Course, on_delete=models.CASCADE)
    user                = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    added_at            = models.DateTimeField(auto_now=False, auto_now_add=True)
    rating              = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], null=True, blank=True)
    def __str__(self):
        return self.user.first_name + " - has - " + self.course.name 
    
    class Meta:
        unique_together = (('user', 'course'),)
        index_together = (('user', 'course'),)
