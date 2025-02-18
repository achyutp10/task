from rest_framework import viewsets
from .models import Student
from .serializers import StudentSerializer
from django.shortcuts import render

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

def student_page(request):
    return render(request, 'index.html')
