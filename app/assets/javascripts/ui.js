rubysquare.ui.Module = function(container, bind_to){
    if (this instanceof rubysquare.ui.Module){
        // Private
        // Public
        this.bind = function(){
            jsUtil.bind_from_json( bind_to );
        }
    } else return new rubysquare.ui.Module(container, bind_to);
}

rubysquare.ui.module = rubysquare.ui.Module();

rubysquare.ui.slider = function(container, bind_to){
    if(this instanceof rubysquare.ui.slider){

        //Public
        this.init = function(){

        }
    }
    else return new rubysquare.ui.slider(container, bind_to);
}
// inherits the bind function
rubysquare.ui.slider.prototype.bind = rubysquare.ui.module.bind;

// Singleton
rubysquare.ui.table_highlight = function(selector){
    if (this instanceof rubysquare.ui.table_highlight){

    }
    else return new rubysquare.ui.table_highlight(selector);
}