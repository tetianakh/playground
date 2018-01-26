from django.conf.urls import url

from . import views

app_name = 'cbvs'

urlpatterns = [
        url(r'^$', views.SchoolListView.as_view(), name='list'),
        url(r'^(?P<pk>\d+)/$', views.SchoolDetailView.as_view(), name='details'),
        url(r'^create', views.SchoolCreateView.as_view(), name='create'),
        url(r'^update/(?P<pk>\d+)/$', views.SchoolUpdateView.as_view(), name='update'),

        url(r'^delete/(?P<pk>\d+)/$', views.SchoolDeleteView.as_view(), name='delete'),

]
