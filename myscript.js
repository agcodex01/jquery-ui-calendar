$(document).ready(function(){

    var subject     = $('#subject-input');
    var slot        = $('#slot-input');
    var color       = $('#event-color-input');
    var currentSlot = false;
  

    var dialog = $('#dialog').dialog({
        autoOpen : false,
    });

  
    $('.event').draggable();
    $('.events').droppable();
    $( "#draggable" ).draggable({ revert: true });


    function validateForm (c)
    {
        console.log('validate active')
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
            $('#form-error').text('');
            dialog.dialog('close');  
        }
          
    }

    function addEvent(c)
    {
        console.log('addevnt active')
        if(slot.val() == 'AM'){
            $(c).prepend('<div class="event ui-draggable ui-draggable-handle" style="background-color:' + color.val() +'; padding:10px; "> <span>'+slot.val()+'</span> : '+ subject.val() +'<span class="ui-icon ui-icon-circle-close"></span></div>');
        }else{
            $(c).append('<div class="event ui-draggable ui-draggable-handle" style="background-color:' + color.val() +' ; padding:10px;"> <span>'+slot.val()+'</span> : '+ subject.val() +'<span class="ui-icon ui-icon-circle-close"></span></div>');
        }
       
    }

    function done (c) 
    {
        console.log('done active')
        validateForm(c);    
    }

    function open(container)
    {
        dialog.dialog("open");
        dialog.dialog({
            buttons :{
                Done : function(){
                   done(container)
                },   
            }
        }); 
    }


    $('td').click(function()
    {
        console.log('parent')
        
        let eventsContainer = $(this).find('.events');

        open(eventsContainer);
    });


    $('.event').click(function(e){

        e.stopPropagation(); //or return false;
        console.log('icon click')
        
        // $(this).parent().remove();
        
    });

   
    // $('td ').children('div.events div').click(function (ev) {
    //         console.log('childen');
    //         $(this).remove()
    //         ev.stopPropagation(); //or return false;
    // });

    //     // $('#childContainer2').click(function () {

    //     //     console.log('child container 2');

    //     // }); 
    $('.parent').click(function(){
        console.log('parent click');
    });

    $('.child').click(function(e){
        // e.stopPropagation()
        console.log('child click')
    })
    $('.an').click(function(e){
        e.stopPropagation()
        console.log('an click')
    })

});