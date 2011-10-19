/***************************************
    ~Quack quack!~
    abstract class Command {
        public:
            function execute()
            function unexecute()
    }
****************************************/

rubysquare.commands.next_song_straight_command = (function(){
    return{
        execute : function(){
            rubysquare.log("next_song_straight");
        },
        unexecute : function(){
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
            return false;
        }
    }
})();

rubysquare.commands.shuffle_command = (function(){
   return{
       execute : function(){
           //TODO: change shuffle button visuals
           rubysquare.settings['shuffle'] = true //will be an AJAX call to update the database
           rubysquare.log(rubysquare.settings['shuffle']);
           
           //eventually this solution won't be good enough - there could be many things calling "next" with a bind. I need a way of storing EVERY instance of a node getting bound to a command
           //this could be within the JSON for bindings, as long as only one selector is used
           //that could get messy too, with more complex selectors
           $(rubysquare.ui.node_names['next_button']).unbind('click', rubysquare.commands.next_song_command.execute); //bindings are closures - have to remove the old one before changing the command
           rubysquare.commands.next_song_command = rubysquare.commands.next_song_shuffle_command;
           $(rubysquare.ui.node_names['next_button']).bind('click', rubysquare.commands.next_song_command.execute);
       },
       unexecute : function(){
           //TODO: revert changes to shuffle button visuals
           rubysquare.settings['shuffle'] = false //AJAX call later...
           rubysquare.log(rubysquare.settings['shuffle']);
           $(rubysquare.ui.node_names['next_button']).unbind('click', rubysquare.commands.next_song_command.execute);  //bindings are closures - have to remove the old one before changing the command
           rubysquare.commands.next_song_command = rubysquare.commands.next_song_straight_command;
           $(rubysquare.ui.node_names['next_button']).bind('click', rubysquare.commands.next_song_command.execute);
       }
   }
})();