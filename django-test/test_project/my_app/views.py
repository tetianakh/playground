from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from my_app.forms import UserProfileInfoForm, UserForm
from my_app.models import UserProfileInfo


def index(request):
    return render(request, 'my_app/index.html', context={})


def register(request):
    if request.method == 'POST':
        user_form = UserForm(data=request.POST)
        profile_form = UserProfileInfoForm(data=request.POST)
        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()
            user.set_password(user.password)
            user.save()
            profile = profile_form.save(commit=False)
            if 'profile_pic' in request.FILES:
                # If yes, then grab it from the POST form reply
                profile.profile_pic = request.FILES['profile_pic']

            profile.user = user
            profile.save()
            return HttpResponseRedirect(reverse("index"))
        else:
            print(user_form.errors, profile_form.errors)

    else:
        profile_form = UserProfileInfoForm()
        user_form = UserForm()
    context = {
        'form': user_form,
        'profile_form': profile_form,
    }
    return render(request, 'my_app/register.html', context=context)
