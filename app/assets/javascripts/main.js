//~UI Commands~//

rubysquare.commands.next_song_command = rubysquare.commands.next_song_command_strategy();
rubysquare.commands.previous_song_command = rubysquare.commands.previous_song_shuffle_command;

rubysquare.commands.pointers = {
    'next_command' : rubysquare.commands.next_song_command
}

//Command Objects
rubysquare.pause = rubysquare.commands.pause_command();
//rubysquare.next = rubysquare.commands.
rubysquare.pause_resume = rubysquare.commands.pause_resume_strategy();

//~JSON for bindings~//
rubysquare.ui.bindings = [
    {
        'selector' : rubysquare.ui.nodes['next_button'],
        'bind_to' : 'click',
        'func' : function(){
            var temp = rubysquare.commands.next_song_command_strategy(rubysquare.settings['shuffle']);
            rubysquare.commands.next_song_command.execute();
            rubysquare.commands.next_song_command.unexecute();
            rubysquare.history.command_history.push(temp);
//            temp = undefined;   //remove reference so it can be garbage collected
        }
    },
    {
        'selector' : rubysquare.ui.nodes['pause_button'],
        'bind_to' : 'click',
        'func' : rubysquare.pause_resume.execute
//        'func' : function(){
//            if(test){
//                soundManager.resumeAll();
//                paused = true;
//            }
//            else{
//                soundManager.pauseAll();
//                paused = false;
//            }
//        }
    },
    {
        'selector' : '#test',
        'bind_to' : 'click',
        'func' : function(){
            rubysquare.song.stop();
            console.log(rubysquare.song);
            rubysquare.song.destruct();
            rubysquare.song = soundManager.createSound({
                id: 'song',
                url: 'assets/test.mp3',
                // optional sound parameters here, see Sound Properties for full list
                volume: 50,
                autoPlay: false
            });	//end create sound
            rubysquare.song.play();
        }
    }
//    ,
//    {
//        'selector' : rubysquare.ui.node_names['previous_button'],
//        'bind_to' : 'click',
//        'func' : rubysquare.commands.previous_song_command.execute
//    }
];

//rubysquare.commands.test_command = function(){
//        console.log('test');
//    }





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
        
//        rubysquare.history.command_history.push(rubysquare.commands.shuffle_command((rubysquare.commands.next_song_command)));

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

        rubysquare.song.play();
        soundManager.pauseAll();
        if(soundManager.loaded){


        }



	});	//end ready statement

});