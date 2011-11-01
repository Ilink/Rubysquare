/*
    // Not sure what should go in here yet, these are just some ideas
    abstract class view_manager() {
        Private:
            var views = [];
        Public:
            var current_view;
            var current_page;
            function show_view() // ? maybe
            function init_view( view )
    }
*/
rubysquare._view_manager = function( view_name ){
    if(this instanceof rubysquare._view_manager){
        //Private


        //Public
        this.init_view = function( view ){

        }
    }
    else return new rubysquare.view( _view_manager );
}


/*
    abstract class view(){
        Private:

        Public:

    }
*/

rubysquare.view = function( view_name ){
    if(this instanceof rubysquare.view){
        //Private
        binds = {

        }

        //Public
        this.init = function(){

        }
    }
    else return new rubysquare.view( view_name );
}

/*
    sample usage, so far:
    ----------------------------------
    instaniate some views:
        rubysquare.views.playlist =

    first, get the current page, from rendered (by rails) json:
        var view_info = JSON.parse( $('#view_info').text() );
        view_manager.current_page = view_info.current_page;
 */


//    view_manager.init(view)
//
//    view_manager.update_current_view();
//
//    view_manager.current_view = view_manager.get_view(view_manager.current_page)
//    viewmanager.current_view.init();
