$(document).ready(function(){

let breakLocation = $('.api');
let response = "";
let button = $('button');




var getBreakInfo = function(favorite_break){


 $.ajax({
      url: "http://api.wunderground.com/api/KEY/q/CA/monterey.json",
      method: "GET",
      success: function(obj){

    let time_date = obj.tide.tideSummary[0].date.pretty
    let high_tide = obj.tide.tideSummary[0].data.height + obj.tide.tideSummary[0].data.type
    let low_tide = obj.tide.tideSummary[6].data.height + obj.tide.tideSummary[6].data.type


      breakLocation.html(time_date + high_tide + low_tide)

      // handleResponse(response);

        // console.log(obj.tide.tideSummary[0].date.pretty);
        // console.log(obj.tide.tideSummary[0].data.height);
        // console.log(obj.tide.tideSummary[0].data.type);
        // console.log(obj.tide.tideSummary[6].data.height);
        // console.log(obj.tide.tideSummary[6].data.type);
      } // success
    }); //ajax


}; // getBreakInfo
getBreakInfo();

// let addAJAXFunction = function(){
//   let favorite_break = $('.favorite_break_id').val();
//   getBreakInfo(favorite_break);
// }; //addAJAXFunction


// button.on("click", addAJAXFunction);

// button.on('click', function(){
//   // event.preventDefault();
//   let enteredLocation = inputFeild.val();
//   getBreakInfo(enteredLocation)
// })



// let appendBreak = function (time_data, high_tide, low_tide){
//   let signinBreakLocation = (".signinBreakLocation")
//   // let img =
//   signinBreakLocation(time_data, high_tide, low_tide)




// };//appendBreak

// let handleResponse = function(response){
//     let time_date = obj.tide.tideSummary[0].date.pretty
//     let high_tide = obj.tide.tideSummary[0].data.height + obj.tide.tideSummary[0].data.type
//     let low_tide = obj.tide.tideSummary[6].data.height + obj.tide.tideSummary[6].data.type
//     appendBreak(time_data, high_tide, low_tide)
// };//handleResponse



}); //ends doc.ready
