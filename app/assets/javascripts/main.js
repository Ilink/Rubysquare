//~UI Commands~//

rubysquare.commands.next_song_command = rubysquare.commands.next_song_command_strategy();
rubysquare.commands.previous_song_command = rubysquare.commands.previous_song_shuffle_command;

rubysquare.commands.pointers = {
    'next_command' : rubysquare.commands.next_song_command
}

//~ Objects ~//
rubysquare.pause = rubysquare.commands.pause_command();
rubysquare.pause_resume = rubysquare.commands.pause_resume_strategy();
rubysquare.music = rubysquare.music_bridge();
rubysquare.ui = rubysquare.ui_manager();


//~ Playlists ~//
rubysquare.playlists.songs_on_page = rubysquare.playlist();
rubysquare.playlists.now_playing = rubysquare.playlist();
//rubysquare.ajax = rubysquare.ajax_manager();

//var func1 = function(){
//    console.log('test222');
//}
//
//var func2 = function(){
//    console.log('tes1fdsa');
//}

//~JSON for bindings~//
rubysquare.ui.bindings = [
    {
        'selector' : rubysquare.settings.nodes['next_button'],
        'bind_to' : 'click',
        'func' : function() {
            rubysquare.music.next(rubysquare.settings, 'test');
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
			rubysquare.music.set_song('assets/test.mp3')
			rubysquare.music.play();
        }
    },
    {   // This is temporary since i have to figure out the UI before i know what the strucutre of the links will be
        // This just plays the url of the clicked song.
        'selector' : '.song_location, .song_title',
        'bind_to' : 'dblclick',
        'func' : rubysquare.ui.play_from_available
    },
    {
        'selector' : '#query',
        'bind_to' : 'keyup',
        'func' : function(){    // TODO: move/refactor me when im final
            $.ajax({
                type : "GET",
                url : "songs/search.json",
                data : "query="+$(this).val(),
                success : function( json ){
                    $.each(json, function(index, element){
//                        $('tbody').next().prepend(element['artist']);
                        $('tbody').children('tr').first().nextAll().remove();   // remove old results
                        $('tbody').append("<tr id='" + index + "'><th class='song_title' style='font-weight:normal;'>"+element['title']+"</th>" +
                            "<th class='song_artist' style='font-weight:normal;'>"+element['artist']+"</th>"+
                            "<th class='song_album' style='font-weight:normal;'>"+element['album']+"</th>"+
                            "<th class='song_location' style='font-weight:normal;'>"+element['location']+"</th>"+
                        "</tr>");
                        $('.song_title').bind('dblclick',function(){
                            
                        });
                    });
                }
            });
        }
    }
//    ,
//    {
//        'selector' : rubysquare.settings.nodes['next_button'],
//        'bind_to' : 'click',
//        'func' : [
//            func1, func2
//        ]
//    }
//    ,
//    {
//        'selector' : rubysquare.ui.node_names['previous_button'],
//        'bind_to' : 'click',
//        'func' : rubysquare.music.previous(rubysquare.settings, 'test');
//    }
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

    jsUtil.bind_from_json(rubysquare.ui.bindings);


    var test = rubysquare.commands.test_command('test');
    var test2 = rubysquare.commands.test_command('test2');

    test.execute();
    
    test.logger = function(){
        console.log('testefdsafdsafds');
    }
    
    test.constructor.prototype.test = 'test proto val'

    var child = rubysquare.commands.test_command_child();
    child.test_method();
    child.execute();
    
    console.log("\n\n\n");

    for(var i=0; i < 10; i++){
        console.log(i);
        var temp = rubysquare.commands.test_command();
        temp.execute();
        rubysquare.history.add(temp);
    }

    console.log("\n\n\n");

    rubysquare.history.logger();

    for(var i=0; i < 10; i++){
        rubysquare.history.undo();
    }

    rubysquare.history.logger();

    for(var i=0; i < 10; i++){
        rubysquare.history.redo();
    }

    rubysquare.history.logger();

    for(var i=0; i < 10; i++){
        rubysquare.history.undo();
    }

    rubysquare.history.logger();

    for(var i=0; i < 10; i++){
        rubysquare.history.redo();
    }

    rubysquare.history.logger();


    $("#fling").click(flingable);

    

	//~Soundmanager Testing~//

	soundManager.onready(function() {
	 	rubysquare.song = soundManager.createSound({
			id: 'song',
			url: 'assets/test.mp3',
			// optional sound parameters here, see Sound Properties for full list
			volume: 50,
			autoPlay: false
		});	//end create sound

		rubysquare.music.set_song('assets/test.mp3')
		
        rubysquare.music.play();
		rubysquare.music.pause();
        // soundManager.pauseAll();
        if(soundManager.loaded){


        }



	});	//end ready statement

});