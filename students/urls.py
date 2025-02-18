from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, student_page

router = DefaultRouter()
router.register(r'students', StudentViewSet)

urlpatterns = [
    path('', student_page, name="home"),
    path('api/', include(router.urls)),
]
