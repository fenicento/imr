from django.http import HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import render

def index(request):
    
    return render(request, 'home.html')


def about(request):
    
    return render(request, 'about.html')

def team(request):
    
    return render(request, 'team.html')

def docs(request):
    
    return render(request, 'docs.html')

def example(request):
    
    return render(request, 'samplev2.html')

def form(request):
    
    return render(request, 'form.html')
# Create your views here.
