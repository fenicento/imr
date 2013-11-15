from imrviz.models import Year, Space, Exchange
from django.contrib import admin
from django.core import urlresolvers
from django.contrib.sites.models import Site
 
class SpaceInline(admin.TabularInline):
    model = Space
    fields = ('name', 'population', 'richness','subsoil','sky','consumption','exchange_link')
    readonly_fields = ('exchange_link', )

    def exchange_link(self, obj):
        
        # Replace "myapp" with the name of the app containing
        # your Certificate model:
        url = urlresolvers.reverse("admin:imrviz_exchange_changelist")
        lookup = u"source__exact"
        text = u"Exchanges"
        return u"<a href='%s?%s=%d'>%s</a>" % (url, lookup, obj.pk, text)

    exchange_link.allow_tags = True

class ExchangeInline(admin.TabularInline):
    model = Exchange
    extra = 1
    fk_name = 'source'



class YearAdmin(admin.ModelAdmin):
    list_display = ('name',)
    inlines = [
        SpaceInline,
    ]

admin.site.register(Year, YearAdmin)

class SpaceAdmin(admin.ModelAdmin):
    list_display = ('name','related_year',)

    inlines = [
        ExchangeInline,
    ]

    def related_year(self, obj):
    	return obj.year.name

admin.site.register(Space, SpaceAdmin)

class ExchangeAdmin(admin.ModelAdmin):
    list_display = ('source','target','amount')
    fk_name = 'source'

admin.site.register(Exchange, ExchangeAdmin)

admin.site.unregister(Site)

