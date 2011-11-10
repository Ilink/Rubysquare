rubysquare.ui.slider = function(bind_to, container){
    if(this instanceof rubysquare.ui.slider){

        var bind = function(){

        }

        //Public
        this.init = function(){

        }
    }
    else return new rubysquare.ui.slider(bind_to, container);
}

rubysquare.ui.seek_bar = function(music_bridge, slider){
    if (this instanceof rubysquare.ui.seek_bar){

        //Private

        // Public
        this.seek = function() {
            var percentage = (e.pageX - this.offsetLeft) / $(this).width();
            music_bridge.seek(percentage);
        }

    }
    else return new rubysquare.ui.seek_bar(music_bridge, slider);
}