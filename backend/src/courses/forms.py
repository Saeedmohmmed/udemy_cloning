from django import forms
from .models import Course
from accounts.models import User



class course_form(forms.ModelForm):
    class Meta:
        model = Course
        fields = [
            'name',
            'description',
            'category',
            'subcategory',
            'industry',
            'image',
            'price',
            # 'instructor'
        ]
        
     
    
    def clean_name(self, *args, **kwargs):
        name = self.cleaned_data.get('name')
        return name.strip()
    
    def clean_description(self, *args, **kwargs):
        description = self.cleaned_data.get('description')
        return description.strip()
    