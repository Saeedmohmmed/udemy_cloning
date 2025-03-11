from django.urls import path
from .views import(
    index,
    course_info,
    Course_Sections,
    delete_content,
    add_content,
    edit_content,
    Course_base,
    Course_List,
    Create_Section,
    Delete_Section
)

app_name = 'instructor'

urlpatterns = [
    path("", index, name='index'),
    path("courses/", Course_List, name='Course_List'),
    path("courses/<str:course_id>/", Course_base, name='Course'),
    path("courses/<str:course_id>/manage/", course_info, name='course_info'),
    path("courses/<str:course_id>/manage/sections/", Course_Sections, name='course_sections'),
    path("courses/<str:course_id>/manage/sections/create/", Create_Section, name='create_section'),
    path("contents/<str:content_id>/delete/", delete_content, name='delete_content'),
    path("courses/<str:course_id>/manage/sections/<str:section_id>/", add_content, name='add_content'),
    path("contents/<str:content_id>/edit/", edit_content, name='edit_content'),
    path("sections/<str:section_id>/delete/", Delete_Section, name='edit_content'),

]

