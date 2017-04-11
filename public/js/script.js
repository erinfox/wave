$(document).ready(function(){

let breakLocation = $('.api');
let response = "";
let button = $('button');
 let forecastLocation = $('.forecastLocation')




var getBreakInfo = function(break_location){
  var breakName = $("#favBreak").attr('breakname');
  // console.log(breakName)

 $.ajax({
      url: "http://api.wunderground.com/api/5318c4345dfafdf3/tide/q/CA/"+ breakName +".json",
      method: "GET",
      success: function(obj){
        console.log("success obj", obj)
    let time_date = obj.tide.tideSummary[0].date.pretty
    let high_tide_height = obj.tide.tideSummary[0].data.height
    // let high_tide_type = obj.tide.tideSummary[0].data.type
    let low_tide_height = obj.tide.tideSummary[5].data.height
    // let low_tide_type = obj.tide.tideSummary[5].data.type


      breakLocation.html("Date & Time: " + time_date +"<br>"
        + " High Tide: " + high_tide_height +"<br>"
        + " Low Tide: " + low_tide_height)

        // console.log(obj.tide.tideSummary[0].date.pretty);
        // console.log(obj.tide.tideSummary[0].data.height);
        // console.log(obj.tide.tideSummary[0].data.type);
        // console.log(obj.tide.tideSummary[6].data.height);
        // console.log(obj.tide.tideSummary[6].data.type);
      } // success
    }); //ajax


}; // getBreakInfo
getBreakInfo();



}); //ends doc.ready
