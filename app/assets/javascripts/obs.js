/*
shuffle example:
    shuffle has its click function bound to 'shuffle_obs.update'
    the shuffle_obs.update function changes the appropriate commands to reflect the new shuffle setting
    for instance, if shuffle gets turned on, the new command for the "next" button becomes "next_song_random" instead of "next_song_straight"

    shuffle_obs = (function(){
        ret = {};
        ret.update = function(){
            next_song_command = next_song_straight;
        }
        return ret;
    }();

    Or...should the observer get some information? I dont know what information would really be enough for it.
    Well, it needs to know what command to switch and whether or not to switch them

    shuffle_obs = (function(){                                  NO
        ret = {};
        ret.update = function(command, do_i_switch){
            next_song_command = next_song_straight;
        }
        return ret;
    }();

    This means that my 'Settings' JSON data would need to have a very particular set of data, which may be obtuse
    Ideally, the settings file will just call the same Shufle_obs update function

        Rails settings (from DB) -> JSON -> settings.initialize()

    How is settings.initialize() implemented?

    Settings would be something like:
        var Settings = {
            'shuffle' : true,
            'repeat' : false,
            'high-quality' : true
        }

    Bindings would be something like:
        var Bindings = [{
            'selector' : '#next_song',
            'bind_to' : 'click',
            'func' : next_song_command
        }]

    This would get called by global application initializer:
        settings.intialize = function(){
            if (Settings.shuffle){  //defaults to Off
                shuffle_obs.update
            }
        }
*/




/************************************
    ~Quack quack!~
    abstract class Observer {
        public:
            function update()
            function ummmmm
    }
************************************/

//rubysquare.obs.shuffle_observer = (function(){
//    return{
//        update : function ( shuffle_on ){
//            if ( shuffle_on ){
//                rubysquare.commands.next_command = next_song_shuffle_command;
//            }
//            else
//                rubysquare.commands.next_command = next_song_straight_command;
//        }
//    }
//})();