function Get_rem_time_from_hear_beat_curve(heart_beat){
	var rem_seconds=0;
	if(heart_beat<= 148)
	{
	rem_seconds = heart_beat * (-195.622119815668) +  29413.133640553
	}
	else {
	rem_seconds = heart_beat* (-15.7142857142857 ) + 2678.57142857142
	}
	return rem_seconds ;
	}
	
function Get_rem_time_from_pow_curve (current_watt_value){
			var rem_seconds=0;
			if (current_watt_value >= 750)
			{
				rem_seconds = ( 1125 - current_watt_value)/12.5;
			}
			else if(current_watt_value >= 400)
			{
				rem_seconds = ( 1100 - current_watt_value)/11.667;
			}
			else if(current_watt_value >= 250)
			{
				rem_seconds = ( 437.5 - current_watt_value)/0.625;
			}
			else if(current_watt_value >= 180)
			{
				rem_seconds = ( 273.33 - current_watt_value)/0.0778;
			}
			else if(current_watt_value >= 140)
			{
				rem_seconds = ( 200 - current_watt_value)/0.0167;
			}
			else {
				rem_seconds = ( 200 - current_watt_value)/0.0167;
			}
			return rem_seconds ;
			/*
1000	y = -12.5x + 1125
750	y = -11.667x + 1100
400	y = -0.625x + 437.5
250	y = -0.0778x + 273.33
180	y = -0.0167x + 200
140	
y = -0.0778x + 273.33
*/
		}