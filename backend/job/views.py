from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from django.db.models import Avg, Min, Max, Count
from django.utils import timezone

from rest_framework.pagination import PageNumberPagination

from rest_framework.permissions import IsAuthenticated

from .models import Job, CandidatesApplied
from .serializers import JobSerializer, CandidateAppliedSerializer


from django.shortcuts import get_object_or_404
from .filters import JobsFilter

# Create your views here.

@api_view(['GET'])
def getAllJobs(request):

    filterset = JobsFilter(request.GET, queryset=Job.objects.all().order_by('id'))

    count = filterset.qs.count()

    #pagination
    resPerPage = 3

    paginator = PageNumberPagination()
    paginator.page_size = resPerPage

    queryset = paginator.paginate_queryset(filterset.qs, request)

    serializer = JobSerializer(queryset, many=True)
    return Response({
        "count": count,
        "resPerPage": resPerPage,
        "jobs": serializer.data
    })


@api_view(['GET'])
def getJob(request, pk):
    job = get_object_or_404(Job,id=pk)

    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def newJob(request):
    request.data['user'] = request.user
    data = request.data

    job = Job.objects.create(**data)

    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateJob(request, pk):
    job = get_object_or_404(Job,id=pk)

    if job.user != request.user:
        return Response({ 
            'message': 'You are not authorized to update this job' }, 
            status=status.HTTP_403_FORBIDDEN)

    job.title = request.data['title']
    job.description = request.data['description']
    job.email = request.data['email']
    job.address = request.data['address']
    job.jobType = request.data['jobType']
    job.education = request.data['education']
    job.industry = request.data['industry']
    job.experience = request.data['experience']
    job.salary = request.data['salary']
    job.positions = request.data['positions']
    job.company = request.data['company']

    job.save()

    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteJob(request, pk):
    job = get_object_or_404(Job, id=pk)

    if job.user != request.user:
        return Response({ 
            'message': 'You are not authorized to delete this job' }, 
            status=status.HTTP_403_FORBIDDEN)

    job.delete()

    return Response({ 'message': 'Job is Deleted.' }, status=status.HTTP_200_OK)


class StatsSerializer(serializers.Serializer):
    total_jobs = serializers.IntegerField()
    avg_positions = serializers.FloatField()
    avg_salary = serializers.FloatField()
    min_salary = serializers.FloatField()
    max_salary = serializers.FloatField()

@api_view(['GET'])
def getTopicStats(request, topic):
    args = {'title__icontains': topic}
    jobs = Job.objects.filter(**args)

    if len(jobs) == 0:
        return Response({'message': 'No stats found for {topic}'.format(topic=topic)})

    stats = jobs.aggregate(
        total_jobs=Count('title'),
        avg_positions=Avg('positions'),
        avg_salary=Avg('salary'),
        min_salary=Min('salary'),
        max_salary=Max('salary')
    )

    serializer = StatsSerializer(stats)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def applyJob(request, pk):

    user = request.user
    job = get_object_or_404(Job, id=pk)

    if user.userprofile.resume == '':
        return Response(
            { 'error': 'Please upload your resume before applying for Job.' }, 
            status=status.HTTP_400_BAD_REQUEST)
    
    if job.lastDate < timezone.now():
        return Response(
            { 'error': 'This Job has expired.' }, 
            status=status.HTTP_400_BAD_REQUEST)
    
    alreadyApplied = job.candidatesapplied_set.filter(user=user).exists()

    if alreadyApplied:
        return Response(
            { 'error': 'You have already applied to this Job.' }, 
            status=status.HTTP_400_BAD_REQUEST)
    

    jobApplied = CandidatesApplied.objects.create(
        job = job,
        user = user,
        resume = user.userprofile.resume
    )

    return Response(
        {'applied': True,
        'job_id': jobApplied.id},
        status=status.HTTP_200_OK
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserAppliedJobs(request):

    args = { 'user_id': request.user.id}

    jobs = CandidatesApplied.objects.filter(**args)

    serializer = CandidateAppliedSerializer(jobs, many=True)

    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def hasAppliedCheck(request, pk):

    user = request.user
    job = get_object_or_404(Job, id=pk)

    applied = job.candidatesapplied_set.filter(user=user).exists()

    return Response(applied)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCurrentUserJobs(request):

    args = { 'user_id': request.user.id}

    jobs = Job.objects.filter(**args)
    serializer = JobSerializer(jobs, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCandidatesApplied(request, pk):

    user = request.user
    job = get_object_or_404(Job, id=pk)

    if job.user != user:
        return Response( 
            { 'error': 'You are not authorized to view this page.' },
            status=status.HTTP_403_FORBIDDEN
            )
    
    candidates = job.candidatesapplied_set.all()

    serializer = CandidateAppliedSerializer(candidates, many=True)

    return Response(serializer.data)
