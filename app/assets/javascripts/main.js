//~UI Commands~//

rubysquare.commands.next_song_command = rubysquare.commands.next_song_command_strategy();
rubysquare.commands.previous_song_command = rubysquare.commands.previous_song_shuffle_command;

rubysquare.commands.pointers = {
    'next_command' : rubysquare.commands.next_song_command
}

//Objects
rubysquare.pause = rubysquare.commands.pause_command();
//rubysquare.next = rubysquare.commands.
rubysquare.pause_resume = rubysquare.commands.pause_resume_strategy();
rubysquare.music = rubysquare.music_bridge();

//~JSON for bindings~//
rubysquare.ui.bindings = [
    {
        'selector' : rubysquare.ui.nodes['next_button'],
        'bind_to' : 'click',
        'func' : function() {
            var temp = rubysquare.commands.next_song_command_strategy(rubysquare.settings['shuffle']);
            rubysquare.commands.next_song_command.execute();
            rubysquare.commands.next_song_command.unexecute();
            rubysquare.history.command_history.push(temp);
            temp = undefined;   //remove reference so it can be garbage collected
        }
    },
    {
        'selector' : rubysquare.ui.nodes['pause_button'],
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
        'selector' : '.song_location',
        'bind_to' : 'dblclick',
        'func' : function(){
            var clicked_song_location = $(this).text();
            console.log("attempting to play song at location: " + clicked_song_location);
            rubysquare.music.set_song(clicked_song_location);
            rubysquare.music.play();
            //should update the DB "now playing" at this point
        }
    },
    {
        'selector' : '#query',
        'bind_to' : 'keyup',
        'func' : function(){    // TODO: move me when im final
            $.ajax({
                type : "GET",
                url : "songs/search.json",
                data : "query="+$(this).val(),
                success : function( json ){
                    $.each(json, function(index, element){
//                        $('tbody').next().prepend(element['artist']);
                        $('tbody').children('tr').first().nextAll().remove();   // remove old results
                        $('tbody').append("<tr><th style='font-weight:normal;'>"+element['title']+"</th>" +
                            "<th style='font-weight:normal;'>"+element['artist']+"</th>"+
                            "<th style='font-weight:normal;'>"+element['album']+"</th>"+
                            "<th style='font-weight:normal;'>"+element['location']+"</th>"+
                        "</tr>");
                    });
                }
            });
        }
    }
//    ,
//    {
//        'selector' : rubysquare.ui.node_names['previous_button'],
//        'bind_to' : 'click',
//        'func' : rubysquare.commands.previous_song_command.execute
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