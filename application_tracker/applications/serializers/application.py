from rest_framework import serializers

from ..models import Application
from .application_phase import ApplicationPhaseSerializer


class ApplicationSerializer(serializers.ModelSerializer):
    phases = ApplicationPhaseSerializer(read_only=True, many=True)
    save_cv_as_default = serializers.BooleanField(write_only=True, required=False)

    class Meta:
        model = Application
        fields = [
            'id',
            'company_name',
            'position',
            'url',
            'job_description',
            'cv',
            'save_cv_as_default',
            'cover_letter',
            'offered_salary',
            'phases',
        ]

    def create(self, validated_data):
        self.save_cv_as_default = validated_data.pop('save_cv_as_default')
        return super().create(validated_data)
