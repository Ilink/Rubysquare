//~ (undoable) Commands ~//

//~ Playlists ~//
rubysquare.playlists.songs_on_page = rubysquare.playlist([{
    'prop':'val',
    'prop2':'val2',
    'location':'test/test/tes.mp3'
}]);
rubysquare.playlists.now_playing = rubysquare.playlist();

//~ Objects ~//
rubysquare.pause = rubysquare.commands.pause_command();
rubysquare.pause_resume = rubysquare.commands.pause_resume_strategy();
rubysquare.music = rubysquare.music_bridge(rubysquare.settings, rubysquare.playlists.now_playing);
rubysquare.ui = rubysquare.ui_manager();

//rubysquare.ajax = rubysquare.ajax_manager();



//~ JSON for bindings ~//
rubysquare.ui.bindings = [
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
            console.log(rubysquare.playlists.now_playing);
        }
    },
    {
        'selector' : '.song_location, .song_title', // This is temporary since i have to figure out the UI before i know what the strucutre of the links will be
        'bind_to' : 'dblclick',
        'func' : function() {
            var song_index = Number($(this).parent('tr').attr('id'));
            rubysquare.ui.play_from_available(song_index, rubysquare.playlists.songs_on_page, rubysquare.playlists.now_playing);
        }
    },
    {
        'selector' : '#query',
        'bind_to' : 'keyup',
        'func' : function() {    // TODO: move/refactor search AJAX when final
            $.ajax({
                type : "GET",
                url : "songs/search.json",
                data : "query="+$(this).val(),
                beforeSend : function(){
                    $('tbody').children('tr').first().nextAll().remove();   // remove old results
                },
                success : function( json ){
                    $.each(json, function(index, element){
                        $('tbody').append("<tr id='" + index + "'><td class='song_title' style='font-weight:normal;'>"+element['title']+"</td>" +
                            "<td class='song_artist' style='font-weight:normal;'>"+element['artist']+"</td>"+
                            "<td class='song_album' style='font-weight:normal;'>"+element['album']+"</td>"+
                            "<td class='song_location' style='font-weight:normal;'>"+element['location']+"</td>"+
                        "</tr>");
                        rubysquare.playlists.songs_on_page.playlist = json; // update the "currently available songs" with the data from our search results
                        console.log(rubysquare.playlists.songs_on_page.playlist);
                        $(rubysquare.ui.bindings[4].selector).bind(rubysquare.ui.bindings[4].bind_to, rubysquare.ui.bindings[4].func);  //rebind the old bindings for title, see above JSON
                        //TODO improve re-binding process, this is repetitive
                    });
                }
            });
        }
    }
];


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

    rubysquare.playlists.songs_on_page.playlist = JSON.parse( $('#song_json').text() );
    console.log( rubysquare.playlists.songs_on_page );

    jsUtil.bind_from_json(rubysquare.ui.bindings);


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