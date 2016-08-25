from django.shortcuts import render, render_to_response
from django.conf import settings
from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.http import HttpResponse
from django.core import serializers
import json
import csv
import os
import subprocess
from django import forms
from .forms import DocumentForm
from .models import Document
#take django queryset object and turn it to a valid json or xml
from webapp.models import ridermaster
from webapp.models import riderride
from webapp.models import limitwattsrider
from webapp.models import max_watts_duration
from webapp.models import power_curve_duration

from array import *
import sys

# Create your views here.
def index(request):
    #return HttpResponse("<h1>HEY!</h2>");
    return render(request,'html/index.html')

def upload_file(request):
    # Handle file upload

    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            riderNo=request.POST.get('riderlistid')
            newdoc = Document(docfile = request.FILES['docfile'])
            newdoc.save()
            fname=request.FILES['docfile'].name
            newdoccsv=subprocess.call(['java', '-jar', 'FitCSVTool.jar',fname],cwd='webapp/media/documents')
            readcsv(riderNo,fname[:-4])

            # Redirect to the document list after POST
            #return HttpResponse(riderNo)
    else:
        form = DocumentForm() # A empty, unbound form

    # Load documents for the list page
    documents = Document.objects.all()

    # Render list page with the documents and the form
    return render_to_response('html/index.html',{'documents': documents, 'form': form},context_instance=RequestContext(request))
    #return HttpResponse(fname)
def ridelist(request):
    riderNo = request.GET['riderNo']
    queryset = riderride.objects.filter(riderNo=riderNo).distinct()
    queryset = serializers.serialize('json',queryset)
    #queryset=dict(queryset)
    return HttpResponse(queryset, content_type="application/json")

def riderlist(request):
    queryset = ridermaster.objects.all()
    queryset = serializers.serialize('json',queryset)
    return HttpResponse(queryset, content_type="application/json")

def ridechart(request):
    rideNo = request.GET['rideNo']
    riderNo = request.GET['riderNo']
    queryset = riderride.objects.filter(rideNo=rideNo,riderNo=riderNo)
    queryset = serializers.serialize('json',queryset)
    return HttpResponse(queryset, content_type="application/json")
	
def get_max_watts(request):
    rideNo = request.GET['rideNo']
    riderNo = request.GET['riderNo']
    queryset = max_watts_duration.objects.filter(rideNo=rideNo,riderNo=riderNo)
    queryset = serializers.serialize('json',queryset)
    return HttpResponse(queryset, content_type="application/json")
	
def get_power_curve_duration(request):
    riderNo = request.GET['riderNo']
    queryset = power_curve_duration.objects.filter(riderNo=riderNo)
    queryset = serializers.serialize('json',queryset)
    return HttpResponse(queryset, content_type="application/json")

def ridebar(request):
    data=[]
    tempData=[]
    rSec=[]
    tSec1=[]
    tSec30=[]
    tSec60=[]
    tSec600=[]
    tSec1800=[]
    tSec3600=[]

    myList=[1,2,3,4,5,6]
    rideNo = request.GET['rideNo']
    riderNo = request.GET['riderNo']
    queryset1 = riderride.objects.filter(rideNo=rideNo,riderNo=riderNo)
    for row in queryset1:
        data.append(row.watts)

    queryset = limitwattsrider.objects.filter(riderNo='Rider1')
    for row in queryset:
        tempData.append(row.watts)

    for index in range(len(data)):
        tempvalue=0
        for index1 in range(len(tempData)):
            if index1==0 and index==0:
                tSec1.append((data[index]*1.0/tempData[index1])*(1/1)*100)
                k=(data[index]*1.0/tempData[index1])*(1/1)*100
                if k>tempvalue:
                    tempvalue=k
                    k=0

            if index1==1 and index<30:
                if index==0:
                    tSec30.append((data[index]*1.0/tempData[index1])*(1/30.0)*100)
                    k=(data[index]*1.0/tempData[index1])*(1/30.0)*100
                    if k>tempvalue:
                        tempvalue=k
                        k=0
                if index>0:
                    tSec30.append(tSec30[index-1]+(data[index]*1.0/tempData[index1])*(1/30.0)*100)
                    k=(data[index]*1.0/tempData[index1])*(1/30.0)*100
                    if k>tempvalue:
                        tempvalue=k
                        k=0

            if index1==2 and index<60:
                tSec60.append((data[index]*1.0/tempData[index1])*(1/60.0)*100)
                k=(data[index]*1.0/tempData[index1])*(1/60.0)*100
                if k>tempvalue:
                    tempvalue=k
                    k=0

            if index1==3 and index<600:
                tSec600.append((data[index]*1.0/tempData[index1])*(1/600.0)*100)
                k=(data[index]*1.0/tempData[index1])*(1/600.0)*100
                if k>tempvalue:
                    tempvalue=k
                    k=0

            if index1==4 and index<1800:
                tSec1800.append((data[index]*1.0/tempData[index1])*(1/1800.0)*100)
                k=(data[index]*1.0/tempData[index1])*(1/1800.0)*100
                if k>tempvalue:
                    tempvalue=k
                    k=0

            if index1==5 and index<3600:
                tSec3600.append((data[index]*1.0/tempData[index1])*(1/3600.0)*100)
                k=(data[index]*1.0/tempData[index1])*(1/3600.0)*100
                if k>tempvalue:
                    tempvalue=k
                    k=0
        rSec.append(tempvalue)

    return HttpResponse(json.dumps(rSec))

    #return HttpResponse(queryset, content_type="application/json")

