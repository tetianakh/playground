from django.shortcuts import render
from django.urls import reverse
from django.http import HttpResponseRedirect

from users.models import User
from users.forms import UserForm


def users(request):

    form = UserForm()

    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            form.save(commit=True)
            return HttpResponseRedirect(reverse("users"))

    users = User.objects.all()
    title = "This page contains an awesome list of users."
    context = {'users': users, 'form': form, 'page_title': title}
    return render(request, 'users/users.html', context=context)
