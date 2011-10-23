/***************************************
    ~Quack quack!~

    abstract class Command () {
        public:
            function execute()
            function unexecute()
    }

    //this is really more of a Strategy
    abstract class CommandFactory ( settings ) {
        var _settings = settings;
        //allow the constructor to optionally specify the settings the factory logic depends on
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

****************************************/

rubysquare.commands.next_song_straight_command = (function(){
    var rand = Math.random();
    return{
        execute : function(){
            rubysquare.log("next_song_straight + " + rand);
        },
        unexecute : function(){
            rubysquare.log('undo next song straight');
            return false;
        }
    }
})();

rubysquare.commands.next_song_shuffle_command = (function(){
    return{
        execute : function() {
            rubysquare.log("next_song_shuffle");
        },
        unexecute : function(){
            rubysquare.log("undo next song shuffle");
            return false;
        }
    }
})();

rubysquare.commands.next_song_command_factory = function( shuffle_setting ){
    if (this instanceof rubysquare.commands.next_song_command_factory){
        var _shuffle_setting;
        if (typeof shuffle_setting != "boolean" && typeof shuffle_setting != "undefined") throw "expected boolean value in argument, instead got " + typeof _shuffle_setting;

        //TODO abstract me for easier re-use! Might need a more complex version for more complex, undo-able commands
        //this function allows for fixed or variable use of setting
        function test_arg(){
            if (typeof shuffle_setting == 'undefined'){
                return _shuffle_setting = rubysquare.settings['shuffle'];
            }
            else
                return _shuffle_setting = shuffle_setting;
        }

        this.execute = function(){
            _shuffle_setting = test_arg();
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
    else {
        return new rubysquare.commands.next_song_command_factory( shuffle_setting );
    }
}

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

//TODO: make me change only the setting
rubysquare.commands.shuffle_command = (function(command_pointer){
    var command_pointer = command_pointer;
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