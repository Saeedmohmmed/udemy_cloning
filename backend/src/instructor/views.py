from django.shortcuts import render
from courses.models import Course, user_courses, Section, Content
from rest_framework import response, status
from django.db.models.functions import ExtractYear
from django.db import models
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.renderers import JSONRenderer
from .permissions import IsCourseInstructorOrAdmin, IsContentOwnerOrAdmin, IsSectionOwnerOrAdmin
from courses.serializers import CourseListSerial, SectionsSerial
import json


def clean_purchasing_history(purchasing_histroy, price):
    cleaned_purchasing_history = {
        'years':[],
        'numbers': [],
        'total': 0,
        'total_earned': 0
    }
    for item in purchasing_histroy:
        cleaned_purchasing_history['years'].append(item['year'])
        cleaned_purchasing_history['numbers'].append(item['n'])
        cleaned_purchasing_history['total'] += item['n']
    cleaned_purchasing_history['total_earned'] = cleaned_purchasing_history['total'] * price 
    return cleaned_purchasing_history


def clean_purchasing_history_for_list(purchasing_histroy, courses):
    cleaned_purchasing_history = {
        'years':[],
        'numbers': [],
        'total': 0,
        'total_earned': 0
    }
    for item in purchasing_histroy:
        cleaned_purchasing_history['years'].append(item['year'])
        cleaned_purchasing_history['numbers'].append(item['n'])
        cleaned_purchasing_history['total'] += item['n']
    for course in courses:
        cleaned_purchasing_history['total_earned'] += user_courses.objects.filter(course_id=course.id).__len__() * course.price
    return cleaned_purchasing_history


def to_int(val, default):
    if val:
        try:
            return int(val)
        except:
            pass
    return default
        
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def index(request):
    courses = Course.objects.filter(instructor=request.user)
    if not courses:
        return response.Response({'message': 'No courses added yet'},status=status.HTTP_200_OK)
    
    purchasing_histroy = user_courses.objects.filter(course__in=courses).annotate(
            year=ExtractYear('added_at'),
            ).values(
                'year'
            ).annotate(
                n=models.Count('pk')
        ).order_by('year')
    
    
    return response.Response(
        data={
            'purchasing_histroy': clean_purchasing_history_for_list(purchasing_histroy, courses),
        }, 
        status=status.HTTP_200_OK
    )

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def Course_List(request):
    page = to_int(request.GET.get('page'), 0)
    size = to_int(request.GET.get('size'), 10)
    courses_serial = CourseListSerial(
        data=Course.objects.filter(instructor=request.user)[page*size : (page+1) * size], 
        many=True
    )

    if courses_serial.is_valid():
        pass
    return response.Response({
        "page" : page,
        "size": size,
        "total":int(Course.objects.count()/size) or 1,
        "courses": courses_serial.data,
    }, status=status.HTTP_200_OK)


@renderer_classes((JSONRenderer))
@api_view(['GET'])
@permission_classes((IsCourseInstructorOrAdmin,))
def course_info(request, course_id):
    course = Course.objects.filter(id=course_id).first()
    if not course:
        return response.Response({'message': 'this course not found'},status=status.HTTP_404_NOT_FOUND)
    
    purchasing_histroy = user_courses.objects.filter(course_id=course_id).annotate(
            year=ExtractYear('added_at'),
            ).values(
                'year'
            ).annotate(
                n=models.Count('pk')
        ).order_by('year')
    
    course_serial = CourseListSerial(data=[course], many=True)
    if course_serial.is_valid():
        pass

    return response.Response(
        data={
            'purchasing_histroy': clean_purchasing_history(purchasing_histroy, course.price),
            'course': course_serial.data[0]
        }, 
        status=status.HTTP_200_OK
    )


