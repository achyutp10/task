from django.db import models

# Create your models here.

class Student(models.Model):
    name = models.CharField(max_length=255)
    age = models.IntegerField()
    address = models.TextField()
    grade = models.CharField(max_length=50)
    major = models.CharField(max_length=100)

    def __str__(self):
        return self.name
