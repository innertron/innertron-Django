    google.charts.load('current', {'packages':['corechart']});
    //google.charts.setOnLoadCallback(drawChart);
    function drawChart(arguments,flag,color) {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'secs');
    if(flag==1)
      data.addColumn('number', 'heartrate');
    if(flag==2)
      data.addColumn('number', 'watts');
    if(flag==3)
        data.addColumn('number', 'speed');
    if(flag==4)
            data.addColumn('number', 'Elevation');
    var watts=[];
    for(i = 0; i < arguments.length; i++){
    watts.push([i,parseInt(arguments[i])]);
    }
    for(i = 0; i < watts.length; i++){
    data.addRow(watts[i]);
    }
    var options = {
     chart: {
       title: '',
       subtitle: ''
     },
     width: 850,
     height: 120,
     hAxis: {title: 'Seconds',  titleTextStyle: {color: '#333'}},
     vAxis: {minValue: 0},
     colors: [color],
     areaOpacity:1,
     legend: {position: 'none'}
            };
    if(flag==1){
    var chart = new google.visualization.AreaChart(document.getElementById('linechart_material'));
    // Add our over/out handlers.
    document.getElementById("chartlefttab").innerHTML = '<span style="font-size:12px;"> Speed</span> <span style="font-size:12px;color:#A81111;"></br> Max-32.3 </br> Avg-27.4</span>';
    chart.draw(data, options);
    //google.visualization.events.addListener(chart, 'onmouseover', chartMouseOver);
    }
    if(flag==2){
    var chart = new google.visualization.AreaChart(document.getElementById('linechart_material1'));
    document.getElementById("chartlefttab1").innerHTML ='<span style="font-size:12px;"> Watts</span> <span style="font-size:12px;color:#A81111;"></br> Max-476 </br> Avg-294.6</span>';
    chart.draw(data, options);
    //google.visualization.events.addListener(chart, 'onmouseover', chartMouseOver);
    }
    if(flag==3){
    var chart = new google.visualization.AreaChart(document.getElementById('linechart_material2'));
    document.getElementById("chartlefttab2").innerHTML ='<span style="font-size:12px;">Heart Rate</span><span style="font-size:12px;color:#A81111;"></br> Max-135 </br> Avg-101.4 </span>';
    chart.draw(data, options);
    //google.visualization.events.addListener(chart, 'onmouseover', chartMouseOver);
    }
    if(flag==4){
    var chart = new google.visualization.AreaChart(document.getElementById('linechart_material3'));
    document.getElementById("chartlefttab3").innerHTML ='<span style="font-size:12px;">Elevation</span><span style="font-size:12px;color:#A81111;"></br> Max-135 </br> Avg-101.4 </span>';
    chart.draw(data, options);
    //google.visualization.events.addListener(chart, 'onmouseover', chartMouseOver);
    }
    function chartMouseOver(e) {
      //var selectedItem = chart.getFormattedValue()[0];
      //var range1 = chart.getDataTable().getColumnRange(1);
      var value=0;
      var xvalue=0;
      var a=159;
      var b=850;
      var xa=0;
      var xb=2562;
      value = 1+((e.row-xa)*(b-a)/(xb-xa));
      console.log(value);
      xvalue=value+159;
    }
    }
    var heartRate=[];
    var watts=[];
	var pWatts=[];
    var speed=[];
    var elevation=[];
    var tempWatts=[];
	var power_curve_10seconds = 1;
	var	power_curve_30seconds = 1; 
	var power_curve_1min      = 1; 
	var power_curve_5min      = 1;
	var power_curve_20min     = 1;
	var power_curve_60min     = 1;
	var heart_beat_curve_10seconds = 170;
	var heart_beat_curve_30seconds = 168;
	var heart_beat_curve_1min =      167 
	var heart_beat_curve_5min =      150
	var heart_beat_curve_20min=      142;
	var heart_beat_curve_60min=      133;
	
	
          $.ajax({
            url:'/riderlist',
            dataType:'json',
            type:'get',
            cache:false,
            success:function(data){
              //console.log('success');
              $(data).each(function(index, value){
                $('#riderlistid').append('<option value="'+value.pk+'">'+value.fields.riderNo+'</option>'); // load the riderlistid data (value and text)
				//alert(value.pk +'   , : = ' + value.fields.riderNo);
                })
            }
          });
          function get_rider_ride_list(){ // load ride list for selected rider 
            var xk=0;
            var results=[];
            var i;
            var riderNo = $('#riderlistid').val();
            $('#ridelistid').empty();
            $.ajax({
              url:'/ridelist',
              type:"get",
              cache:false,
              data:{riderNo:riderNo},
              success:function(data){
                $('#ridelistid').append('<option value="">'+'Select a Ride'+'</option>');
                $(data).each(function(index, value){

                  if(jQuery.inArray(value.fields.rideNo,results)<0){
                    results.push(value.fields.rideNo);
                    $('#ridelistid').append('<option value="'+value.fields.rideNo+'">'+value.fields.rideNo+'</option>');

                  }
                })

              }
            });
          }
            function drawridechart(){ // this function will be called when we select a rider with a ride from ridelistid - it is the first call for the chart # important !
            //  var heartRate=[];
              var ht=[];
              var delay=1000;
              //var pWatts=[];
             // var speed=[];
             // var elevation=[];
              var tempWatts=[];
              var tempSecs=[];
              var rideNo = $('#ridelistid').val();
              var riderNo = $('#riderlistid').val();
              var color1='#2155CF';
              var color2='#442B59';
              var color3='#084D0D';
              var color4='#ccc';
			  
			  //Maadh
			 // document.getElementById("Max_Watts").innerHTML = "<table border=\'1\' id=\'mytable\'><tbody><tr><td>22<\/td><td>333<\/td><\/tr><tr><td>22<\/td><td>333<\/td><\/tr><\/tbody><\/table>";
			 
			  
			      $.ajax({
                    url:'/get_max_watts',
                    type:"get",
                    cache:false,
                    data:{rideNo:rideNo,riderNo:riderNo},
                    success:function(data){
                      $(data).each(function(index, value){
                        // alert(value.fields.Max_watts_10seconds);
			

			  tabBody=document.getElementsByTagName("tbody").item(0);
              row=document.createElement("tr");
              cell1 = document.createElement("td");
			  cell1.setAttribute("id", "max_10_seconds");
              cell2 = document.createElement("td");
			  cell3 = document.createElement("td");
              cell4 = document.createElement("td");
			  cell5 = document.createElement("td");
              cell6 = document.createElement("td");
			  cell1.setAttribute("id", "max_10_seconds");
			  cell2.setAttribute("id", "max_30_seconds");
			  cell3.setAttribute("id", "max_1_min");
			  cell4.setAttribute("id", "max_5_min");
			  cell5.setAttribute("id", "max_20_min");
			  cell6.setAttribute("id", "max_1_hour");
              Max_watts_10seconds=document.createTextNode(value.fields.Max_watts_10seconds + ' watts');
              Max_watts_30seconds=document.createTextNode(value.fields.Max_watts_30seconds + ' watts');
			  Max_watts_1min=document.createTextNode(value.fields.Max_watts_1min + ' watts');
              Max_watts_5min=document.createTextNode(value.fields.Max_watts_5min + ' watts');
			  Max_watts_20min=document.createTextNode(value.fields.Max_watts_20min + ' watts');
			  Max_watts_60min=document.createTextNode(value.fields.Max_watts_60min + ' watts');
              cell1.appendChild(Max_watts_10seconds);
              cell2.appendChild(Max_watts_30seconds);
			  cell3.appendChild(Max_watts_1min);
              cell4.appendChild(Max_watts_5min);
			  cell5.appendChild(Max_watts_20min);
              cell6.appendChild(Max_watts_60min);
              row.appendChild(cell1);
              row.appendChild(cell2);
			  row.appendChild(cell3);
              row.appendChild(cell4);
			  row.appendChild(cell5);
              row.appendChild(cell6);
              tabBody.appendChild(row);
						 
                          //console.log(ht);
                      })
		  $.ajax({
                    url:'/get_power_curve_duration',
                    type:"get",
                    cache:false,
                    data:{riderNo:riderNo},
                    success:function(data){
                      $(data).each(function(index, value){
						  
			  power_curve_10seconds = value.fields.Max_watts_10seconds;
			  power_curve_30seconds = value.fields.Max_watts_30seconds ;
			  power_curve_1min =      value.fields.Max_watts_1min ;
			  power_curve_5min =      value.fields.Max_watts_5min;
			  power_curve_20min=      value.fields.Max_watts_20min; 
			  power_curve_60min=      value.fields.Max_watts_60min ;
                       //  alert(value.fields.Max_watts_10seconds);
						  tabBody=document.getElementsByTagName("tbody").item(0);
              row=document.createElement("tr");
              cell1 = document.createElement("td");
			  cell1.setAttribute("id", "max_10_seconds");
              cell2 = document.createElement("td");
			  cell3 = document.createElement("td");
              cell4 = document.createElement("td");
			  cell5 = document.createElement("td");
              cell6 = document.createElement("td");
			  cell1.setAttribute("id", "max_10_seconds_%");
			  cell2.setAttribute("id", "max_30_seconds_%");
			  cell3.setAttribute("id", "max_1_min_%");
			  cell4.setAttribute("id", "max_5_min_%");
			  cell5.setAttribute("id", "max_20_min_%");
			  cell6.setAttribute("id", "max_1_hour_%");
			 
              Max_watts_10seconds=document.createTextNode('0 %');
              Max_watts_30seconds=document.createTextNode('0 %');
			  Max_watts_1min=document.createTextNode('0 %');
              Max_watts_5min=document.createTextNode('0 %');
			  Max_watts_20min=document.createTextNode('0 %');
			  Max_watts_60min=document.createTextNode('0 %');
              cell1.appendChild(Max_watts_10seconds);
              cell2.appendChild(Max_watts_30seconds);
			  cell3.appendChild(Max_watts_1min);
              cell4.appendChild(Max_watts_5min);
			  cell5.appendChild(Max_watts_20min);
              cell6.appendChild(Max_watts_60min);
              row.appendChild(cell1);
              row.appendChild(cell2);
			  row.appendChild(cell3);
              row.appendChild(cell4);
			  row.appendChild(cell5);
              row.appendChild(cell6);
              tabBody.appendChild(row);
			  
			  
			  
			  
			  // shoud be modified !! heart beat 
			  
			  
			  heart_beat_curve_10seconds = 170;
			  heart_beat_curve_30seconds = 168;
			  heart_beat_curve_1min =      167 
			  heart_beat_curve_5min =      150
			  heart_beat_curve_20min=      142;
			  heart_beat_curve_60min=      133;
                       //  alert(value.fields.Max_watts_10seconds);
						  tabBody=document.getElementsByTagName("tbody").item(1);
              row=document.createElement("tr");
              cell1 = document.createElement("td");
              cell2 = document.createElement("td");
			  cell3 = document.createElement("td");
              cell4 = document.createElement("td");
			  cell5 = document.createElement("td");
              cell6 = document.createElement("td");
			  cell1.setAttribute("id", "max_beat_10_seconds");
			  cell2.setAttribute("id", "max_beat_30_seconds");
			  cell3.setAttribute("id", "max_beat_1_min");
			  cell4.setAttribute("id", "max_beat_5_min");
			  cell5.setAttribute("id", "max_beat_20_min");
			  cell6.setAttribute("id", "max_beat_1_hour");
			  Max_watts_10seconds=document.createTextNode('0 pbm');
              Max_watts_30seconds=document.createTextNode('0 pbm');
			  Max_watts_1min=document.createTextNode('0 pbm');
              Max_watts_5min=document.createTextNode('0 pbm');
			  Max_watts_20min=document.createTextNode('0 pbm');
			  Max_watts_60min=document.createTextNode('0 pbm');
              cell1.appendChild(Max_watts_10seconds);
              cell2.appendChild(Max_watts_30seconds);
			  cell3.appendChild(Max_watts_1min);
              cell4.appendChild(Max_watts_5min);
			  cell5.appendChild(Max_watts_20min);
              cell6.appendChild(Max_watts_60min);
              row.appendChild(cell1);
              row.appendChild(cell2);
			  row.appendChild(cell3);
              row.appendChild(cell4);
			  row.appendChild(cell5);
              row.appendChild(cell6);
              tabBody.appendChild(row);
			  
			  row=document.createElement("tr");
              cell1 = document.createElement("td");
              cell2 = document.createElement("td");
			  cell3 = document.createElement("td");
              cell4 = document.createElement("td");
			  cell5 = document.createElement("td");
              cell6 = document.createElement("td");
			  cell1.setAttribute("id", "max_beat_10_seconds%");
			  cell2.setAttribute("id", "max_beat_30_seconds%");
			  cell3.setAttribute("id", "max_beat_1_min%");
			  cell4.setAttribute("id", "max_beat_5_min%");
			  cell5.setAttribute("id", "max_beat_20_min%");
			  cell6.setAttribute("id", "max_beat_1_hour%");
			  Max_watts_10seconds=document.createTextNode('0 %');
              Max_watts_30seconds=document.createTextNode('0 %');
			  Max_watts_1min=document.createTextNode('0 %');
              Max_watts_5min=document.createTextNode('0 %');
			  Max_watts_20min=document.createTextNode('0 %');
			  Max_watts_60min=document.createTextNode('0 %');
              cell1.appendChild(Max_watts_10seconds);
              cell2.appendChild(Max_watts_30seconds);
			  cell3.appendChild(Max_watts_1min);
              cell4.appendChild(Max_watts_5min);
			  cell5.appendChild(Max_watts_20min);
              cell6.appendChild(Max_watts_60min);
              row.appendChild(cell1);
              row.appendChild(cell2);
			  row.appendChild(cell3);
              row.appendChild(cell4);
			  row.appendChild(cell5);
              row.appendChild(cell6);
              tabBody.appendChild(row);
			  
			  
              row=document.createElement("tr");
              cell1 = document.createElement("td");
              cell2 = document.createElement("td");
			  cell3 = document.createElement("td");
              cell4 = document.createElement("td");
			  cell5 = document.createElement("td");
              cell6 = document.createElement("td");
			  cell1.setAttribute("id", "max_watt_beat_10_seconds");
			  cell2.setAttribute("id", "max_watt_beat_30_seconds");
			  cell3.setAttribute("id", "max_watt_beat_1_min");
			  cell4.setAttribute("id", "max_watt_beat_5_min");
			  cell5.setAttribute("id", "max_watt_beat_20_min");
			  cell6.setAttribute("id", "max_watt_beat_1_hour");
			  Max_watts_10seconds=document.createTextNode('0 sec');
              Max_watts_30seconds=document.createTextNode('0 sec');
			  Max_watts_1min=document.createTextNode('0 sec');
              Max_watts_5min=document.createTextNode('0 sec');
			  Max_watts_20min=document.createTextNode('0 sec');
			  Max_watts_60min=document.createTextNode('0 sec');
              cell1.appendChild(Max_watts_10seconds);
              cell2.appendChild(Max_watts_30seconds);
			  cell3.appendChild(Max_watts_1min);
              cell4.appendChild(Max_watts_5min);
			  cell5.appendChild(Max_watts_20min);
              cell6.appendChild(Max_watts_60min);
              row.appendChild(cell1);
              row.appendChild(cell2);
			  row.appendChild(cell3);
              row.appendChild(cell4);
			  row.appendChild(cell5);
              row.appendChild(cell6);
              tabBody.appendChild(row);
			  
			  
			  // end 
						// alert("OK");
                          //console.log(ht);
                      })
                    }

                  });
					  
                    }

                  });
				  // Maadh2016
				    
			  
			  
			  

              $.ajax({
                url:'/ridechart',
                type:"get",
                cache:false,
                data:{rideNo:rideNo,riderNo:riderNo},
                success:function(data){
                  //console.log(data);
                  $(data).each(function(index, value){
                  heartRate.push(value.fields.heartRate);
                  pWatts.push(value.fields.watts);
                  speed.push(value.fields.speed);
                  elevation.push(value.fields.elevation)
                  })
                  $.ajax({
                    url:'/ridebar',
                    type:"get",
                    cache:false,
                    data:{rideNo:rideNo,riderNo:riderNo},
                    success:function(data){
                      var t = new Array();
                       data = JSON.parse(data);
                      $(data).each(function(index, value){
                          ht.push(Math.ceil(338-((338/100)*value))); // ????? - what is ht and why it is constant ?
                          //console.log(ht);
                      })
                    }

                  });
				  
				  

				  
				  
				  
				  
				
				  
                  drawChart(heartRate,1,color1); // call to drawChart function with data and flag 1= heartRate , 2=pWatts, 3=speed , 4=elevation .
                  drawChart(pWatts,2,color2);
                  drawChart(speed,3,color3);
                  drawChart(elevation,4,color4);	

                  render_max_watts_and_percentage(pWatts.length-1);			  
                  //console.log(ht);
                  //drawbar(ht);
                }
              });
            }
          window.onload=function(){
          var x=300;
          var canvas=document.getElementById('canvas');  // canvas now shows time with colors 
          var ctx=canvas.getContext('2d');
          var cdt=[200,320,310,300,290];
          function renderbar(){
            var now = new Date();
            var hours=now.getHours();
            var mins=now.getMinutes();
            var secs=now.getSeconds();
            var time=now.toLocaleTimeString();
              ctx.fillStyle="white";
              ctx.clearRect(0,0,canvas.width,canvas.height);
              ctx.fillRect(0,0,228,x);
              ctx.stroke();
              ctx.font="30px Arial";
              ctx.fillStyle="black";
              ctx.fillText(hours+":"+mins+":"+secs,62,320);
              x=x-5;
              if(x<30){
                x=300;
              }
            }
           // var setintrvl=setInterval(renderbar,600);
          };

            function uploadfitfile(){
              var riderNo = $('#riderlistid').val();
              $.ajax({
                url:'/uploadfitfile',
                type:"post",
                cache:false,
                riderNo:riderNo,
                data:{csrfmiddlewaretoken: "{{ csrf_token }}",riderNo:riderNo},
                success:function(data){
                  //console.log(data);
                }
              });

            }

            function readcsv(){
              var riderNo = $('#riderlistid').val();
              $.ajax({
                url:'/readcsv',
                type:"get",
                cache:false,
                data: { csrfmiddlewaretoken: "{{ csrf_token }}",   // < here
           state:"inactive",riderNo:riderNo
         },
                success:function(data){
                //console.log(data);

                }
              });
            }
            function getPos(e){
           x=e.clientX;
        	y=e.clientY;
            var value=0;
            var a=0;
            var b=pWatts.length-1;
            var xa=159;
            var xb=850;
            value = ((Math.ceil(1+(((x-8)-xa)*(b-a)/(xb-xa)))*10)/10)-1;
            $('.overlay').css({'left' : x-8,'border-left':'1px solid'});
            $('.overlay1').css({'left' : x-8,'border-left':'1px solid'});
            $('.overlay2').css({'left' : x-8,'border-left':'1px solid'});
            $('.overlay3').css({'left' : x-8,'border-left':'1px solid'});
            //$('.charttooltip').css({'left' : x-8});			
		// 	render_max_watts_and_percentage(value);
			render_max_heart_rate_and_percentage(value);
			render_remaining_time_bar();
			//calculate_max_watts();
            //console.log(speed[value]);
			//console.log(value);
			min_ = Math.floor( value / 60 );
			sec_= value - (min_*60) ; 
			if (min_ <= 9) {
			min_ = '0' + min_ ;}
			if (sec_ <= 9) {
			sec_ = '0' + sec_ ;}
			
			time =   '0'+':' + min_ + ':' + sec_;
			//time = value +' Sec' ;
			
			 // document.getElementById("Time").innerHTML ='<b>'+ time + '</b>' + '</br>' + speed[value]+'</br>mi/hr';
         
            document.getElementById("charttooltip").innerHTML ='<b>'+ time + '</b>' + '</br>' + speed[value]+'</br>mi/hr';
            document.getElementById("charttooltip1").innerHTML = pWatts[value]+'</br>watts';
            document.getElementById("charttooltip2").innerHTML = heartRate[value]+'</br>bpm';
            document.getElementById("charttooltip3").innerHTML = elevation[value]+'</br>ft'; 
    	}

		
		 function render_remaining_time_bar(){
			 
			  var canvas=document.getElementById('canvas');  // canvas now shows time with colors 
          var ctx=canvas.getContext('2d');
          var cdt=[200,320,310,300,290];
        
		
            var now = new Date();
            var hours=now.getHours();
            var mins=now.getMinutes();
            var secs=now.getSeconds();
            var time=now.toLocaleTimeString();
			var max_x=x_sec[0];
			if (max_x <0){max_x =0;}
			var bar_value  = max_x ;
			
			min_ = Math.floor( max_x / 60 );
			sec_= Math.floor (max_x - (min_*60)) ; 
			if (min_ <= 9) {
			min_ = '0' + min_ ;}
			if (sec_ <= 9) {
			sec_ = '0' + sec_ ;}
			
			max_x_time =   '00'+':' + min_ + ':' + sec_;
			
			if (bar_value>300){bar_value=300;}
              ctx.fillStyle="white";
              ctx.clearRect(0,0,canvas.width,canvas.height);
              ctx.fillRect(0,0,228,bar_value);
              ctx.stroke();
              ctx.font="30px Arial";
              ctx.fillStyle="black";
			  ctx.fillText(max_x_time ,62,320);
              
            }

