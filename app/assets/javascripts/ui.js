rubysquare.ui_manager = function(){
    if (this instanceof rubysquare.ui_manager){
        this.play_from_available = function( available_playlist, now_playing_playlist ){
            available_playlist.copy_from( now_playing_playlist );
            var clicked_song_location = $(this).text();
            console.log("attempting to play song at location: " + clicked_song_location);
            rubysquare.music.set_song(clicked_song_location);
            rubysquare.music.play();
            // TODO: should update the DB "now playing" at this point
        }
    }
    else return new rubysquare.ui_manager();
}