def readcsv(riderNo,fname):
    x=0
    results=[]
    k=riderride.objects.filter(riderNo=riderNo).values('rideNo').distinct().count()
    rideNo='Ride'+str(k+1)
    with open('webapp/media/documents/'+fname+'.csv') as f:
        reader = csv.reader(f)
        heartrate=[]
        #watts=[]
        watts=array('i')
        speed=[]
        secs=[]
        elevation=[]
        x=0
        y=0
        powerwatt=0
		
        Max_watts_10seconds_value = 0
        Current_watts_10seconds_total = 0
        Max_watts_30seconds_value = 0
        Current_watts_30seconds_total = 0
        Max_watts_1min_value = 0
        Current_watts_1min_total = 0
        Max_watts_5min_value = 0
        Current_watts_5min_total = 0
        Max_watts_20min_value = 0
        Current_watts_20min_total = 0
        Max_watts_60min_value = 0
        Current_watts_60min_total = 0
	
        for row in reader:
            if(row[0]=='Data' and row[2]=='record' and row[3]=='timestamp'):
                x+=1
                secs.append(x)
                heartrate.append(row[28])
                watts.append(int(row[25]))
                speed.append(row[22])
                elevation.append(row[19])
                b=riderride(rideNo=rideNo,riderNo=riderNo,secs=x,heartRate=row[28],watts=row[25],speed=row[22],elevation=row[19])
                b.save()
				
				         # calculate Max_Watts for 10 sec,30sec , 60 sec , 300 sec, 1200 sec , 3600 sec ( the data should be at least 3600 records )
                time_in_seconds = 10 		 
                if(x<=time_in_seconds): # for 10 seconds 
                    Max_watts_10seconds_value=Max_watts_10seconds_value+watts[x-1]
                    Current_watts_10seconds_total = Current_watts_10seconds_total+watts[x-1]
                    print (sys.stderr, 'current record is ' + str(x-1) + ' value : " ' + str(watts[x-1]) +'  Total = '+ str(Max_watts_10seconds_value) )
                else:
                    Current_watts_10seconds_total = Current_watts_10seconds_total + watts[x-1] - watts[x-1-time_in_seconds]
                    if(Current_watts_10seconds_total>Max_watts_10seconds_value):
                        Max_watts_10seconds_value= Current_watts_10seconds_total
                        print (sys.stderr, 'current record is ' + str(x-1) + ' value : " ' + str(watts[x-1]) +'  Total for 10 seconds = '+ str(Max_watts_10seconds_value/10) + ' , -watts[(x-1-10)]: ' + str(watts[(x-1-time_in_seconds)]) )
				
                time_in_seconds = 30 		 
                if(x<=time_in_seconds): # for 10 seconds 
                    Max_watts_30seconds_value=Max_watts_30seconds_value+watts[x-1]
                    Current_watts_30seconds_total = Current_watts_30seconds_total+watts[x-1]
                    print (sys.stderr, 'current record is ' + str(x-1) + ' value : " ' + str(watts[x-1]) +'  Total = '+ str(Max_watts_30seconds_value) )
                else:
                    Current_watts_30seconds_total = Current_watts_30seconds_total + watts[x-1] - watts[x-1-time_in_seconds]
                    if(Current_watts_30seconds_total>Max_watts_30seconds_value):
                        Max_watts_30seconds_value= Current_watts_30seconds_total
                        print (sys.stderr, 'current record is ' + str(x-1) + ' value : " ' + str(watts[x-1]) +'  Total for 30 seconds = '+ str(Max_watts_30seconds_value/30) + ' , -watts[(x-1-10)]: ' + str(watts[(x-1-10)]) )
				
				
                time_in_seconds = 60 		 
                if(x<=time_in_seconds): # for 10 seconds 
                    Max_watts_1min_value=Max_watts_1min_value+watts[x-1]
                    Current_watts_1min_total = Current_watts_1min_total+watts[x-1]
                    #print (sys.stderr, 'current record is ' + str(x-1) + ' value : " ' + str(watts[x-1]) +'  Total = '+ str(Max_watts_30seconds_value) )
                else:
                    Current_watts_1min_total = Current_watts_1min_total + watts[x-1] - watts[x-1-time_in_seconds]
                    if(Current_watts_1min_total>Max_watts_1min_value):
                        Max_watts_1min_value= Current_watts_1min_total
                        #print (sys.stderr, 'current record is ' + str(x-1) + ' value : " ' + str(watts[x-1]) +'  Total for 30 seconds = '+ str(Max_watts_30seconds_value/30) + ' , -watts[(x-1-10)]: ' + str(watts[(x-1-10)]) )
					
                time_in_seconds = 300 		 
                if(x<=time_in_seconds): # for 10 seconds 
                    Max_watts_5min_value=Max_watts_5min_value+watts[x-1]
                    Current_watts_5min_total = Current_watts_5min_total+watts[x-1]
                    #print (sys.stderr, 'current record is ' + str(x-1) + ' value : " ' + str(watts[x-1]) +'  Total = '+ str(Max_watts_30seconds_value) )
                else:
                    Current_watts_5min_total = Current_watts_5min_total + watts[x-1] - watts[x-1-time_in_seconds]
                    if(Current_watts_5min_total>Max_watts_5min_value):
                        Max_watts_5min_value= Current_watts_5min_total
                        #print (sys.stderr, 'current record is ' + str(x-1) + ' value : " ' + str(watts[x-1]) +'  Total for 30 seconds = '+ str(Max_watts_30seconds_value/30) + ' , -watts[(x-1-10)]: ' + str(watts[(x-1-10)]) )
				
	
                time_in_seconds = 1200 		 
                if(x<=time_in_seconds): # for 10 seconds 
                    Max_watts_20min_value=Max_watts_20min_value+watts[x-1]
                    Current_watts_20min_total = Current_watts_20min_total+watts[x-1]
                    #print (sys.stderr, 'current record is ' + str(x-1) + ' value : " ' + str(watts[x-1]) +'  Total = '+ str(Max_watts_30seconds_value) )
                else:
                    Current_watts_20min_total = Current_watts_20min_total + watts[x-1] - watts[x-1-time_in_seconds]
                    if(Current_watts_20min_total>Max_watts_20min_value):
                        Max_watts_20min_value= Current_watts_20min_total
                        #print (sys.stderr, 'current record is ' + str(x-1) + ' value : " ' + str(watts[x-1]) +'  Total for 30 seconds = '+ str(Max_watts_30seconds_value/30) + ' , -watts[(x-1-10)]: ' + str(watts[(x-1-10)]) )
							
                    #if(x==240):
                    #break

