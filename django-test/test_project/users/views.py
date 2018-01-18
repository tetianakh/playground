from django.shortcuts import render

from users.models import User


def users(request):
    users = User.objects.all()
    context = {'users': users}
    return render(request, 'users/users.html', context=context)
