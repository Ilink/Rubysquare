//~ Singleton ~//
rubysquare.helpers = function(){
    var that = {};

    // TODO: find the best place for this function, i dont know if it belongs as a helper or part of the music class itself
    that.play_from_available = function( music_manager, song_index, available_playlist, now_playing_playlist ){
        now_playing_playlist.copy_from( available_playlist.playlist );
        console.log("attempting to play song at location: " + now_playing_playlist.playlist[song_index].location);
        music_manager.current_index = song_index;
        music_manager.set_song( now_playing_playlist.playlist[song_index].location );

        that.update_now_playing_db_entries( now_playing_playlist.get_playlist() );

        rubysquare.music.play();
        console.log("now playing playlist:" + now_playing_playlist.playlist);
        // TODO: should update the DB "now playing" playlist at this point
    }

    that.update_now_playing_db_entries = function( playlist ){
        var data = "now_playing=true&playlist[title]=__now_playing__";
        $.each(playlist, function(index, value){
            data = data + "&song_ids[]="+ playlist[index].id;
        });

        console.log(data);
        $.ajax({
            type: 'POST',
            url: '/songs/update_now_playing',
//            data: "playlist[title]=__now_playing__&song_ids[]=2",
            data: data,
            success: function(){
                console.log('updated now playing playlist');
            }
        });
    }

    that.update_json_from_page = function(selector){
        if ( $(selector).text() !== '' )    // TODO: this typecheck isnt right, fix it
            return JSON.parse( $(selector).text() );
    }

    return that;
}();