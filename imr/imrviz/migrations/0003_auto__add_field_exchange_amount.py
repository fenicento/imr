# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Exchange.amount'
        db.add_column(u'imrviz_exchange', 'amount',
                      self.gf('django.db.models.fields.FloatField')(default=0),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'Exchange.amount'
        db.delete_column(u'imrviz_exchange', 'amount')


    models = {
        u'imrviz.exchange': {
            'Meta': {'object_name': 'Exchange'},
            'amount': ('django.db.models.fields.FloatField', [], {}),
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