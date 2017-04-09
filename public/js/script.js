$(document).ready(function(){





var getBreakInfo = function(favorite_break){

 $.ajax({
      url: "/api/" + favorite_break,
      method: "GET",
      success: function(response){
        console.log(response);
      } // success
    }); //ajax


}; // getBreakInfo
getBreakInfo(favorite_break);




}); //ends doc.ready


'http://api.wunderground.com/api/5318c4345dfafdf3/conditions/q/CA/San_Francisco.json'

'http://api.wunderground.com/api/   KEY   /conditions/q/   STATE   /   CITY   .json'

