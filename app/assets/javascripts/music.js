//~Quack Quack!~//
/*
	
*/

rubysquare.music.title_click_handler = function( song ){
	song = soundManager.createSound({
		id: 'song',
		url: 'assets/test.mp3'
		// optional sound parameters here, see Sound Properties for full list
		//volume: 50,
		//autoPlay: false        	
	});

	song.play();
}

//~Quack Quack!~//
/*
    //Calling this a bridge because its implementation is in terms of a music player API (such as SoundManager)
    //this will help if we ever need a different music player library
    abstract class Music_bridge( settings )
        private:
            var song;
        public:
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

rubysquare.music_bridge = function( settings ) {
    if (this instanceof rubysquare.music_bridge) {
        // Private
		var song = soundManager.createSound({
			id: 'song',
			url: ''
		});

        // Public
        this.get_song = function() {
            return song;
        }

        this.set_song = function( url ) {
			if (typeof url != 'string') throw 'Exepected resource to be a string';
            if(song) {
				song.destruct();
				rubysquare.log("song destroyed");
			}
			else rubysquare.log("no current song, making a new song...");
			song = soundManager.createSound({
				id: 'song',
				url: url
			});
        }

		this.next = function( settings, playlist ) {
			console.log('next song placeholder')
			if (settings['shuffle']){
				//shuffle logic here
			}
			song.play();
		}
		
		this.previous = function( settings, playlist ) {
			console.log('previous song placeholder');
		}
		
		this.play = function() {
			song.play();
		}
		
		this.pause_or_resume = function() {
			if (song.paused) song.resume();
			else song.pause();
		}
		
		this.pause = function() {
			song.pause();
		}
		
		this.resume = function() {
			song.resume();
		}
		
    }
    else return new rubysquare.music_bridge( settings );
}

/*
	Notes:
	how to handle the clicks on Artist, Title, etc? 
	Need a playlist management class that can deal with playlist actions
	
	playlist = [
		{
			'id' : database_song_id,
			'url' : 'assets/songs/song.mp3',
			'artist' : 'some artist',
			'album' : 'some album',
			etc etc, basically all the important DB fields will probably go here
		}
	]
	
	alternatively, we could use a "light" playlist and simply query the DB every time we need more information about a song
	
	light_playlist = [
		{
			'id' : database_song_id,
			'url' : 'assets/songs/song.mp3'
		}
	]
	
	I don't know if having to run another query just for more song informaiton is worth the trade off. Playlists aren't likely to get that big anyways.
	
	Or there can just be two strategies: if the playlist is above a certain size (like if they try to shuffle the whole library) then we use an AJAX based system
	that can chunk data
	
	ORRR data can always be chunked up and sent out via AJAX calls
*/

rubysquare.playlist_manager = function(){
	if (this instanceof rubysquare.playlist){
		// Private
		var playlist = [{}];
		// Public
		this.add = function( url ){
			playlist.push( url );
		}
	}
	else return new rubysquare.playlist_manager();
}