var x_sec=[];
var y_sec=[];
function render_max_heart_rate_and_percentage(value)
{
	max_10_seconds_watt=calculate_max_watts(value,10);
    document.getElementById('max_10_seconds').innerHTML = max_10_seconds_watt +' watts'; 
	document.getElementById('max_10_seconds_%').innerHTML = Math.round( max_10_seconds_watt*100 / power_curve_10seconds ) + ' %' ;
	max_30_seconds_watt =calculate_max_watts(value,30);
	document.getElementById('max_30_seconds').innerHTML = max_30_seconds_watt + ' watts';
	document.getElementById('max_30_seconds_%').innerHTML = Math.round( max_30_seconds_watt*100 / power_curve_30seconds ) + ' %' ;
	max_1_min_watt=calculate_max_watts(value,60);
	document.getElementById('max_1_min').innerHTML = max_1_min_watt + ' watts';
	document.getElementById('max_1_min_%').innerHTML = Math.round( max_1_min_watt*100 / power_curve_1min ) + ' %' ;
	max_5_min_watt=calculate_max_watts(value,300);
	document.getElementById('max_5_min').innerHTML = max_5_min_watt + ' watts';
	document.getElementById('max_5_min_%').innerHTML = Math.round( max_5_min_watt*100 / power_curve_5min ) + ' %' ;
    max_20_min_watt=calculate_max_watts(value,1200);
	document.getElementById('max_20_min').innerHTML = max_20_min_watt + ' watts';
	document.getElementById('max_20_min_%').innerHTML = Math.round( max_20_min_watt*100 / power_curve_20min ) + ' %' ;
    max_1_hour_watt=calculate_max_watts(value,3600);
	document.getElementById('max_1_hour').innerHTML = max_1_hour_watt + ' watts';
	document.getElementById('max_1_hour_%').innerHTML = Math.round( max_1_hour_watt*100 / power_curve_60min ) + ' %' ;

	
	
	
	
	max_10_seconds=calculate_max_heart_rate(value,10);
    document.getElementById('max_beat_10_seconds').innerHTML = max_10_seconds +' bpm'; 
	document.getElementById('max_beat_10_seconds%').innerHTML = Math.round( max_10_seconds*100 / heart_beat_curve_10seconds ) + ' %' ;
	
	
	max_30_seconds =calculate_max_heart_rate(value,30);
	document.getElementById('max_beat_30_seconds').innerHTML = max_30_seconds + ' bpm';
	document.getElementById('max_beat_30_seconds%').innerHTML = Math.round( max_30_seconds*100 / heart_beat_curve_30seconds ) + ' %' ;

	max_1_min=calculate_max_heart_rate(value,60);
    document.getElementById('max_beat_1_min').innerHTML = max_1_min + ' bpm';
	document.getElementById('max_beat_1_min%').innerHTML = Math.round( max_1_min*100 / heart_beat_curve_1min ) + ' %' ;
	
	max_5_min=calculate_max_heart_rate(value,300);
	document.getElementById('max_beat_5_min').innerHTML = max_5_min + ' bpm';
	document.getElementById('max_beat_5_min%').innerHTML = Math.round( max_5_min*100 / heart_beat_curve_5min ) + ' %' ;
    max_20_min=calculate_max_heart_rate(value,1200);
	document.getElementById('max_beat_20_min').innerHTML = max_20_min + ' bpm';
	document.getElementById('max_beat_20_min%').innerHTML = Math.round( max_20_min*100 / heart_beat_curve_20min ) + ' %' ;
    max_1_hour=calculate_max_heart_rate(value,3600);
	document.getElementById('max_beat_1_hour').innerHTML = max_1_hour + ' bpm';
	document.getElementById('max_beat_1_hour%').innerHTML = Math.round( max_1_hour*100 / heart_beat_curve_60min ) + ' %' ;

    var y=[]; // to store watts % + heartRate% divided by 2 
	//x_10_sec
	if (value<10){
		x_sec[0]=0; 
		y_sec[0]=0;
	}
	else{
	y[0]=  (Math.round( max_10_seconds_watt*100 / power_curve_10seconds ) +  Math.round( max_10_seconds*100 / heart_beat_curve_10seconds ) )/2 ;
	x_sec[0]=( 100 - y[0]) * 10 /100;
	y_sec[0] =(100 - (Math.round( max_10_seconds_watt*100 / power_curve_10seconds ) )) * 10 /100;
	}
	//x_30_sec
	if (value<30)
		x_sec[1]=0; 
	else
	{
	y[1]=  (Math.round( max_30_seconds_watt*100 / power_curve_30seconds )+  Math.round( max_30_seconds*100 / heart_beat_curve_30seconds ) )/2;
	x_sec[1]= ( 100 - y[1]) * 30 /100;
	}
	//x_1_min
	if (value<60)
		x_sec[2]=0; 
	else
	{
	y[2]=   (Math.round( max_1_min_watt*100 / power_curve_1min ) +  Math.round( max_1_min*100 / heart_beat_curve_1min ) )/2;
	x_sec[2]= ( 100 - y[2]) * 60 /100;
	}
	//x_5_min
	if (value<300)
		x_sec[3]=0; 
	else
	{
	y[3]= ( Math.round( max_5_min_watt*100 / power_curve_5min )+  Math.round( max_5_min*100 / heart_beat_curve_5min )  )/2;
	x_sec[3]= ( 100 - y[3]) * 300 /100;
	}
	//x_20_min
	if (value<1200)
		x_sec[4]=0; 
	else
	{
    y[4]= (Math.round( max_20_min_watt*100 / power_curve_20min )+   Math.round( max_20_min*100 / heart_beat_curve_20min ) )/2;
	x_sec[4]= ( 100 - y[4]) * 1200 /100;
	
	}
	//x_1_hour
	if (value<3600)
		x_sec[5]=0; 
	else
	{
	y[5]=  (Math.round( max_1_hour_watt*100 / power_curve_60min )+  Math.round( max_1_hour*100 / heart_beat_curve_60min ) )/2 ;
	
	x_sec[5]= ( 100 - y[5]) * 3600 /100;
	}
	//alert ( xx);
	

	document.getElementById('max_watt_beat_10_seconds').innerHTML = x_sec[0] + ' Sec' ;
	document.getElementById('max_watt_beat_30_seconds').innerHTML = x_sec[1] + ' Sec' ;
    document.getElementById('max_watt_beat_1_min').innerHTML = x_sec[2] + ' Sec' ;
	document.getElementById('max_watt_beat_5_min').innerHTML = x_sec[3] + ' Sec' ;
	document.getElementById('max_watt_beat_20_min').innerHTML = x_sec[4] + ' Sec' ;
	document.getElementById('max_watt_beat_1_hour').innerHTML = x_sec[5] + ' Sec' ;
	//alert(indexOfMax(x_sec));
	//x_sec.sort(function(a, b){return b-a});
	x_sec[0]=x_sec[indexOfMax(y)];
	
	
	
	//alert( x_sec[0] );
	//document.getElementById('max_watt_beat_1_hour').innerHTML =  x_sec[0] + ' Sec' ;
	//Math.round( max_10_seconds_watt*100 / power_curve_10seconds )
	/*
	
		  cell1.setAttribute("id", "max_watt_beat_10_seconds");
			  cell2.setAttribute("id", "max_watt_beat_30_seconds");
			  cell3.setAttribute("id", "max_watt_beat_1_min");
			  cell4.setAttribute("id", "max_watt_beat_5_min");
			  cell5.setAttribute("id", "max_watt_beat_20_min");
			  cell6.setAttribute("id", "max_watt_beat_1_hour");
	
	*/
	
	//document.getElementById('max_5_min').innerHTML = calculate_max_watts(value,300);
	//document.getElementById('max_20_min').innerHTML = calculate_max_watts(value,1200);
	//document.getElementById('max_1_hour').innerHTML = calculate_max_watts(value,3600);
	//max_10_seconds_%
}	

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}
	
