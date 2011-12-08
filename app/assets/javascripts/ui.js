rubysquare.ui.Module = function(container, bind_to){
    if (this instanceof rubysquare.ui.Module){
        // Private
        // Public
        this.bind = function(){
            jsUtil.bind_from_json( bind_to );
        }
    } else return new rubysquare.ui.Module(container, bind_to);
}

rubysquare.ui.module = rubysquare.ui.Module();

rubysquare.ui.slider = function(slider_width, handle, bind_to, callback){
    if(this instanceof rubysquare.ui.slider){
        //Private
        var self = this;

        var handle_slide = function(){
            if(bind_to !== 'mousedown') throw 'only mousedown supported at the moment';
            var timer;
            $(handle).bind(bind_to, function(e){
                var x;
                var parent_offset = $(handle).parent().offset();
                timer = setInterval(function(){
                    x = e.pageX - parent_offset.left;
                }, 500);

                $(handle).css('left','')
                return false;
            });

            $(document).mouseup(function(){
                clearInterval(timer);
                return false;
            });
        }

        //Public
        this.init = function(){
            handle_slide();
        }
    }
    else return new rubysquare.ui.slider(slider_width, handle, bind_to, callback);
}
// inherits the bind function
rubysquare.ui.slider.prototype.bind = rubysquare.ui.module.bind;


//~~ Singleton ~~//
rubysquare.ui.dialog = function(){
    // Private
    var that = {};
    var open = false;

    var close_dialog = function(content_to_close){
        $(content_to_close).hide();
        open = false;
    }

    // Public
    that.show_dialog = function(content_selector, placement_selector, position, close_button_selector){
//        if(open === true) {
//            close_dialog(content_selector);
//            return false
//        }

        open = true;

        //TODO add more positions
        if (position === 'above'){
            var placement_selector_height = $(placement_selector).outerHeight();
            var placement_selector_width = $(placement_selector).width();

            var content_height = $(content_selector).outerHeight();

            $(content_selector).css({
               'position' : 'absolute',
               'display':'block',
               'z-index':'10',
               'left' : $(placement_selector).offset().left - ($(content_selector).outerWidth() / 2) + (placement_selector_width / 2),
               'top' : $(placement_selector).offset().top - content_height - placement_selector_height
            });
        }
        $('body').append( $(content_selector) );

        $(content_selector).children(close_button_selector).click( function(){
            close_dialog(content_selector);
        });
    }
    return that;
}();

rubysquare.ui.brief_message = function(container_selector){
    var that = {};
    // Public
    that.message = function(message){
        var m = $(container_selector).append(message);
        var t = setTimeout(function(){
            m.fadeOut('fast', 0);
        }, 3000)
    }
}();


/*
    This class is called during several aspects of music player interaction. For example, setting a new song

    abstract class music_ui_effects (){
        public:
            highlight_table(song_index, playlist_index)
        private:
    }
 */
rubysquare.ui.Table_highlight = function(settings){
    if (this instanceof rubysquare.ui.Table_highlight){

        this.test = function(song_index, playlist_index, container){
            console.log('test highlight fired');
        }

        this.highlight = function(song_index, playlist_index, container, action_json, class_to_add){
            if(typeof class_to_add === 'undefined'){
                class_to_add = settings['music_highlight_class']; // fallback on the settings if it's not provided explicitly
            }

            if(action_json['unique'] === true){
                $('tr').removeClass(class_to_add); //todo this is kind of brittle, what if the UI uses a non-table layout?
            }

            if(action_json['action'] === 'add') {
                $(container + ' .playlist_container[playlist_index='+playlist_index+'] tr[id='+song_index+']').addClass(class_to_add);
                console.log(container + ' .playlist_container[playlist_index='+playlist_index+'] tr[id='+song_index+']');
                console.log($(container + ' .playlist_container[playlist_index='+playlist_index+'] tr[id='+song_index+']'));
            }
            else if (action_json['action'] === 'remove') {
                $(container + ' .playlist_container[playlist_index='+playlist_index+'] tr[id='+song_index+']').removeClass(class_to_add);
                console.log($(container + ' .playlist_container[playlist_index='+playlist_index+'] tr[id='+song_index+']'));
            }
        }
    }
    else return new rubysquare.ui.Table_highlight(settings);
}

rubysquare.ui.make_sticky = function(selector, location, threshold){
    (function(){ // the extra closure is for these variables
        var former_position = $(selector).css('position');
        var former_top = $(selector).css('top');
        $(window).scroll(function () {
                if($(this).scrollTop() > threshold){
                    $(selector).css({
                        "position" : "fixed",
                        "top" : '0px'
                    });
                }
                if ($(this).scrollTop() < threshold){
                    $(selector).css({
                        "position" : former_position,
                        "top" : former_top
                    });
                }
            });
    })();
}

//~Singleton~//
rubysquare.ui.now_playing_info = (function(){
    var that = {};
    var private = 'i am private';
    that.show = function(json_to_show){

        if (typeof json_to_show.title === 'undefined' ||
            typeof json_to_show.album === 'undefined' ||
            typeof json_to_show.artist === 'undefined'){
                throw 'Argument does not provide artist/title/album properties'
        }

        var node = rubysquare.settings.nodes.now_playing_info;
        $(rubysquare.settings.nodes.seek_slider).show();
        $(node).empty();
        $(node).append(json_to_show.title + "<br/>");
        $(node).append(json_to_show.album + ", " + json_to_show.artist);
    }
    return that;
})();

/*
Valid arguments:
args = {
    'selector':'#jquery_selector_string',
    'container':'#jquery_selector_string',
    'selected_class':'__selected__'         // optional
}
 */

rubysquare.ui.Shift_select = function(arguments){
    if(this instanceof rubysquare.ui.Shift_select){

    }
    else new rubysquare.ui.Shift_select(arguments);
}

/*
    Drag and Drop Stuff
*/

// draggable is on a selector that is only applied to elements currently selected by the mutliselect

