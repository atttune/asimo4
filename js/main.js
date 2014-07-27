/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function showAdvancedSearch(id)
{   var target='div#advanced_search_fields'+id+'';
    $(target).toggle('fast');      } 
    

function showQ(sel)
    {
     $(sel).toggle('fast'); 
    }
    
function naiveReverse(string)
    {
     return string.split('').reverse().join('');
     }
    
    


                   
$(document).ready(function(){
   
   
   onTextarea(); 
    
    $("#newsLetter").click(function(){
       var email = $("#newsInput").val();
    var dataString = email.trim();

    $.ajax({
        dataType: 'json',
        url: "http://localhost/landing/users/newsletter/",
        type: "POST",
        data: "message="+dataString,
        success: function(){
            $("#newsInput").hide();
             $("#okNews").append('<button class="btn btn-warning btn-block">Thanks you to suscribing in our NewsLetter ^_^</button>');   
              
        },
        error: function(){
          $("#okNews").append('<button class="btn btn-danger btn-block">Failed to add you in Newsletter :-(</button>'); 
        }
    });
    
    return false;
});


    $(".ttips").tooltip();
    
    var alert = $('#alert'); 
	if(alert.length > 0){
		alert.hide().slideDown(500);
		alert.find('.close').click(function(e){
			e.preventDefault();
			alert.slideUp();
		})
	}
    
    $("h4.advanced_search_link").click(function(event) {
        var the_id = $(this).attr('id');
        event.preventDefault();
        showAdvancedSearch(the_id);
       
    });
    
    
    
    
        $("label.control-label").click(function(event) {
        var te = $(this).attr("id");
        var sel = 'div#'+te+'-options';
        event.preventDefault();
        showQ(sel);
       
    });
        


    
    
           $("#geolocal").click(function(e){
                           e.preventDefault() ;
                           
                           if(navigator.geolocation){
                                        navigator.geolocation.getCurrentPosition(succesGeo,erreurGeo,{maximumAge:120000});
                                    
                                        function succesGeo(position){
                                           
                                        var latitude = position.coords.latitude;
                                        var longitude = position.coords.longitude;
                                        var coord = 'latitude='+latitude+'&longitude='+longitude ;
                                      
                                        $.ajax({
                                                type : "POST",
                                                url : "http://localhost/landing/users/geo",
                                                data : coord ,
                                                dataType:"json",
                                                success : addOk });
                                        };
                                        
                                       /*
                                         * Erreur geo pour envoyer les erreurs
                                        */ 
                                        function erreurGeo(error){
                                            var e='';
                                            switch(error.code){
                                                case error.TIMEOUT:
                                                     e+=" !TIMEOUT! " ;
                                                break;
                                                case error.PERMISSION_DENIED:
                                                     e+=" !PERMISSION_DENIED! " ;
                                                break;
                                                case error.POSITION_UNAVAILABLE:
                                                     e+=" !POSITION_UNAVAILABLE! " ;
                                                break;
                                                case error.UNKNOW_ERROR:
                                                     e+=" !POSITION_UNAVAILABLE! " ;
                                                break;
                                            }
                                            
                                        }
                                        
                                     
                                }else{
                                    alert('nongeo');
                                }
                                
                                return false ;
                       });


  
                
 function onTextarea(){
   
   
              $('.commentTextarea').on('keyup',function(event){
    if (event.keyCode === 13) {
       $(this.form).submit();
       $(this).val("").height(30);
        return false;
     }
     
     while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
        $(this).height($(this).height()+1);
    };
    
    var stext=$(this).val().length;
    if(stext<10){
        $(this).height(30);
    }
});
 }
    
    
    $(".formComment").submit(function(){
       var name = $(this).children('.commentTextarea').val();
    var theid = $(this).attr('data-p-id');
    var dataString = name.trim();

    $.ajax({
        dataType: 'json',
        url: "http://localhost/landing/users/comment/"+theid,
        type: "POST",
        data: "message="+dataString,
        success: function(){
             $("div#comment-list-"+theid).append('<div>'+dataString+'</div>');   
              
        },
        error: function(){
          $("div#comment-list-"+theid).append('<div>bad</div>');
        }
    });
    
    return false;
});
    
   
});