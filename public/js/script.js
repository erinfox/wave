$(document).ready(function(){


let favorite_break = $('#favBreak').text().split(':')[1].replace(/\s/g, '');

console.log(favorite_break)


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


