from rest_framework import response, status
from .models import Banner, BannerImage
from courses.models import Industry, Course, Category, SubCategory
from .serializers import BannerImageSerial
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from courses.serializers import (
    IndustriesSerial,
    IncludedCategoryBaseSerial,
    IncludedSubCategoryBaseSerial,
    IncludedIndustrySerial,
    CourseListSerial,
    IndustrySerial,
    CategorySerial
)

@api_view(['GET'])
@permission_classes((AllowAny,))
def index(request):
    bannerSerial    = BannerImageSerial(data=BannerImage.objects.all(), many=True)
    
    industrySerial  = IndustriesSerial(data=
        Industry.objects.all(), 
        many=True
    )

    lowCoursesSerial = CourseListSerial(
        data= Course.objects.order_by('price')[:10],
        many= True
    )
    topCoursesSerial = CourseListSerial(
        data= Course.objects.all()[:10],
        many= True
    )
    if not bannerSerial.is_valid():
        pass
    if not industrySerial.is_valid():
        pass
    if lowCoursesSerial.is_valid():
        pass
    if topCoursesSerial.is_valid():
        pass
    return response.Response(data={
        'images': bannerSerial.data,
        'industries': industrySerial.data,
        'lowPricesCourses': lowCoursesSerial.data,
        'topCourses':topCoursesSerial.data
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((AllowAny,))
def GetAllIndustries(request):
    industrySerial  = IndustriesSerial(data=
        Industry.objects.all(), 
        many=True
    )
    if not industrySerial.is_valid():
        pass
    return response.Response(data={
       'industries': industrySerial.data,
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((AllowAny,))
def GetAllCategories(request):
    categorySerial  = CategorySerial(data=
        Category.objects.all(), 
        many=True
    )
    if not categorySerial.is_valid():
        pass
    return response.Response(data={
       'industries': categorySerial.data,
    }, status=status.HTTP_200_OK)



@api_view(['GET'])
@permission_classes((AllowAny,))
def GetAllIndustriesAsSelectList(request):
    industrySerial  = IncludedIndustrySerial(
        data=Industry.objects.values('id', 'name'), 
        many=True
    )

    if not industrySerial.is_valid():
        pass
    return response.Response(data={
       'industries': industrySerial.data,
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((AllowAny,))
def GetCategoriesFromIndustryAsSelectList(request, industry_id):
    categorySerial = IncludedCategoryBaseSerial(data=
        Category.objects.filter(industry_id=industry_id).values('id', 'name'), 
        many=True
    )
    if categorySerial.is_valid():
        pass
    return response.Response(data={
       'categories': categorySerial.data,
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((AllowAny,))
def GetSubCategoriesFromCategoryAsSelectList(request, category_id):
    subCategorySerial  = IncludedSubCategoryBaseSerial(
        data=SubCategory.objects.filter(category_id=category_id).values('id', 'name'), 
        many=True
    )
    if not subCategorySerial.is_valid():
        pass
    return response.Response(data={
       'subcategories': subCategorySerial.data,
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((AllowAny,))
def GetIndustryById(request, id):

    industrySerial  = IndustrySerial(
        data=Industry.objects.select_related().filter(id=id), 
        many=True, 
        allow_null=True
    )
    if not industrySerial.is_valid():
        pass
    return response.Response(data={
       'industry': industrySerial.data[0],
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((AllowAny,))
def GetCategoryById(request, category_id):
    categorySerial  = CategorySerial(data=
        Category.objects.filter(id=category_id), 
        many=True
    )
    if not categorySerial.is_valid():
        pass
    if len(categorySerial.data):
        return response.Response(data={
        'category': categorySerial.data[0],
        }, status=status.HTTP_200_OK)
    return response.Response(data={
        'category': [],
        }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((AllowAny,))
def GetAllSubCategories(request, sub_id):
    
    subcategory_serial = IncludedSubCategoryBaseSerial(data=SubCategory.objects.all(), many=True)
    if subcategory_serial.is_valid():
        pass

    if not len(subcategory_serial.data):
        return response.Response(
            data={'subcategories':[]},
            status=status.HTTP_200_OK
        )
    return response.Response(
        data={
            'subcategories': subcategory_serial.data,
        },
        status=status.HTTP_200_OK
    )

@api_view(['GET'])
@permission_classes((AllowAny,))
def GetSubCategoryById(request, sub_id):
    sub = SubCategory.objects.filter(id=sub_id).first()
    courses = Course.objects.filter(subcategory_id=sub_id)
    courseSerial = CourseListSerial(data=courses, many=True)
    if courseSerial.is_valid():
        pass

    
    return response.Response(
        data={
            'subcategory': {
                'id':sub.id,
                'name':sub.name,
                'courses': courseSerial.data
            },
            
        },
        status=status.HTTP_200_OK
    )