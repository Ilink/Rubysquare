//~ Singleton ~//
rubysquare.helpers = function(){
    var that = {};
    
    //this function may seem specific but its a very general case that encompasses 99% of music-playing behavior
    // TODO: find the best place for this function, i dont know if it belongs as a helper or part of the music class itself
    that.play_from_available = function( music_manager, song_index, available_playlist, now_playing_playlist ){
        now_playing_playlist.copy_from( available_playlist.playlist );
        console.log("attempting to play song at location: " + now_playing_playlist.playlist[song_index].location);
        music_manager.current_index = song_index;
        music_manager.set_song( now_playing_playlist.playlist[song_index].location );
        rubysquare.music.play();
        console.log("now playing playlist:" + now_playing_playlist.playlist);
        // TODO: should update the DB "now playing" playlist at this point
    }

    //this definitely belongs here
    that.update_json_from_page = function(selector){
        return JSON.parse( $(selector).text() );
    }

    return that;
}();