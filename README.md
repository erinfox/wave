google weather 
surfer enters zip 



status on weather 



DELETE FROM wave_break WHERE break_location = 'Sunset Point';


http://magicseaweed.com/developer/forecast-api



http://hawaiibeachsafety.com/rest/conditions.json



https://www.programmableweb.com/api/marinesurfing-weather



WorldWeatherOnline.com



to do 
-api 
-make break_id say actual break name instead of the number 
-delete a "surfer"/user 


4/8 TO DO 
-fix update.. it is updating random surfers 
-fix update.. it is changing intput to a number and displaying it 
-make it pretty 
-GET AN API 

4/9 
-GET API
-MAKE PRETTY 




SELECT surfers.favorite_break_id, surfers.name, wave_break.break_location FROM surfers INNER JOIN wave_break ON surfers.favorite_break_id = wave_break.id;
