$(document).ready(function(){

 $('.explanation-button').on('click',function(e){


     switch($(e.currentTarget).html()) {

         case "Site Data" :
             $('.explanation-text').hide();
             $('#site-data').fadeToggle();
            break;
         case "Events Specific" :
             $('.explanation-text').hide();
             $('#events-data').fadeToggle();
            break;
         case "Support Specific" :
             $('.explanation-text').hide();
             $('#support-data').fadeToggle();
            break;
         case "Rating Specific" :
             $('.explanation-text').hide();
             $('#rating-data').fadeToggle();
            break;
         default:
             console.log($(e.currentTarget).html());
     }

/*
     if($(e.currentTarget).html() === "Site Data"){

         $('#site-data').fadeToggle();
         console.log($(e.currentTarget).html());

     }*/

 })

});