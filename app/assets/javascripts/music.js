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

