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
        this.switch_view = function( view ){
			if (typeof view !== 'undefined' && view.hasOwnProperty('bind')){ // TODO this is SOOO not a good typecheck, add more functions that represent a view object's "fingerprint"
                if(typeof current_view !== 'undefined') {
                    console.log(current_view.binds);
                    current_view.hide();
                    view.show();
                    current_view = view;
                    view.load_content();
                    console.log(current_view.binds);
                    view.bind();
                    // TODO: need to change the URL to reflect the AJAX-loaded path
                }
				else throw 'the view manager was not initialized, please initialize it before trying to initialize a view';
                // if init wasn't called, then the viewmanager has no knowledge of what the current view is
			}
            else throw 'The supplied argument is not a view object! Please supply a view object.';
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
    abstract class view(binds, container_selector){
        Private:
            var container_selector

        Public:
            var binds
            function show()
            function hide()
            function load_content()
            function bind(){
                jsUtil.bind_from_json(this.binds)
            }

    }
*/

rubysquare.view = function( _binds, _container_selector, ajax_url ){
    if(this instanceof rubysquare.view){
        //Private
        var container_selector = _container_selector;

        //Public
		this.binds = _binds;	// TODO: should binds in views be private?

        this.show = function(){
            if (typeof $(container_selector) === 'undefined'){
                $(rubysquare.settings.nodes.main_container).append(container_selector);
            }
            else $(container_selector).show();
        }

        this.hide = function(){
            $(container_selector).hide();
        }

        this.load_content = function(){
            $.ajax({
                url : ajax_url,
                success : function(json){
                    console.log('test ajax success');
                    console.log(json);
                }
            });
        }
		
        this.bind = function(){
			jsUtil.bind_from_json( this.binds );
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
