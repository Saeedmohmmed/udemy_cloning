from rest_framework import serializers
from .models import Industry, Course, Category, Section, Content, SubCategory, Industry
from accounts.serializers import IncludedUserSerial


class IndustriesSerial(serializers.ModelSerializer):
    class Meta:
        model = Industry
        fields = ['id', 'image', 'name', 'description']

class IncludedIndustrySerial(serializers.ModelSerializer):
    class Meta:
        model= Industry
        fields=['id', 'name']


class IncludedCategorySerial(serializers.ModelSerializer):
    industry = IncludedIndustrySerial(many=False)
    class Meta:
        model= Category
        fields=['id', 'name', 'industry']

class IncludedSubCategoryBaseSerial(serializers.ModelSerializer):
    class Meta:
        model= SubCategory
        fields=['id', 'name']

class IncludedCategoryBaseSerial(serializers.ModelSerializer):
    class Meta:
        model= Category
        fields=['id', 'name', ]

class IncludedCategoryWithImageSerial(serializers.ModelSerializer):
    class Meta:
        model= Category
        fields=['id', 'name', 'description', 'image']


class IncludedSubCategoryBaseSerial(serializers.ModelSerializer):
    class Meta:
        model= SubCategory
        fields=['id', 'name']

class IncludedSubCategorySerial(serializers.ModelSerializer):
    category = IncludedCategorySerial(many=False)
    class Meta:
        model= SubCategory
        fields=['id', 'name', 'category']

class IncludedContentSerial(serializers.ModelSerializer):
    class Meta:
        model= Content
        depth=1
        fields=['id', 'name']
class DetailedIncludedContentSerial(serializers.ModelSerializer):
    class Meta:
        model= Content
        depth=1
        fields=['id', 'name', 'file', 'video']

class IncludedSectionSerial(serializers.ModelSerializer):
    content_set = IncludedContentSerial(many=True)
    class Meta:
        model= Section
        depth=1
        fields=['id', 'name', 'content_set']



class BaseCourseListSerial(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = [
            'id',
            'name',
            'description',
            'image',
        ]




class CourseListSerial(serializers.ModelSerializer):
    instructor      = IncludedUserSerial()
    subcategory     = IncludedSubCategorySerial()

    class Meta:
        model = Course
        fields = [
            'id',
            'name',
            'description',
            'image',
            'created_at',
            'price',
            'instructor',
            'subcategory',
            'no_of_ratings',
            'avg_rating', 
        ]

class CourseDetailsSerial(serializers.ModelSerializer):
    instructor      = IncludedUserSerial()
    subcategory     = IncludedSubCategorySerial()
    section_set     = IncludedSectionSerial(many=True)
    class Meta:
        model = Course
        depth=1
        fields = [
            'id',
            'name',
            'description',
            'subcategory',
            'image',
            'created_at',
            'price',
            'instructor',
            'section_set',
            'no_of_ratings',
            'avg_rating',            
        ]

class SectionsSerial(serializers.ModelSerializer):
    content_set = DetailedIncludedContentSerial(many=True)
    class Meta:
        model = Section
        fields = [
            'id',
            'name',
            'content_set'
        ]
class IndustrySerial(serializers.ModelSerializer):
    # courses_set = BaseCourseListSerial(many=True)
    class Meta:
        model = Industry
        fields = '__all__' 
    def to_representation(self, instance):
        courses_data = CourseListSerial(data=Course.objects.filter(industry=instance.id), many=True)
        if courses_data.is_valid():
            pass
        CategorySerial = IncludedCategoryWithImageSerial(data=Category.objects.filter(industry=instance.id)[:10], many=True)
        SubCategorySerial = IncludedSubCategoryBaseSerial(data=SubCategory.objects.filter(category__industry__id=instance.id), many=True)


        if CategorySerial.is_valid():
            pass
        if SubCategorySerial.is_valid():
            pass
        representation = dict()
        representation["id"] = instance.id
        representation["image"] = "/media/"+str(instance.image)
        representation["name"] = instance.name
        representation["description"] = instance.description
        representation["courses"] = courses_data.data
        representation["Categories"] = CategorySerial.data
        representation["SubCategories"] = SubCategorySerial.data

        return representation

class CategorySerial(serializers.ModelSerializer):
    # courses_set = BaseCourseListSerial(many=True)
    class Meta:
        model = Category
        fields = '__all__' 
    def to_representation(self, instance):
        courses_data = CourseListSerial(data=Course.objects.filter(category=instance.id), many=True)
        if courses_data.is_valid():
            pass
        SubCategorySerial = IncludedSubCategoryBaseSerial(data=SubCategory.objects.filter(category__id=instance.id), many=True)


        
        if SubCategorySerial.is_valid():
            pass
        representation = dict()
        representation["id"] = instance.id
        representation["image"] = "/media/"+str(instance.image)
        representation["name"] = instance.name
        representation["description"] = instance.description
        representation["courses"] = courses_data.data
        representation["SubCategories"] = SubCategorySerial.data

        return representation
        