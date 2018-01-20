"""My app urls."""

from django.conf.urls import url

from my_app.views import help

urlpatterns = [
    url(r'^$', help, name='help'),
]
