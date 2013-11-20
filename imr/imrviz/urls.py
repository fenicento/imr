from django.conf.urls import patterns, include, url
from imrviz import views

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
	url(r'^example$', views.example, name='example'),
	
    # Examples:
    # url(r'^$', 'imr.views.home', name='home'),
    # url(r'^imr/', include('imr.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)