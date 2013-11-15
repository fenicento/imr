# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Year'
        db.create_table(u'imrviz_year', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.IntegerField')()),
        ))
        db.send_create_signal(u'imrviz', ['Year'])

        # Adding model 'Space'
        db.create_table(u'imrviz_space', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('population', self.gf('django.db.models.fields.FloatField')()),
            ('consumption', self.gf('django.db.models.fields.FloatField')()),
            ('richness', self.gf('django.db.models.fields.FloatField')()),
            ('sky', self.gf('django.db.models.fields.FloatField')()),
            ('subsoil', self.gf('django.db.models.fields.FloatField')()),
            ('year', self.gf('django.db.models.fields.related.ForeignKey')(related_name='places', to=orm['imrviz.Year'])),
        ))
        db.send_create_signal(u'imrviz', ['Space'])

        # Adding model 'Exchange'
        db.create_table(u'imrviz_exchange', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('source', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['imrviz.Space'])),
            ('target', self.gf('django.db.models.fields.related.ForeignKey')(related_name='targets', to=orm['imrviz.Space'])),
        ))
        db.send_create_signal(u'imrviz', ['Exchange'])


    def backwards(self, orm):
        # Deleting model 'Year'
        db.delete_table(u'imrviz_year')

        # Deleting model 'Space'
        db.delete_table(u'imrviz_space')

        # Deleting model 'Exchange'
        db.delete_table(u'imrviz_exchange')


    models = {
        u'imrviz.exchange': {
            'Meta': {'object_name': 'Exchange'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'source': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['imrviz.Space']"}),
            'target': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'targets'", 'to': u"orm['imrviz.Space']"})
        },
        u'imrviz.space': {
            'Meta': {'object_name': 'Space'},
            'consumption': ('django.db.models.fields.FloatField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'population': ('django.db.models.fields.FloatField', [], {}),
            'richness': ('django.db.models.fields.FloatField', [], {}),
            'sky': ('django.db.models.fields.FloatField', [], {}),
            'subsoil': ('django.db.models.fields.FloatField', [], {}),
            'year': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'places'", 'to': u"orm['imrviz.Year']"})
        },
        u'imrviz.year': {
            'Meta': {'object_name': 'Year'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.IntegerField', [], {})
        }
    }

    complete_apps = ['imrviz']