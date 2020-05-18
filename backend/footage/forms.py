from django import forms
from .models import FootageHandler

class FootageHandlerForm(forms.ModelForm):
    class Meta:
        model = FootageHandler
        fields = ('FileField', 'FileDescriptor', )