@renderer_classes((JSONRenderer))
@api_view(['GET'])
@permission_classes((IsCourseInstructorOrAdmin,))
def Course_Sections(request, course_id):
    sections = Section.objects.filter(course_id=course_id)
    if not sections:
        return response.Response(
            data={
                'message': 'This Page is not found'
            },
            status=status.HTTP_404_NOT_FOUND
        )
    sections = SectionsSerial(data=sections, many=True)
    if sections.is_valid():
        pass
    return response.Response(
        data={
            'sections': sections.data
        },
        status=status.HTTP_200_OK
    )

@renderer_classes((JSONRenderer))
@api_view(['POST'])
@permission_classes((IsCourseInstructorOrAdmin,))
def Create_Section(request, course_id):
    try:
        body = json.loads(request.body)
        if 'section_name' not in body:
            return response.Response(
                data={'message': "section name can't be empty"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        section = Section.objects.create(course_id=course_id, name=body['section_name'])
        section.save()

        return response.Response(
            data={
                'message': f'section {body['section_name']} added successfully!'
            }, 
            status=status.HTTP_201_CREATED)
    except:
        return response.Response(
            data={'message': 'something went wrong contact the admin'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

@renderer_classes((JSONRenderer))
@api_view(['DELETE'])
@permission_classes((IsSectionOwnerOrAdmin,))
def Delete_Section(request, section_id):
    try:
        section = Section.objects.filter(id=section_id)
        name = section[0].name
        section.delete()

        return response.Response(
            data={
                'message': f'section {name} deleted successfully!'
            }, 
            status=status.HTTP_200_OK)
    except:
        return response.Response(
            data={'message': 'something went wrong contact the admin'}, 
            status=status.HTTP_400_BAD_REQUEST
        )


@renderer_classes((JSONRenderer))
@api_view(['POST'])
@permission_classes((IsCourseInstructorOrAdmin,))
def add_content(request, course_id, section_id):
    body = json.loads(request.body)
    try:
        if 'name' not in body:
            return response.Response(
                data={'message': "content name can't be empty"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        content = Content.objects.create(section_id=section_id, name=body['name'])
        content.save()

        return response.Response(
            data={
                'message': f'content {content.name} added successfully!'
            }, 
            status=status.HTTP_201_CREATED)
        
    except:
        return response.Response(
            data={'message': 'something went wrong contact the admin'}, 
            status=status.HTTP_400_BAD_REQUEST
        )



@api_view(['GET'])
@permission_classes((IsCourseInstructorOrAdmin,))
def Course_base(request, course_id):
    course = Course.objects.get(id=course_id)
    courseSerial = CourseListSerial(data=[course], many=True, allow_null=True)
    
    if courseSerial.is_valid():
        pass
    return response.Response(data={
        "course":courseSerial.data[0],
    }, status=status.HTTP_200_OK)




@renderer_classes((JSONRenderer))
@api_view(['POST'])
@permission_classes((IsContentOwnerOrAdmin,))
def edit_content(request, content_id):
    try:
        content = Content.objects.filter(id=content_id).first()
        if not content:
            return response.Response(
                data={'message': 'this content not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        if request.POST['name']:
            content.name = request.POST['name']
        if 'file' in request.FILES:
            content.file = request.FILES['file']
        if 'video' in request.FILES:
            content.video = request.FILES['video']
        content.save()
        return response.Response(
            data={
                'message': f'content {content.name} updated successfully!'
            }, 
            status=status.HTTP_200_OK
        )
    except:
        return response.Response(
            data={'message': 'something went wrong contact the admin'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
        




@renderer_classes((JSONRenderer))
@api_view(['DELETE'])
@permission_classes((IsContentOwnerOrAdmin,))
def delete_content(request, content_id):
    try:
        Content.objects.filter(id=content_id).delete()
        return response.Response(data={
            'message': 'item deleted successfully!'
        }, status=status.HTTP_204_NO_CONTENT)
    except:
        return response.Response(
            data={'message': 'something went wrong contact the admin'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
        