rubysquare.history = (function(){
    return{
        add : function(command){
            if(!rubysquare.history.command_history.length >= 10)
                rubysquare.history.command_history.push(command);
            //other stuff needs to happen, this is not just a wrapper for array.push
            //TODO make the command reset the iterator to the front of the history array (stack)
        },
        remove : function(){
            rubysquare.history.command_history.pop;
            //other stuff needs to happen to ensure you can redo/undo, this is not just a wrapper for array.pop
            //TODO make the command move the iterator rather than actually removing an element...or something
        }
    }
})();