from rest_framework import serializers

from .models import Application, ApplicationPhase


class ApplicationPhaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = ApplicationPhase
        fields = [
            'id',
            'name',
            'date',
            'contacts',
            'notes',
        ]


class ApplicationSerializer(serializers.ModelSerializer):
    phases = ApplicationPhaseSerializer(read_only=True, many=True)

    class Meta:
        model = Application
        fields = [
            'id',
            'company_name',
            'position',
            'url',
            'job_description',
            'cv',
            'cover_letter',
            'offered_salary',
            'phases',
        ]
