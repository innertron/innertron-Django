from django.contrib import admin
from webapp.models import riderride
from webapp.models import ridermaster
from webapp.models import limitwattsrider
from webapp.models import Document
from webapp.models import max_watts_duration
from webapp.models import power_curve_duration
# Register your models here.
admin.site.register(ridermaster)
admin.site.register(riderride)
admin.site.register(Document)
admin.site.register(limitwattsrider)
admin.site.register(max_watts_duration)
admin.site.register(power_curve_duration)
