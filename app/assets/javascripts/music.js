//~Quack Quack!~//
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

rubysquare.music_bridge = function( settings, playlist_manager ) {
    if (this instanceof rubysquare.music_bridge) {
        // Private
		var song = soundManager.createSound({
			id: 'song',
			url: ''
		});

        // Public
        this.current_index; //TODO: figure out if this is a good way to set this

        this.set_song = function( url ) {
			if (typeof url !== 'string') throw 'Exepected resource to be a string';
            if( song ) {
				song.destruct();
				rubysquare.log("song destroyed");
			}
			else rubysquare.log("no current song, making a new song...");
			song = soundManager.createSound({
				id: 'song',
				url: '/'+url
			});
        }

		this.next = function( settings ) {
            var playlist = playlist_manager.get_playlist(); // This is neccesary because of the way JS references work. References do not refer to other references, they refer to data itself.
                                                            // Therefore, when we make a copy of the playlist within a playlist manager, the pointer within this object would still point to the old data.
            if (settings['shuffle']){
				//shuffle logic here
                console.log('shuffle next goes here');
                song.play();
			}
            else {
                console.log(this.current_index);
                if ( typeof playlist[this.current_index + 1] !== 'undefined' ){
                    this.current_index = this.current_index + 1;
                    if ( playlist[this.current_index].hasOwnProperty('location') )
                        this.set_song( playlist[this.current_index].location );
                    song.play();
                }
            }
		}
		
		this.previous = function( settings ) { //this should never shuffle - previous song is always fixed
            var playlist = playlist_manager.get_playlist();
            if (this.current_index - 1 > -1) {
                this.current_index = this.current_index - 1;
                console.log(this.current_index);
                this.set_song(playlist[this.current_index].location);
                song.play();
            }
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
		
    }
    else return new rubysquare.music_bridge( settings, playlist_manager );
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

		// Public
        this.playlist = json;

        this.get_playlist = function(){
            return this.playlist
        }

        this.copy_from = function( to_copy ){
            this.playlist = $.extend( {}, to_copy ); // essentially this merges argument with a blank object and returns a new one
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