/*
    ~Quack quack!~
    abstract class Command {
        public:
            function execute()
            function unexecute()
    }
*/

rubysquare.commands.next_song_straight_command = (function(){
    return{
        execute : function(){
            console.log("next_song_straight");
        },
        unexecute : function(){
            return false;
        }
    }
})();

rubysquare.commands.next_song_shuffle_command = (function(){
    return{
        execute : function(){
            console.log("next_song_shuffle");
        },
        unexecute : function(){
            return false;
        }
    }
})();