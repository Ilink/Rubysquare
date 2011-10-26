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
    //I call this a bridge because it connects to a library that handles music player functionality
    //this will help if we ever need a different music player library
    abstract class Music_bridge( settings )
        private:
            var song;
        public:
            function get_song(){
                return song;
            }
            function set_song()
*/

rubysquare.music_bridge = function( settings ){
    if (this instanceof rubysquare.music_bridge){
        // Private
        var song = soundManager.createSound();

        // Public
        this.get_song = function(){
            return song;
        }
        this.set_song = function(){
            
        }
    }
    else return new rubysquare.music_bridge( settings );
}