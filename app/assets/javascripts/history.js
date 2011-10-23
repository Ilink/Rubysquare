//TODO where does a typical call to push onto history go? (cannot go in a command object, obviously)

//~Singleton!~//
rubysquare.history = (function(){
    var iterator = -1;   //marks the "present" command, the last command issued
    var end = -1;
    var start = -1;
    var max_size = 3;
    var command_history = [];   //array to store all the commands
    return{
        //TODO if this method isnt fast enough, I can try a linkedlist or an array shift
        add : function( command ){
            if( end >= (max_size - 1) ) {    //assuming the client wants max_size in terms of # of elements'
                command_history[start] = undefined;
                start++, end++; //move the array onwards so we can ignore + safely delete the oldest command in history
                iterator = end; //move the iterator to the front
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
        undo : function(){
            if (iterator == start) return null
            else {
//                command_history[iterator].unexecute();
                iterator--;
                console.log("@ method undo() ::: arr val: " + command_history[iterator] + ", iterator val: " + iterator);
            }
        },
        redo : function(){
            if (iterator == end) return null
            else {
                iterator++;
                console.log("@ method redo() ::: arr val: " + command_history[iterator] + ", iterator val: " + iterator);
//                command_history[iterator].execute();
            }
        },
        logger : function(){
            console.log(command_history);
            console.log(start)
            console.log(end)
        }
    }
})();


//To keep track of the array, it seems that a linked list would be nice...able to remove the end as the list exceeds 10
//pointers to keep track of the end of the list as well as the head (which would correspond to present)
//head = present, tail = oldest
//upon removing an object from the tail, delete it!

rubysquare.linkedlist = function(){
    this.push = function(){

    }

    this.pop = function(){
        
    }
}