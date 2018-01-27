from django.conf.urls import url

from core import views


urlpatterns = [
    url(r'^$', views.PostListView.as_view(), name='post_list'),
    url(r'^about/$', views.AboutView.as_view(), name='about'),
    url(r'^post/(?P<pk>\d+)/$', views.PostDetailView.as_view(),
        name='post_detail'),
    url(r'^post/new/$', views.CreatePostView.as_view(), name='post_new'),
    url(r'^post/(?P<pk>\d+)/edit/$', views.UpdatePostView.as_view(),
        name='post_edit'),
    url(r'^post/(?P<pk>\d+)/remove/$', views.PostDeleteView.as_view(),
        name='post_remove'),
    url(r'^post/(?P<pk>\d+)/publish/$', views.publish_post,
        name='publish_post'),
    url(r'^drafts$', views.DraftListView.as_view(), name='post_draft_list'),
    url(r'^post/(?P<pk>\d+)/comment/$', views.add_comment_to_post,
        name='add_comment_to_post'),
    url(r'^comment/(?P<pk>\d+)/approve/$', views.approve_comment,
        name='approve_comment'),
    url(r'^comment/(?P<pk>\d+)/remove/$', views.remove_comment,
        name='remove_comment'),
]
