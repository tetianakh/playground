from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    return render(request, 'my_app/index.html', context={})


def help(request):
    return render(request, 'my_app/help.html', context={'foo': 'bar'})
