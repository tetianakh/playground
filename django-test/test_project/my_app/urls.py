"""My app urls."""

from django.conf.urls import url

from my_app.views import index

urlpatterns = [
    url(r'^$', index, name='index'),
]
