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
			if (typeof view !== 'undefined' && view.hasOwnProperty('bind')){ // TODO this is SOOO not a good typecheck, add more functions that represent a view object's "fingerprint"? Not sure
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

rubysquare.view = function( _binds, container_selector, ajax_url, playlist_to_update ){
    if(this instanceof rubysquare.view){
        //Private
        var self = this;
        var ui_modules = [];
//        if(typeof playlist_to_update)

        //Public
		this.binds = _binds;	// TODO: should binds in views be private?

        this.show = function(){
            if (typeof $(container_selector) === 'undefined') {
                $(rubysquare.settings.nodes.main_container).append(container_selector);
            }
            else $(container_selector).show();
        }

        this.attach_ui_module = function( module ){
            ui_modules.push(module);
        }

        this.hide = function(){
            $(container_selector).hide();
        }

        this.get_container_selector = function(){
            return container_selector;
        }

        this.bind_ui_modules = function(){
            $.each(ui_modules, function(index, module){
                module.init();
            });
        }

        this.load_content = function( data ){
            console.log(typeof playlist_to_update);
            $.ajax({
                url : ajax_url,
                dataType: 'text',
                data: data,
                success : function(data){
                    console.log('View AJAX load success!')
                    if ( $(container_selector).length === 0 ) { // check if element exists, create it if it doesnt
                        //the selector string should have an identifier, a hash or period that needs to be removed first
                        //TODO typecheck to see if string has NO prefix identifier
                        $('#view_container').append("<div id='"+container_selector.substring(1) + "'></div>");    //todo: hardcoded view parent (#view_container) for now, fix me.
                        console.log('Created new container');
                    }
                    $(container_selector).empty().append(data);
                    self.bind();
                    self.bind_ui_modules();

                    //TODO this is still kinda brittle
                    if( $(container_selector + " " + rubysquare.settings.nodes.song_json).length > 0 ){    // only try to update "available json" if the view actually has any
                        //TODO move this so it can be re-used during initialization
                        $($(container_selector + " " + rubysquare.settings.nodes.song_json)).each(function(index, value){
                            playlist_to_update[index] = rubysquare.playlist();
                            playlist_to_update[index].playlist = rubysquare.helpers.parse_json(value);
                            console.log(playlist_to_update[index].playlist);
                        });
                    }
                }
            });
        }
		
        this.bind = function(){
			jsUtil.bind_from_json( self.binds );
        }
    }
    else return new rubysquare.view( _binds, container_selector, ajax_url, playlist_to_update );
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
