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
            }
            else if (action_json['action'] === 'remove') {
                $(container + ' .playlist_container[playlist_index='+playlist_index+'] tr[id='+song_index+']').removeClass(class_to_add);
                console.log($(container + ' .playlist_container[playlist_index='+playlist_index+'] tr[id='+song_index+']'));
            }


        }
    }
    else return new rubysquare.ui.Table_highlight(settings);
}