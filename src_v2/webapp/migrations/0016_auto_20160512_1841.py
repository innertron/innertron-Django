# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-05-12 18:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0015_limitwattsrider'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='limitwattsrider',
            name='secs',
        ),
        migrations.RemoveField(
            model_name='limitwattsrider',
            name='watts',
        ),
        migrations.AddField(
            model_name='limitwattsrider',
            name='tSec10',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='limitwattsrider',
            name='tSec120',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='limitwattsrider',
            name='tSec1200',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='limitwattsrider',
            name='tSec1800',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='limitwattsrider',
            name='tSec30',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='limitwattsrider',
            name='tSec300',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='limitwattsrider',
            name='tSec3600',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='limitwattsrider',
            name='tSec5',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='limitwattsrider',
            name='tSec5200',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='limitwattsrider',
            name='tSec60',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='limitwattsrider',
            name='tSec600',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='limitwattsrider',
            name='tSec900',
            field=models.IntegerField(default=0),
        ),
    ]
