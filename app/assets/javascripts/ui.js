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
rubysquare.ui.Table_highlight = function(){
    if (this instanceof rubysquare.ui.Table_highlight){
        this.test = function(song_index, playlist_index){
            console.log('test highlight fired');
        }

        this.highlight = function(song_index, playlist_index){
            // get the row of the current song of the current playlist
        }
    }
    else return new rubysquare.ui.Table_highlight();
}