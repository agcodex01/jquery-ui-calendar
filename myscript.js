$(document).ready(function(){

    var dialog , eventsContainer ;
    var subject     = $('#subject-input');
    var slot        = $('#slot-input');
    var color       = $('#event-color-input');
    var currentSlot = false;
  

    dialog = $( "#dialog" ).dialog({
        autoOpen: false,
        width: 350,
        modal: true,    
        close : function (){
            $('#form-error').text('');
            subject.val('');
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
        accept  : '.events > div',
        classes : {
            "ui-droppable-active": "ui-state-active",
            "ui-droppable-hover": "ui-state-hover"
        },
        drop: function(event,ui){
            $eventsContainer = $(this).find('.events');
            checkDropSlot($eventsContainer,ui.draggable)
        },
    });
 
    function checkDropSlot(e,ui)
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
                $eventList = $(e).length ? $(e) : $(ui).appendTo( $eventList ).fadeIn();
                if($(ui).find('span:first-child').text() == 'PM' ){
                    $(ui).appendTo( $eventList ).fadeIn();
                }else{
                    $(ui).prependTo( $eventList ).fadeIn();
                } 
            });
        }  
    }
    function validateSlot(c){
        console.log($(c).children().length)
        let currentSlot = false;
        let count = 0;
        $(c).children().each(function(){
            console.log($(this).find('span:first-child').text().trim(),slot.val(),count) 
            ++count
            if(count == 2){
                return false;
            } 
            
            return currentSlot = $(this).find('span:first-child').text().trim() == slot.val();
             
                  
        });
        return currentSlot;
    }
    function validateForm (c)
    {
        currentSlot = validateSlot(c);

        if(subject.val() == ''){
            $('#form-error').text('Fill up the form!');
        }else if (currentSlot){
            $('#form-error').text('Slot is taken!');
        }else{
            addEvent(c);
            triggerDragElement();
            triggerChildClick();
            dialog.dialog('close');  
        }   
    }

    function addEvent(c)
    {
        if(slot.val() == 'AM'){
            $(c).prepend('<div class="event " style="background-color:' 
                        + color.val() +';  "> <span>'+ slot.val() +'</span>:  '
                        + subject.val() +'<span class="ui-icon ui-icon-circle-close"></span></div>');
        }else{
            $(c).append('<div class="event " style="background-color:' 
                        + color.val() +' ; "> <span>'+slot.val()+'</span>: '
                        + subject.val() +'<span class="ui-icon ui-icon-circle-close"></span> </div>');
        }    
    }

    function done () 
    {
        validateForm(eventsContainer);    
    }

    function edit(e)
    {   
        subject.val($(e).contents().not($(e).children()).text().replace(/\:\s+/g,''))
        slot.val( $(e).find('span:first-child').text().trim() )
        color.val( rgb2hex( $(e).css('background-color')) )
        dialog.dialog({
            title   : "Edit Event",
            buttons :{
                Edit : function(){ 
                    $(e).css('background-color',color.val());
                    let currentSlot = validateSlot($(e).parent());
                    console.log(currentSlot);
                    if(!currentSlot){
                        $(e).html(`<span>${slot.val()}</span>: ${subject.val()}<span class="ui-icon ui-icon-circle-close"></span>`);
                        triggerChildClick();
                        $(this).dialog("close")
                    }else{
                        $('#form-error').text('Slot is taken!');    
                    }                
                }
            }
        });
        dialog.dialog("open");
        
    }
    // One click for td
    // $('td').click(function(){
    //     eventsContainer = $(this).find('.events');
    //     dialog.dialog({
    //         title   : "Add Event",
    //         buttons : {
    //             Done : done    
    //         }
    //     })
    //     dialog.dialog("open"); 
        
    // });

    // I prefer the double click sir.
    $('td').dblclick(function(){
        eventsContainer = $(this).find('.events');
        dialog.dialog({
            title   : "Add Event",
            buttons : {
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

    var hexDigits = new Array
        ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

    //Function to convert rgb color to hex format
    function rgb2hex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    function hex(x) {
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }

});