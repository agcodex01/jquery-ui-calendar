$(document).ready(function(){
    var dialog , eventsContainer ;
    var eventContainer = $('td .events');
    var subject     = $('#subject-input');
    var slot        = $('#slot-input');
    var color       = $('#event-color-input');
    var currentSlot = false;
  

    dialog = $( "#dialog" ).dialog({
        autoOpen: false,
        width: 350,
        modal: true,
        
        close : function (){
            $('#form-error').text('')
        }
      });

  
   
    function triggerDragElement(){
        $('.event').draggable({
            revert : true,
            helper : "clone",
            cursor: "move",
            
        });
    }
    
 
    
   
    $('td').droppable({
        accept  : '.events > div' ,
        classes : {
            "ui-droppable-active": "ui-state-active",
            "ui-droppable-hover": "ui-state-hover"
        },
        drop: function(event,ui){
            $eventsContainer = $(this).find('.events');
            checkSlot($eventsContainer,ui.draggable)
        },
    });

    

    function checkSlot(e,ui)
    {
        var eventslot = false;
        $(e).children().each(function(){
            if($(this).find('span:first-child').text() == $(ui).find('span:first-child').text() ){  
                eventslot =  true;   
            }                
        });
        ui.draggable({
            revert : eventslot
        })
        
        if(!eventslot){
            $(ui).fadeOut(function(){
                var $eventList = $(e).length ? $(e) : $(ui).appendTo( $eventList ).fadeIn();
             
                if($(ui).find('span:first-child').text() == 'PM' ){
                    $(ui).appendTo( $eventList ).fadeIn();
                }else{
                    $(ui).prependTo( $eventList ).fadeIn();
                } 
            });
        }  
    }

    function validateForm (c)
    {
        $(c).children().each(function(){
            if($(this).find('span').text() == slot.val()){
                currentSlot = true;         
            }     
        });
        if(subject.val() == '')
        {
            $('#form-error').text('Fill up the form!');
        }
        else if (currentSlot)
        {
            $('#form-error').text('Slot is taken!');
            currentSlot = false;
        }
        else
        {
            addEvent(c);
            triggerDragElement();
            triggerChildClick();
            $('#form-error').text('');
            dialog.dialog('close');  
        }
          
    }


    function addEvent(c)
    {
        if(slot.val() == 'AM')
        {
            $(c).prepend('<div class="event " style="background-color:' + color.val() +';  "> <span>'+slot.val()+' </span>:  '+ subject.val() +'<span class="ui-icon ui-icon-circle-close"></span></div>');
        
        }else{
            $(c).append('<div class="event " style="background-color:' + color.val() +' ; "> <span>'+slot.val()+'</span>: '+ subject.val() +'<span class="ui-icon ui-icon-circle-close"></span> </div>');
        }
       
    }

    function done () 
    {
        validateForm(eventsContainer);    
    }

    function edit(e)
    {
         
        subject.val($(e).contents().not($(e).children()).text().replace(':  ',''))
        slot.val($(e).find('span:first-child').text().trim())
        color.val($(e).css('background-color')) 
        $(subject).val()
        dialog.dialog("open");
        dialog.dialog({
            buttons:{
                Edit : function(){
                    console.log($(e).text('new'))
                    $(e).contents().not($(e).children()).text('new text')
                    $(this).dialog("close")
                }
            }
        })
        
    }
  
    $('td').dblclick(function(){
        eventsContainer = $(this).find('.events');
        dialog.dialog({
            buttons: {
                Done : done    
            }
        })
        dialog.dialog("open"); 
        
    });
  
    function triggerChildClick()
    {
        $('.event span.ui-icon').click(function(e){
            $(this).parent().remove();
        });

        $('.event').click(function(e){
            
            edit(this);
        });
    }

});