from rest_framework import serializers
from .models import Job
from .models import CandidatesApplied

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'



class CandidateAppliedSerializer(serializers.ModelSerializer):

    job = JobSerializer()

    class Meta:
        model = CandidatesApplied
        fields = ('user', 'resume', 'appliedOn', 'job')
