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

rubysquare.view_manager = function(){
    if(this instanceof rubysquare.view_manager){
        //Private
		var views = [];	// not sure if this should really keep a list of available views, might be too complicated for initial functionality
		var current_view;

        //Public
        this.switch_view = function( view, data ){
            console.log(current_view);
			if (typeof view !== 'undefined' && view.hasOwnProperty('bind')){ // TODO this is SOOO not a good typecheck, add more functions that represent a view object's "fingerprint"
                if(typeof current_view !== 'undefined') {
                    current_view.hide();
                    view.show();
                    current_view = view;
                    view.load_content( data );

                    // TODO: need to change the URL to reflect the AJAX-loaded path
                }
				else throw 'the view manager was not initialized, please initialize it before trying to initialize a view';
                // if init wasn't called, then the viewmanager has no knowledge of what the current view is
			}
            else throw 'The supplied argument is not a view object! Please supply a view object.';
        }

        this.hide_current_view = function(){
            current_view.hide();
        }

        this.set_current_view = function( view ){
            current_view = view;
        }

        this.load = function( data ){
            current_view.load( data );
        }

        // this feels kinda redundent
        this.init_view = function( view ){
            if (typeof view !== 'undefined' && view.hasOwnProperty('bind')){  // TODO improve typechecking
                if(typeof current_view !== 'undefined') {
                    current_view.bind();
                }
                else throw 'the view manager was not initialized, please initialize it before trying to initialize a view';
                // if init wasn't called, then the viewmanager has no knowledge of what the current view is
            }
            else throw 'The supplied argument is not a view object! Please supply a view object.';
        }

        this.init = function( view ){
            // TODO add typechecking to this
            current_view = view;
            current_view.bind();
        }
    }
    else return new rubysquare.view_manager();
}

/*
    abstract class view(binds, container_selector, ajax_url){
        Private:
            var container_selector

        Public:
            var binds
            function show()
            function hide()
            function load_content( data ) //data is an optional parameter
            function bind(){
                jsUtil.bind_from_json(this.binds)
            }

    }
*/

rubysquare.view = function( _binds, _container_selector, ajax_url, _playlist_to_update ){
    if(this instanceof rubysquare.view){
        //Private
        var container_selector = _container_selector;
        var self = this;
        var playlist_to_update = _playlist_to_update;

        //Public
		this.binds = _binds;	// TODO: should binds in views be private?

        this.show = function(){
            if (typeof $(container_selector) === 'undefined') {
                $(rubysquare.settings.nodes.main_container).append(container_selector);
            }
            else $(container_selector).show();
        }

        this.hide = function(){
            $(container_selector).hide();
        }

        this.get_container_selector = function(){
            return container_selector;
        }

        this.load_content = function( data ){
            $.ajax({
                url : ajax_url,
                dataType: 'text',
                data: data,
                success : function(data){
                    console.log('View load success!')
                    if ( $(container_selector).length === 0 ) { // check if element exists, create it if it doesnt
                        //the selector string should have an identifier, a hash or period that needs to be removed first
                        //TODO typecheck to see if string has NO prefix identifier
                        $('#view_container').append("<div id='"+container_selector.substring(1) + "'></div>");    //todo: hardcoded view parent (#view_container) for now, fix me.
                        console.log('Created new container');
                    }
                    $(container_selector).empty().append(data);
                    self.bind();

                    //TODO this is still kinda brittle
                    if( $(_container_selector + " " + rubysquare.settings.nodes.song_json).length > 0 ){    // only try to update "available json" if the view actually has any
                        playlist_to_update = rubysquare.helpers.update_json_from_page( _container_selector + " " + rubysquare.settings.nodes.song_json );
                        console.log(_container_selector + " " + rubysquare.settings.nodes.song_json);
                        console.log(playlist_to_update);
                        console.log(rubysquare.playlists.songs_on_page.playlist);
                    }
                }
            });

        }
		
        this.bind = function(){
			jsUtil.bind_from_json( self.binds );
        }
    }
    else return new rubysquare.view( _binds, _container_selector, ajax_url );
}



/*
    sample usage, so far:
    ----------------------------------
    instaniate some views:
        rubysquare.views.playlist = rubysquare.view({
			'selector':'#help',
			'bind_to':'click',
			'func':function(){
				console.log('help'p)
			}
		});


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
