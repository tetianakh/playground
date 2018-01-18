"""Users app urls."""

from django.conf.urls import url

from users.views import users

urlpatterns = [
    url(r'^$', users, name='users'),
]
