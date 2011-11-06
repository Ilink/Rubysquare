//function get_next_chunk( json ){
//    request_url = json['request_url'];
//    chunk_size = json['chunk_size'];
//    which_chunk = json['which_chunk'];
//
//}

//function rubysquare.ajax_manager.display_search_result( json ){
//    var that;
////    that.
//}

rubysquare.ajax_manager = function(){
    if (this instanceof rubysquare.ajax_manager){
        // Private
        var timer;
        var self = this;

        // Public
//        this.search_timer = function( query, playlist_to_update ){
//            clearTimeout(timer);
//            timer = setTimeout(function() {
//              self.search(query, playlist_to_update);
//              console.log('searched');
//            }, 200);
//        }

        this.search_timer = function( query, view ){
            clearTimeout(timer);
            timer = setTimeout(function() {
              view.load_content("query="+query);
              console.log('searched');
            }, 200);
        }

//        this.search = function( query, playlist_to_update ){
//            $.ajax({
//                type : "GET",
//                url : "songs/search.xml",
//                data : "query="+query,
//                dataType: 'text',
//                success : function( html ){
//                    $('#music_list_container').contents().remove(); // remove old list of music
//                    $(rubysquare.settings.nodes.song_json).remove();   // remove old songs on page json
//                    $('#music_list_container').append(html);
//
//                    playlist_to_update.playlist = rubysquare.helpers.update_json_from_page(); // update json with our new search results
//                    $(rubysquare.ui.bindings[4].selector).bind(rubysquare.ui.bindings[4].bind_to, rubysquare.ui.bindings[4].func);  //rebind the old bindings for title, see above JSON
//                   //TODO improve re-binding process, this is repetitive. Or use jquery delegate. Add an argument for the binds to update?
//                }
//            });
//        }

        this.search = function( query, view, container_selector ){
            $.ajax({
                type : "GET",
                url : "songs/search.xml",
                data : "query="+query,
                dataType: 'text',
                success : function( html ){
                    $(container_selector).contents().remove(); // remove old list of music
                    $(rubysquare.settings.nodes.song_json).remove();   // remove old songs on page json
                    $('#music_list_container').append(html);
                }
            });
        }
    }
    else return new rubysquare.ajax_manager();
}