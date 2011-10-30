rubysquare.ui_manager = function(){
    if (this instanceof rubysquare.ui_manager){
        //this function may seem specific but its a very general case that encompasses 99% of music-playing behavior
        this.play_from_available = function( song_index, available_playlist, now_playing_playlist ){
            now_playing_playlist.copy_from( available_playlist.playlist );
            console.log("attempting to play song at location: " + now_playing_playlist.playlist[song_index].location);
            rubysquare.music.current_index = song_index;
            rubysquare.music.set_song( now_playing_playlist.playlist[song_index].location );
            rubysquare.music.play();
            console.log(now_playing_playlist.playlist);
            // TODO: should update the DB "now playing" playlist at this point
        }
    }
    else return new rubysquare.ui_manager();
}
