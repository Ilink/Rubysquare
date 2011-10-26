/***************************************
    ~Quack quack!~

    @param settings: specify the settings for the command: this can be either a reference to the settings datastore or the exact setting you want (true or false, etc)
    public interface Command( settings ) {
        public:
            var settings = rubysquare.get_settings();
            function execute()
            function unexecute()
    }

    //this is really more of a Strategy
    abstract class CommandFactory ( settings ) {
        public:
            function execute(){
                if ( settings ) commandA.execute();
                else commandB.execute();
            }
            function unexecute(){
                if ( settings ) commandA.unexecute();
                else commandB.unexecute();
            }
    }
	
	//might refactor to use (something like) this, if things get messier / more complicated
	//that way the factories (strategies) get separated 
	interface Commands() {
		public:
			createCommand('name')	//reads from an enumerated list and then produces the appropriate strategy
	}

    //General setup, for non-singleton objects:
    rubysquare.function = function( arg ){
        if (this instanceof rubysquare.function){
            //implementation
        }
        else return new rubysquare.function( arg );
    }

****************************************/

//TODO: I need something that can feed settings into the command objects. Something like: rubysquare.get_settings();

rubysquare.commands.next_song_straight_command = function( settings ){
    if (this instanceof rubysquare.commands.next_song_straight_command){
        var rand = Math.random();
        this.execute = function(){
            rubysquare.log("next_song_straight + " + rand);
        }
        this.unexecute = function(){
            rubysquare.log('undo next song straight');
            return false;
        }
    }
    else return new rubysquare.commands.next_song_straight_command( settings );
}

rubysquare.commands.next_song_shuffle_command = function( settings ){
    if (this instanceof rubysquare.commands.next_song_shuffle_command){
        var rand = Math.random();
        this.execute = function(){
            rubysquare.log("next_song_straight + " + rand);
        }
        this.unexecute = function(){
            rubysquare.log('undo next song straight');
            return false;
        }
    }
    else return new rubysquare.commands.next_song_shuffle_command( settings );
}

rubysquare.commands.next_song_command_strategy = function( settings ){
    if (this instanceof rubysquare.commands.next_song_command_strategy){
        var _shuffle_setting;
//        if (typeof shuffle_setting != "boolean" && typeof shuffle_setting != "undefined") throw "expected boolean value in argument, instead got " + typeof shuffle_setting;

        if (typeof settings == 'object'){
            _shuffle_setting = settings['shuffle'];
        }
        
        else if (typeof settings == 'boolean') {
            _shuffle_setting = settings;
        }
        
        //TODO abstract me for easier re-use! Might need a more complex version for more complex, undo-able commands
//        //this function allows for fixed or variable use of setting
//        function test_arg(){
//            if (typeof shuffle_setting == 'undefined'){
//                return _shuffle_setting = rubysquare.settings['shuffle'];
//            }
//            else
//                return _shuffle_setting = shuffle_setting;
//        }

        this.execute = function(){
//            _shuffle_setting = test_arg();
            rubysquare.log(_shuffle_setting);
            if (_shuffle_setting){
                rubysquare.commands.next_song_shuffle_command.execute();
            }
            else {
                rubysquare.commands.next_song_straight_command.execute();
            }
        }
        
        this.unexecute = function(){
            _shuffle_setting = test_arg();
            if (_shuffle_setting){
                rubysquare.commands.next_song_shuffle_command.unexecute();
            }
            else {
                rubysquare.commands.next_song_straight_command.unexecute();
            }
        }
    }
    else return new rubysquare.commands.next_song_command_strategy( settings );
}

rubysquare.commands.shuffle_command = (function(){
    return{
       execute : function(){
           //TODO: change shuffle button visuals
           rubysquare.settings['shuffle'] = true //will be an AJAX call to update the database
       },
       unexecute : function(){
           //TODO: revert changes to shuffle button visuals
           rubysquare.settings['shuffle'] = false //AJAX call later...
       }
   }
})();

rubysquare.commands.stop_command = function(){
	this.execute = function(){
		soundManager.stopAll();
	}
	
	this.unexecute = function(){
		return null
		rubysquare.log('The stop command cannot be unexecuted');
	}
}

rubysquare.commands.pause_command = function(){
    if (this instanceof rubysquare.commands.pause_command){
        this.execute = function(){
            soundManager.pauseAll();
        }

        this.unexecute = function(){
            rubysquare.log('The pause command cannot be unexecuted');
            return null;
        }
    }
    else return new rubysquare.commands.pause_command();
}

rubysquare.commands.resume_command = function(){
    if (this instanceof rubysquare.commands.resume_command){
        this.execute = function(){
            soundManager.resumeAll();
        }

        this.unexecute = function(){
            rubysquare.log('The resume command cannot be unexecuted');
            return null;
        }
    }
    else return new rubysquare.commands.resume_command();
}

rubysquare.commands.pause_resume_strategy = function(){
    if (this instanceof rubysquare.commands.pause_resume_strategy){
        var pause = rubysquare.commands.pause_command();
        var resume = rubysquare.commands.resume_command();
        var paused = true;
        this.execute = function(){
            if(paused){
                resume.execute();
                paused = false;
            }
            else {
                pause.execute();
                paused = true;
            }
        }

        this.unexecute = function(){
            rubysquare.log('The pause/resume command cannot be unexecuted');
            return null;
        }
    }
    else return new rubysquare.commands.pause_resume_strategy();
}

//~ Play takes an argument and is therfore a subclass of Command ~//

rubysquare.commands.play = function( song ){

	this.execute = function(){
		
	}
	
	this.unexecute = function(){
		return null
		rubysquare.log('The play command cannot be unexecuted');
	}
}






//~ Tests & Experiments ~//

rubysquare.commands.test_command = function(arg){
    if (this instanceof rubysquare.commands.test_command){
        this.u = Math.random();

        this.execute = function(){
            console.log("executed:" + this.u);
        }

        this.unexecute = function(){
            console.log("unexecuted:" + this.u);
        }

//        rubysquare.log('intialized object');
//        rubysquare.commands.test_command.prototype.help = 'help';
    }
    else{
//        rubysquare.log('made a new object');
        return new rubysquare.commands.test_command(arg);
    }
}

rubysquare.commands.test_command_child = function(arg){
    if (this instanceof rubysquare.commands.test_command_child){
        rubysquare.commands.test_command.call(this, 'tetset');  //call constructor
        this.test_method = function(){
            console.log('test method of child function');
        }
    }
    else{
        return new rubysquare.commands.test_command_child(arg);
    }
}
rubysquare.commands.test_command_child.prototype = rubysquare.commands.test_command.prototype;  //set the prototype: access to methods, properties, etc

