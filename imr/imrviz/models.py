from django.db import models


class Year(models.Model):
	name=models.IntegerField()

	def __unicode__(self):
		return "%s" % (self.name)

class Space(models.Model):
	name = models.CharField(max_length=200)
	population = models.FloatField()
	consumption = models.FloatField()
	richness = models.FloatField()
	sky = models.FloatField()
	subsoil = models.FloatField()
	year = models.ForeignKey(Year, related_name='places')

	def __unicode__(self):
		return "%s" % (self.name)

class Exchange(models.Model):
	source = models.ForeignKey(Space)
	target = models.ForeignKey(Space, related_name='targets')
	amount = models.FloatField()

	def __unicode__(self):
		return "%s" % (self.source)


