//~ Fling! ~//
// Mini library for dragging and dropping stuff

//pseudo, proof of concept

var current_selection = {};

//TODO: make me into a singleton
var flingable = function(){
    var mouse_is_down;
    var mouse_movement_handler = function(){
        console.log("mouse moved!")
        
    }

    var mouse_down_handler = function(){
        if( mouse_is_down ){
            $(window).mousemove(mouse_movement_handler);
        }
    }
    
    $(this).mousedown(function(){
       mouse_is_down = true;
       mouse_down_handler();
       console.log(mouse_is_down);
    });
    
    $(window).mouseup(function(){
       mouse_is_down = false;
       $(window).unbind('mousemove', mouse_movement_handler);
       console.log(mouse_is_down);
    });
}