function render_max_watts_and_percentage(value)
{
	/*
	max_10_seconds=calculate_max_watts(value,10);
    document.getElementById('max_10_seconds').innerHTML = max_10_seconds +' watts'; 
	document.getElementById('max_10_seconds_%').innerHTML = Math.round( max_10_seconds*100 / power_curve_10seconds ) + ' %' ;
	max_30_seconds =calculate_max_watts(value,30);
	document.getElementById('max_30_seconds').innerHTML = max_30_seconds + ' watts';
	document.getElementById('max_30_seconds_%').innerHTML = Math.round( max_30_seconds*100 / power_curve_30seconds ) + ' %' ;
	max_1_min=calculate_max_watts(value,60);
	document.getElementById('max_1_min').innerHTML = max_1_min + ' watts';
	document.getElementById('max_1_min_%').innerHTML = Math.round( max_1_min*100 / power_curve_1min ) + ' %' ;
	max_5_min=calculate_max_watts(value,300);
	document.getElementById('max_5_min').innerHTML = max_5_min + ' watts';
	document.getElementById('max_5_min_%').innerHTML = Math.round( max_5_min*100 / power_curve_5min ) + ' %' ;
    max_20_min=calculate_max_watts(value,1200);
	document.getElementById('max_20_min').innerHTML = max_20_min + ' watts';
	document.getElementById('max_20_min_%').innerHTML = Math.round( max_20_min*100 / power_curve_20min ) + ' %' ;
    max_1_hour=calculate_max_watts(value,3600);
	document.getElementById('max_1_hour').innerHTML = max_1_hour + ' watts';
	document.getElementById('max_1_hour_%').innerHTML = Math.round( max_1_hour*100 / power_curve_60min ) + ' %' ;
*/
	
	
	//document.getElementById('max_5_min').innerHTML = calculate_max_watts(value,300);
	//document.getElementById('max_20_min').innerHTML = calculate_max_watts(value,1200);
	//document.getElementById('max_1_hour').innerHTML = calculate_max_watts(value,3600);
	//max_10_seconds_%
}		

