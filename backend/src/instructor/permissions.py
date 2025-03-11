from rest_framework.permissions import BasePermission, SAFE_METHODS
from courses.models import Course, Content, Section


class IsCourseInstructor(BasePermission):
    message = "course management not allowed except for course owner or admin"
    def has_permission(self, request, view):
        try:
            if Course.objects.filter(instructor=request.user, id=view.kwargs['course_id'],).first():
                return True
        except:
            pass
        return False

class IsCourseInstructorOrAdmin(BasePermission):
    message = "course management not allowed except for course owner or admin"
    def has_permission(self, request, view):
        try:
            if request.user.is_superuser:
                return True
            if Course.objects.filter(instructor=request.user, id=view.kwargs['course_id'],).first():
                return True
        except:
            pass
        return False

class IsContentOwnerOrAdmin(BasePermission):
    message = "course management not allowed except for course owner or admin"
    def has_permission(self, request, view):
        try:
            if request.user.is_superuser:
                return True
            content = Content.objects.filter(id=view.kwargs['content_id']).first()
            if content.section.course.instructor == request.user:
                return True
        except:
            pass
        return False 

class IsSectionOwnerOrAdmin(BasePermission):
    message = "deleting section not allowed except for course owner or admin"
    def has_permission(self, request, view):
        try:
            if request.user.is_superuser:
                return True
            section = Section.objects.filter(id=view.kwargs['section_id']).first()
            if section.course.instructor == request.user:
                return True
        except:
            pass
        return False 