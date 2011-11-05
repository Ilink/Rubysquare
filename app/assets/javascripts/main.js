//~ (undoable) Commands ~//

//~ Playlists ~//
rubysquare.playlists.songs_on_page = rubysquare.playlist([{
    'prop':'val',
    'prop2':'val2',
    'location':'test/test/tes.mp3'
}]);
rubysquare.playlists.now_playing = rubysquare.playlist();

//~ Objects ~//
rubysquare.music = rubysquare.music_bridge(rubysquare.settings, rubysquare.playlists.now_playing);
rubysquare.ui = rubysquare.ui_manager();
rubysquare.ajax = rubysquare.ajax_manager();



//~ JSON for bindings, for Songs view, TEMP ~//
rubysquare.ui.songs_bindings = [
    {
        'selector' : '#songs_view .song_location, #songs_view .song_title', // This is temporary since i have to figure out the UI before i know what the strucutre of the links will be
        'bind_to' : 'dblclick',
        'func' : function() {
            var song_index = Number($(this).parent('tr').attr('id'));
            rubysquare.helpers.play_from_available(rubysquare.music, song_index, rubysquare.playlists.songs_on_page, rubysquare.playlists.now_playing);
        }
    },
    {
        'selector' : '#query',
        'bind_to' : 'keyup',
        'func' : function() {
            var query = $(this).val();
            rubysquare.ajax.search_timer(query, rubysquare.playlists.songs_on_page);
            
        }
    }
];

//~ JSON for playlist view bindings, TEMP ~//
rubysquare.ui.playlist_bindings = [
    {
        'selector' : '#playlists_view .song_title, #playlist_view .song_location', // This is temporary since i have to figure out the UI before i know what the strucutre of the links will be
        'bind_to' : 'dblclick',
        'func' : function() {
            var song_index = Number($(this).parent('tr').attr('id'));
            rubysquare.helpers.play_from_available(rubysquare.music, song_index, rubysquare.playlists.songs_on_page, rubysquare.playlists.now_playing);

        }
    }
];

rubysquare.ui.common_bindings = [
    {
        'selector' : '#nav_playlist',
        'bind_to' : 'click',
        'func' : function(){
            rubysquare.views.views_manager.switch_view( rubysquare.views.playlists );
            return false;  // prevents the default action
        }
    },
    {
        selector : '#nav_songs',
        bind_to : 'click',
        func : function(){
            rubysquare.views.views_manager.switch_view( rubysquare.views.songs );
            return false; // prevents default action
        }
    },
    {
        'selector' : rubysquare.settings.nodes['next_button'],
        'bind_to' : 'click',
        'func' : function() {
            if( typeof rubysquare.playlists.now_playing.playlist !== 'undefined'){
                rubysquare.music.next(rubysquare.settings, rubysquare.playlists.now_playing.playlist);
            }
            else
                rubysquare.log('no songs specified! please add something to the que')
        }
    },
    {
        'selector' : rubysquare.settings.nodes['previous_button'],
        'bind_to' : 'click',
        'func' : function() {
            if( typeof rubysquare.playlists.now_playing.playlist !== 'undefined'){
                rubysquare.music.previous(rubysquare.settings, rubysquare.playlists.now_playing.playlist)
            }
            else
                rubysquare.log('no songs specified! please add something to the que')
        }
    },
    {
        'selector' : rubysquare.settings.nodes['pause_button'],
        'bind_to' : 'click',
        'func' : rubysquare.music.pause_or_resume
    },
    {
        'selector' : '#test',
        'bind_to' : 'click',
        'func' : function() {
//            console.log(rubysquare.playlists.now_playing);
            console.log('test');
        }
    }
];

//~ View Objects, these reference above JSON (for now) ~//

rubysquare.views.songs = rubysquare.view(rubysquare.ui.songs_bindings, '#songs_view', '/songs.xml');  // temp, hardcoded, needs to be flexible
rubysquare.views.views_manager = rubysquare.view_manager();
//rubysquare.views.playlists = rubysquare.view(
//    [{
//        'selector':'#playlist_test_link',
//        'bind_to':'click',
//        'func':function(){
//            console.log('test node in playlist view was clicked');
//        }
//    }], '#playlist_view', '/playlists.xml');
rubysquare.views.playlists = rubysquare.view(rubysquare.ui.playlist_bindings, '#playlists_view', '/playlists.xml');


$(document).ready(function(){
    //~Temp Binds~//
    $('#shuffle').click(function(){
        if(rubysquare.settings['shuffle']) {
            rubysquare.commands.shuffle_command.unexecute();
            rubysquare.log(rubysquare.settings['shuffle']);
        }
        else {
            rubysquare.commands.shuffle_command.execute();
            rubysquare.log(rubysquare.settings['shuffle']);
        }
    });

    $('#undo').click(function(){
       for(var i = 0; i < rubysquare.history.command_history.length; i++){
           rubysquare.history.command_history[i].unexecute();
       }
    });

    rubysquare.playlists.songs_on_page.playlist = rubysquare.helpers.update_json_from_page(rubysquare.settings.nodes.song_json);
    console.log(rubysquare.playlists.songs_on_page.playlist);

//    jsUtil.bind_from_json(rubysquare.ui.bindings);
    jsUtil.bind_from_json(rubysquare.ui.common_bindings);

    //there needs to be json that tells me what view i'm currently on...
    rubysquare.views.views_manager.init( rubysquare.views.songs );


     //hardcode current view for now


//    rubysquare.views.views_manager.init_view( rubysquare.views.songs);
//    rubysquare.views.views_manager.switch_view( rubysquare.views.playlists );




//    var test = rubysquare.commands.test_command('test');
//    var test2 = rubysquare.commands.test_command('test2');
//
//    test.execute();
//
//    test.logger = function(){
//        console.log('testefdsafdsafds');
//    }
//
//    test.constructor.prototype.test = 'test proto val'
//
//    var child = rubysquare.commands.test_command_child();
//    child.test_method();
//    child.execute();
//
//    console.log("\n\n\n");
//
//    for(var i=0; i < 10; i++){
//        console.log(i);
//        var temp = rubysquare.commands.test_command();
//        temp.execute();
//        rubysquare.history.add(temp);
//    }
//
//    console.log("\n\n\n");
//
//    rubysquare.history.logger();
//
//    for(var i=0; i < 10; i++){
//        rubysquare.history.undo();
//    }
//
//    rubysquare.history.logger();
//
//    for(var i=0; i < 10; i++){
//        rubysquare.history.redo();
//    }
//
//    rubysquare.history.logger();
//
//    for(var i=0; i < 10; i++){
//        rubysquare.history.undo();
//    }
//
//    rubysquare.history.logger();
//
//    for(var i=0; i < 10; i++){
//        rubysquare.history.redo();
//    }
//
//    rubysquare.history.logger();


    $("#fling").click(flingable);

    

//~Soundmanager Testing~//

//	soundManager.onready(function() {
//	 	rubysquare.song = soundManager.createSound({
//			id: 'song',
//			url: 'assets/test.mp3',
//			// optional sound parameters here, see Sound Properties for full list
//			volume: 50,
//			autoPlay: false
//		});	//end create sound
//
//		rubysquare.music.set_song('assets/test.mp3')
//
//        rubysquare.music.play();
//		rubysquare.music.pause();
//        // soundManager.pauseAll();
//        if(soundManager.loaded){
//
//
//        }
//
//
//
//	});	//end ready statement

});