function calculate_max_watts (seconds , time_in_seconds ){
	if (seconds < time_in_seconds )
		return '0';
	var Max_watts_value = 0;
	var Current_watts_total =0;
	for (x =1; x <= seconds;x++ )
                if(x<=time_in_seconds) { // for X seconds 
                    Max_watts_value=Max_watts_value+pWatts[x-1]
                    Current_watts_total = Current_watts_total+pWatts[x-1]
					}            
				else{
                    Current_watts_total = Current_watts_total + pWatts[x-1] - pWatts[x-1-time_in_seconds]
                    if(Current_watts_total>Max_watts_value) {
                        Max_watts_value= Current_watts_total
						}
					}
	return Math.round(Max_watts_value / time_in_seconds) ;
}



function calculate_max_heart_rate (seconds , time_in_seconds ){
	if (seconds < time_in_seconds )
		return '0';
	var Max_watts_value = 0;
	var Current_watts_total =0;
	for (x =1; x <= seconds;x++ )
                if(x<=time_in_seconds) { // for X seconds 
                    Max_watts_value=Max_watts_value+heartRate[x-1]
                    Current_watts_total = Current_watts_total+heartRate[x-1]
					}            
				else{
                    Current_watts_total = Current_watts_total + heartRate[x-1] - heartRate[x-1-time_in_seconds]
                    if(Current_watts_total>Max_watts_value) {
                        Max_watts_value= Current_watts_total
						}
					}
	//if (seconds < time_in_seconds )
      //    return Math.round(Max_watts_value / seconds) ;
					
	return Math.round(Max_watts_value / time_in_seconds) ;
}
		
		
    	function stopTracking(){
        $('.overlay').css({'left' : x-8,'border-left':'0px solid'});
        $('.overlay1').css({'left' : x-8,'border-left':'0px solid'});
        $('.overlay2').css({'left' : x-8,'border-left':'0px solid'});
        $('.overlay3').css({'left' : x-8,'border-left':'0px solid'});
        document.getElementById("charttooltip").innerHTML = '';
        document.getElementById("charttooltip1").innerHTML = '';
        document.getElementById("charttooltip2").innerHTML = '';
        document.getElementById("charttooltip3").innerHTML = '';
    	}
  	 // function from the jquery form plugin
  	 $('#myForm').ajaxForm({
  	 	beforeSend:function(){
        $(".screen-block").show();
  	 		 $(".progress").show();
  	 	},
  	 	uploadProgress:function(event,position,total,percentComplete){
  	 		$(".progress-bar").width(percentComplete+'%'); //dynamicaly change the progress bar width
  	 		$(".sr-only").html(percentComplete+'%'); // show the percentage number
  	 	},
  	 	success:function(){
        $(".screen-block").hide();
  	 	},
  	 	complete:function(response){

  	 	}
  	 });

  	 //set the progress bar to be hidden on loading
  	 $(".progress").hide();
