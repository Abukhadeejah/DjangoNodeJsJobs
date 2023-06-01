from datetime import *
from django.db import models
from django.contrib.auth.models import User

import geocoder
import os

from django.contrib.gis.db import models as gismodels
from django.contrib.gis.geos import Point

from django.core.validators import MinValueValidator, MaxValueValidator


# Create your models here.
class JobType(models.TextChoices):
    Permanent = 'Permanent'
    Contract = 'Contract'
    Internship = 'Internship'
    FreeVisa = 'Free Visa' 


class Education(models.TextChoices):
    Bachelors = 'Bachelors'
    Masters = 'Masters'
    Phd = 'Phd'
    Undergraduate = 'Undergraduate'
    

class Industry(models.TextChoices):
    Business = 'Business'
    IT = 'Information Technology'
    Banking = 'Banking'
    Education = 'Education'
    Telecommunication = 'Telecommunication'
    Others = 'Others'


class Experience(models.TextChoices):
    Fresher = 'Fresher'
    ONE_YEAR = '1 Year'
    TWO_YEAR = '2 Years'
    THREE_YEAR = '3 Years'
    THREE_YEAR_PLUS = '3 Years above'

def return_date_time():
    now = datetime.now()
    return now + timedelta(days=10)


class Job(models.Model):
    title = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(max_length=2000, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    address = models.CharField(max_length=100, null=True, blank=True)
    jobType = models.CharField(
        max_length=10, 
        choices=JobType.choices, 
        default=JobType.Permanent
        )
    education = models.CharField(
        max_length=15, 
        choices=Education.choices, 
        default=Education.Bachelors
        )
    industry = models.CharField(
        max_length=30, 
        choices=Industry.choices, 
        default=Industry.Business
        )
    experience = models.CharField(
        max_length=20, 
        choices=Experience.choices, 
        default=Experience.Fresher
        )
    salary = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(1000000)]) 
    positions = models.IntegerField(default=1)
    company = models.CharField(max_length=100, null=True, blank=True)
    point = gismodels.PointField(default=Point(0.0, 0.0))
    lastDate = models.DateTimeField(default=return_date_time)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)


    def save(self, *args, **kwargs):
        cords = geocoder.mapquest(self.address, key=os.environ.get('GEOCODER_API'))

        print(cords)

        lng = cords.lng
        lat = cords.lat

        self.point = Point(lng, lat)
        super(Job, self).save(*args, **kwargs)



class CandidatesApplied(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    resume = models.CharField(max_length=200)
    appliedOn = models.DateTimeField(auto_now_add=True)
