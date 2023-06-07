from rest_framework import serializers


from .models import Application, ApplicationPhase

class ApplicationPhaseInlineSerializer(serializers.ModelSerializer):

    class Meta:
        model = ApplicationPhase
        fields = [
            'name',
            'date',
            'contacts',
            'notes',
            'offered_salary'
        ]
        

class ApplicationSerializer(serializers.ModelSerializer):
    phases = ApplicationPhaseInlineSerializer(read_only=True, many=True)

    class Meta:
        model = Application
        fields = [
            'id',
            'company_name',
            'position',
            'cv',
            'cover_letter',
            'phases'
        ]