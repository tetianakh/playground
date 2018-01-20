"""My app urls."""

from django.conf.urls import url

from my_app.views import register

app_name = 'my_app'

urlpatterns = [
    url(r'^$', register, name='register'),
]
