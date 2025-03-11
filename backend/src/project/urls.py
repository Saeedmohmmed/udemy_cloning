from django.contrib import admin
from django.urls import path , include
from project import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/instructor/',include('instructor.urls',namespace='instructor')),
    path('api/',include('home.urls',namespace='home')),
    path('api/users/',include('accounts.urls', namespace='accounts')),
    path('api/',include('djoser.urls')),

    path('api/courses/',include('courses.urls',namespace='courses')),

    
    path('admin/', admin.site.urls),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_URL)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
