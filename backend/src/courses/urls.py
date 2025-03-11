from django.urls import path
from .views import (
    index,
    CourseDetails,
    Coursename,
    CourseSections,
    purchase_course,
    UserCoursesList,
    GetCoursesFromDep,
    create_course,
    SectionContent,
    EditCourse,
    DeleteCourse
)
app_name = 'home'

urlpatterns = [
    path('', index, name="index"),
    path('create/', create_course, name="create_course"),
    path('user', UserCoursesList, name="user_courses"),
    path('<str:id>/', CourseDetails, name="CourseDetails"),
    path('<str:id>/learn', CourseSections, name="CourseSections"),
    path('<str:id>/edit', EditCourse, name="EditCourse"),
    path('<str:course_id>/delete', DeleteCourse, name="DeleteCourse"),
    path('<str:id>/learn/contents/<str:content_id>/', SectionContent, name="SectionContent"),
    path('<str:id>/name', Coursename, name="CourseName"),
    path('<str:id>/buy/stripe', purchase_course, name="CourseBuy"),
    path("cat/<str:id>", GetCoursesFromDep, name="GetCoursesFromDep"),
]
