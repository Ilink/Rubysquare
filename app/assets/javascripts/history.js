//TODO where does a typical call to push onto history go? (cannot go in a command object, obviously)

//~ Singleton, unless I decide to try different types of datastructures ~//
rubysquare.history = (function() {
    var iterator = -1;   //marks the "present" command, the last command issued
    var end = -1;
    var start = -1;
    var max_size = 3;
    var command_history = [];   //array to store all the commands
    return {
        //TODO if this method isnt fast enough, I can try a linkedlist or an array shift
        add : function( command ) {
            if( end >= (max_size - 1) ) {    //assuming the client wants max_size in terms of '# of elements' not 'size of base-0 array'
                command_history[start] = undefined;     //we need to let the unused data (the oldest commands) get garbage collected
                start++, end++; //move the array onwards so we can ignore + safely delete the oldest command in history
                iterator = end; //move the iterator to the front when a new command is added
                command_history.push(command);
                console.log('trying to remove earliest command');
//                console.log("@ method add() ::: arr val: " + command_history[iterator] + ", iterator val: " + iterator);
            }
            else {
                end++;
                if (start == -1) start = 0;
                iterator = end;
                command_history.push(command);
//                console.log("@ method add() ::: arr val: " + command_history[iterator] + ", iterator val: " + iterator);
            }
        },
        undo : function() {
            if (iterator == (start-1)) return null
            else {
                if (iterator == end + 1) iterator = end;
                if (iterator >= start) {
                    command_history[iterator].unexecute();
                    iterator--;
                    console.log("iter:" + iterator);
                }
            }
        },
        redo : function() {
            if (iterator == (end+1)) return null
            else {
                if (iterator <= end) {
                    iterator++;
                    console.log("iter: " + iterator);
                }
                if (iterator <= end) {
                    command_history[iterator].execute();
                }
            }
        },
        logger : function() {
            console.log("start: " + start + " end: " + end);
        }
    }
})();