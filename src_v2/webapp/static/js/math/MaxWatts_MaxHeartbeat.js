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
	var Max_hear_beat_value = 0;
	var Current_heart_beat_total =0;
	for (x =1; x <= seconds;x++ )
                if(x<=time_in_seconds) { // for X seconds 
                    Max_hear_beat_value=Max_hear_beat_value+heartRate[x-1]
                    Current_heart_beat_total = Current_heart_beat_total+heartRate[x-1]
					}            
				else{
                    Current_heart_beat_total = Current_heart_beat_total + heartRate[x-1] - heartRate[x-1-time_in_seconds]
                    if(Current_heart_beat_total>Max_hear_beat_value) {
                        Max_hear_beat_value= Current_heart_beat_total
						}
					}
	//if (seconds < time_in_seconds )
      //    return Math.round(Max_hear_beat_value / seconds) ;
					
	return Math.round(Max_hear_beat_value / time_in_seconds) ;
}