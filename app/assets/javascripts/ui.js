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

rubysquare.ui.slider = function(container, bind_to){
    if(this instanceof rubysquare.ui.slider){

        //Public
        this.init = function(){

        }
    }
    else return new rubysquare.ui.slider(container, bind_to);
}
// inherits the bind function
rubysquare.ui.slider.prototype.bind = rubysquare.ui.module.bind;

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