#for row in reader:
#   if(row[0]=='Data' and row[2]=='record' and row[3]=='timestamp'):
#               y+=1
#               powerwatt+=int(row[13])
#               avgPW=0
#               if(y==5):
#                   avgPW=powerwatt/5
#                   limitwattsrider.objects.filter(riderNo="Rider1").update(tSec5=avgPW)
#               if(y==10):
#                   avgPW=powerwatt/10
#                   limitwattsrider.objects.filter(riderNo="Rider1").update(tSec5=avgPW)
#               if(x==120):
#                   break
        Max_watts_30seconds_value = Max_watts_30seconds_value/30
        Max_watts_1min_value = Max_watts_1min_value/60
        Max_watts_5min_value = Max_watts_5min_value/300
        Max_watts_20min_value = Max_watts_20min_value/1200
        Max_watts_60min_value = 0
        Max_watts_10seconds_value=Max_watts_10seconds_value/10
        Max_Watts = max_watts_duration(rideNo=rideNo,riderNo=riderNo,Max_watts_10seconds=Max_watts_10seconds_value,Max_watts_30seconds=Max_watts_30seconds_value,Max_watts_1min=Max_watts_1min_value,Max_watts_5min=Max_watts_5min_value,Max_watts_20min=Max_watts_20min_value,Max_watts_60min=Max_watts_60min_value)
        Max_Watts.save()
    f.close()
    return HttpResponse(k)

def list(request):
    return render(request,'html/list.html')

def charts(request):
    return render(request,'html/charts.html')
