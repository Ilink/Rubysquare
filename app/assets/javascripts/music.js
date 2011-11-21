/*
    //Calling this a bridge because its implementation is in terms of a music player API (such as SoundManager)
    //this will help if we ever need a different music player library
    abstract class Music_bridge( settings )
        private:
            var song;
        public:
            var current_song // current index of the playlist in question
            function get_song(){
                return song;
            }
            function set_song( file_identifier ) //in most cases, file_identifier will be a URL
			function pause()
			function resume()
			function play()
			function stop()
			function next()
			function previous()
*/

rubysquare.music_bridge = function( settings, playlist_manager, ui_state, ui_effects, callbacks) {
    if (this instanceof rubysquare.music_bridge) {
        // Private
        var song_id = 'song';
		var song = soundManager.createSound({
			id: song_id,
			url: ''
		});
        var self = this;
        var has_highlight_object = false;

        console.log(ui_state);

        if(typeof ui_effects !== 'undefined'){
            has_highlight_object = true;
        }

        // Public
//        this.current_song_index = ;

        this.set_song = function( url ) {
			if (typeof url !== 'string') throw 'Exepected resource (URL) to be a string';
            if( song ) {
				song.destruct();
				rubysquare.log("song destroyed");
			}
			else rubysquare.log("no current song, making a new song...");
			song = soundManager.createSound({
				id: 'song',
//				url: '/'+url, //for now i need to use external urls, which dont need that slash
                url: url,
                onfinish: function(){
                    self.next( settings );
                },
                whileplaying:function(){
                    if(typeof callbacks['seek'] !== 'undefined')
                        var percent_position
                        if(this.loaded) {
                            percent_position = (this.position / this.duration) * 100;
                        } else {
                            percent_position = (this.position / this.durationEstimate) * 100;
                        }
                        callbacks.seek(percent_position);
                }
			});
        }

		this.next = function( settings ) {
            var playlist = playlist_manager.get_playlist(); // This is neccesary because of the way JS references work. References do not refer to other references, they refer to data itself.
                                                            // Therefore, when we make a copy of the playlist within a playlist manager, the pointer within this object would still point to the old data.

            if (settings['shuffle']){
				//shuffle logic here
                console.log('shuffle next goes here');  //todo add shuffle
//                next_callback();
                song.play();
			}
            else {
                console.log(ui_state['currently_playing'].song_index);
//                ui_effects.highlight(ui_state['currently_playing'].song_index, ui_state['currently_playing'].playlist_index, ui_state['currently_playing'].container, {'action':'remove'});
                if ( typeof playlist[ ui_state['currently_playing'].song_index + 1 ] !== 'undefined' ) {
                    ui_state['currently_playing'].song_index = ui_state['currently_playing'].song_index + 1;
                    if ( playlist[ui_state['currently_playing'].song_index].hasOwnProperty('location') )
                        this.set_song( playlist[ui_state['currently_playing'].song_index].location );
                    song.play();
                    ui_effects.highlight(ui_state['currently_playing'].song_index, ui_state['currently_playing'].playlist_index, ui_state['currently_playing'].container, {'action':'add', 'unique':true});
                }
            }
		}
		
		this.previous = function( settings ) { // this should never shuffle - previous song is always fixed
            var playlist = playlist_manager.get_playlist();
            if (ui_state['currently_playing'].song_index - 1 > -1) {
                ui_state['currently_playing'].song_index = ui_state['currently_playing'].song_index - 1;
                console.log(ui_state['currently_playing'].song_index);
                if ( playlist[ui_state['currently_playing'].song_index].hasOwnProperty('location') )
                    this.set_song(playlist[ui_state['currently_playing'].song_index].location);
                song.play();
                ui_effects.highlight(ui_state['currently_playing'].song_index, ui_state['currently_playing'].playlist_index, ui_state['currently_playing'].container, {'action':'add', 'unique':true});
            }
		}

        this.seek = function( percentage ){
            var pos;
            if(song.loaded){
                pos = (percentage/100) * song.duration;   // value is truncated if the song isnt loaded
            }
            else {
                pos = (percentage/100) * song.durationEstimate;
            }

            song.setPosition( pos );
        }
		
		this.play = function() {
			song.play();
		}
		
		this.pause_or_resume = function() {
			if (song.paused) song.resume(); // TODO type check this, it throws an error if you hit pause when there is no song queued
			else song.pause();
		}
		
		this.pause = function() {
			song.pause();
		}
		
		this.resume = function() {
			song.resume();
		}

        this.set_volume = function( volume ){
            if(typeof volume !== 'number') throw "Requires number";
            if(volume > 100 || volume < 0) throw "Argument out of range - requires 0 to 100";
            if (soundManager.getSoundById(song_id)){
                soundManager.setVolume( song_id, volume );
                console.log(volume + " is the volume for currently playing")
            } else {
                song['volume'] = volume;
                console.log(volume + " is the volume for prepared song")
            }
        }
		
    }
    else return new rubysquare.music_bridge( settings, playlist_manager, ui_state, ui_effects, callbacks );
}

rubysquare.music_wrapper = function(){
    if (this instanceof rubysquare.music_wrapper) {

        // Public
        this.load_song = function(){

        }

        this.play = function( song ) {
            rubysquare.song_manager.get_song.pause();
        }

        this.pause = function( song ) {
            rubysquare.song_manager.get_song.pause();
        }
    }
    else return new rubysquare.music_wrapper();
}

rubysquare.soundmanager_song_manager = function(){
    if (this instanceof rubysquare.soundmanager_song_manager){
        // Private
        var self = this;
        var song;

        // Public
        /* Callbacks example:
            {
                while_playing : [
                    func1, func2, func3
                ],
                on_finish : [ ... ]
            }
         */
        this.new_song = function(url, callbacks){
//            if (typeof callbacks === "undefined") callbacks = rubysquare.default_song_callbacks;
            song = soundManager.createSound({
                id: 'song',
//				url: '/'+url, //for now i need to use external urls, which dont need that slash
                url: url,
                onfinish: function(){
                    if(typeof callbacks['on_finish'] !== 'undefined') {
                        $.each(callbacks['on_finish'], function(index, value){
                            value();
                        });
                    }
                },
                whileplaying:function(){
                    if(typeof callbacks['while_playing'] !== 'undefined') {
                        $.each(callbacks['while_playing'], function(index, value){
                            value();
                        });
                    }
                }
            });
        }
    }
    else return new rubysquare.soundmanager_song_manager();
}


/*
    abstract class playlist() {
        private:
            var playlist = [];
        public:
            function copy(){

            }
    }
 */

rubysquare.playlist = function( json ){
	if (this instanceof rubysquare.playlist){
		// Private
        var self = this;

		// Public
        this.playlist = json;

        this.get_playlist = function(){
            return this.playlist
        }

        this.set_playlist = function( new_data ){
            self.playlist = new_data;
        }

        this.copy_from = function( to_copy ){
            this.playlist = $.extend( {}, to_copy );
        }

	}
	else return new rubysquare.playlist( json );
}

/*
    This class may or may not get used, it feels redundent
    abstract class playlist_loader(){
        public:
            function load()
    }
*/

rubysquare.playlist_loader = function(playlist, music_manager){
    this.load = function(index, playlist_to_load){
        
    }
}

rubysquare.playlist_from_json_loader = function(playlist){
    
}