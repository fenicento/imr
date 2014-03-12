from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
import imrviz


admin.autodiscover()


urlpatterns = patterns('',
	url(r'^viz/', include('imrviz.urls')),
	url(r'^$', imrviz.views.index, name='index'),
	url(r'^about/',imrviz.views.about, name='about'),
	url(r'^team/',imrviz.views.team, name='team'),
	url(r'^docs/',imrviz.views.docs, name='docs'),
	url(r'^admin/', include(admin.site.urls)),
    
)+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += staticfiles_urlpatterns()
