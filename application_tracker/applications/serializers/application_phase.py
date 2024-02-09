from rest_framework import serializers

from ..models import ApplicationPhase


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
