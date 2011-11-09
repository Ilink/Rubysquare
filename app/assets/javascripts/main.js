//~ (undoable) Commands ~//

//~ Playlists ~//
rubysquare.playlists.songs_on_page = rubysquare.playlist();
rubysquare.playlists.now_playing = rubysquare.playlist();
rubysquare.playlists.all_on_page = [];

//~ Objects ~//
rubysquare.music = rubysquare.music_bridge(rubysquare.settings, rubysquare.playlists.now_playing);
rubysquare.ui = rubysquare.ui_manager();
rubysquare.ajax = rubysquare.ajax_manager();



//~ JSON for bindings, for Songs view, TEMP ~//
rubysquare.ui.songs_bindings = [
    {
        'selector' : '#songs_view .song_location, #songs_view .song_title', // This is temporary since i have to figure out the UI before i know what the strucutre of the links will be
        'bind_to' : 'dblclick',
        'func' : function() {
            var song_index = Number($(this).parent('tr').attr('id'));
            rubysquare.helpers.play_from_available(rubysquare.music, song_index, rubysquare.playlists.all_on_page[0], rubysquare.playlists.now_playing);
        }
    }
];

rubysquare.ui.search_bindings = [
    {
        'selector' : '#search_view .song_location, #search_view .song_title', // This is temporary since i have to figure out the UI before i know what the strucutre of the links will be
        'bind_to' : 'dblclick',
        'func' : function() {
            var song_index = Number($(this).parent('tr').attr('id'));
            rubysquare.helpers.play_from_available(rubysquare.music, song_index, rubysquare.playlists.all_on_page[0], rubysquare.playlists.now_playing);
        }
    }
];

//~ JSON for playlist view bindings, TEMP ~//
rubysquare.ui.playlist_bindings = [
    {
        'selector' : '#playlists_view .song_title, #playlists_view .song_location', // This is temporary since i have to figure out the UI before i know what the strucutre of the links will be
        'bind_to' : 'dblclick',
        'func' : function() {
            var playlist_index = $(this).parents('.playlist_container').attr('playlist_index');
            console.log(playlist_index);
            var song_index = Number($(this).parent('tr').attr('id'));
            rubysquare.helpers.play_from_available(rubysquare.music, song_index, rubysquare.playlists.all_on_page[playlist_index], rubysquare.playlists.now_playing);

        }
    }
];

//~ JSON for now playing view bindings, TEMP ~//
rubysquare.ui.now_playing_bindings = [
    {
        'selector' : '#now_playing_view .song_title, #now_playing_view .song_location', // This is temporary since i have to figure out the UI before i know what the strucutre of the links will be
        'bind_to' : 'dblclick',
        'func' : function() {
            var song_index = Number($(this).parent('tr').attr('id'));
            rubysquare.helpers.play_from_available(rubysquare.music, song_index, rubysquare.playlists.all_on_page[0], rubysquare.playlists.now_playing);

        }
    }
];

rubysquare.ui.common_bindings = [
    {
        'selector' : '#nav_playlist',
        'bind_to' : 'click',
        'func' : function(){
            rubysquare.views.views_manager.switch_view( rubysquare.views.playlists );
            return false;  // prevents the default action
        }
    },
    {
        selector : '#nav_songs',
        bind_to : 'click',
        func : function(){
            rubysquare.views.views_manager.switch_view( rubysquare.views.songs );
            return false; // prevents default action
        }
    },
    {
        selector : '#nav_now_playing',
        bind_to : 'click',
        func : function(){
            rubysquare.views.views_manager.switch_view( rubysquare.views.now_playing );
            return false; // prevents default action
        }
    },
    {
        'selector' : rubysquare.settings.nodes['next_button'],
        'bind_to' : 'click',
        'func' : function() {
            if( typeof rubysquare.playlists.now_playing.playlist !== 'undefined'){
                rubysquare.music.next(rubysquare.settings, rubysquare.playlists.now_playing.playlist);
            }
            else
                rubysquare.log('no songs specified! please add something to the que')
        }
    },
    {
        'selector' : rubysquare.settings.nodes['previous_button'],
        'bind_to' : 'click',
        'func' : function() {
            if( typeof rubysquare.playlists.now_playing.playlist !== 'undefined'){
                rubysquare.music.previous(rubysquare.settings, rubysquare.playlists.now_playing.playlist)
            }
            else
                rubysquare.log('no songs specified! please add something to the que')
        }
    },
    {
        'selector' : rubysquare.settings.nodes['pause_button'],
        'bind_to' : 'click',
        'func' : rubysquare.music.pause_or_resume
    },
    {
        'selector' : '#query',
        'bind_to' : 'keyup',
        'func' : function() {
            rubysquare.views.views_manager.hide_current_view();
            rubysquare.views.search.show();
            rubysquare.views.views_manager.set_current_view( rubysquare.views.search );
            var query = $(this).val();
            rubysquare.ajax.search_timer( query, rubysquare.views.search );
        }
    },
    {
        'selector' : '#test',
        'bind_to' : 'click',
        'func' : function() {
            rubysquare.helpers.update_now_playing_db_entries( rubysquare.playlists.songs_on_page.get_playlist() );
        }
    }
];

//~ View Objects, these reference above JSON (for now) ~//

rubysquare.views.views_manager = rubysquare.view_manager();
//rubysquare.views.songs = rubysquare.view(rubysquare.ui.songs_bindings, '#songs_view', '/songs.xml', rubysquare.playlists.songs_on_page.playlist);  // temp, hardcoded, needs to be flexible
//rubysquare.views.playlists = rubysquare.view(rubysquare.ui.playlist_bindings, '#playlists_view', '/playlists.xml', rubysquare.playlists.songs_on_page.playlist);
//rubysquare.views.now_playing = rubysquare.view(rubysquare.ui.now_playing_bindings, '#now_playing_view', '/songs/now_playing.xml', rubysquare.playlists.songs_on_page.playlist);
//rubysquare.views.search = rubysquare.view(rubysquare.ui.search_bindings, '#search_view', '/songs/search.xml', rubysquare.playlists.songs_on_page.playlist );

rubysquare.views.songs = rubysquare.view(rubysquare.ui.songs_bindings, '#songs_view', '/songs.xml', rubysquare.playlists.all_on_page );  // temp, hardcoded, needs to be flexible
rubysquare.views.playlists = rubysquare.view(rubysquare.ui.playlist_bindings, '#playlists_view', '/playlists.xml', rubysquare.playlists.all_on_page );
rubysquare.views.now_playing = rubysquare.view(rubysquare.ui.now_playing_bindings, '#now_playing_view', '/songs/now_playing.xml', rubysquare.playlists.all_on_page );
rubysquare.views.search = rubysquare.view(rubysquare.ui.search_bindings, '#search_view', '/songs/search.xml', rubysquare.playlists.all_on_page );


$(document).ready(function(){
    //~Temp Binds~//
    $('#shuffle').click(function(){
        if(rubysquare.settings['shuffle']) {
            rubysquare.commands.shuffle_command.unexecute();
            rubysquare.log(rubysquare.settings['shuffle']);
        }
        else {
            rubysquare.commands.shuffle_command.execute();
            rubysquare.log(rubysquare.settings['shuffle']);
        }
    });

    $('#undo').click(function(){
       for(var i = 0; i < rubysquare.history.command_history.length; i++){
           rubysquare.history.command_history[i].unexecute();
       }
    });



    //~ Assign all JSON sent by the server to a playlist ~//
    $(rubysquare.settings.nodes.song_json).each(function(index, value){
       rubysquare.playlists.all_on_page[index] = rubysquare.playlist();
       rubysquare.playlists.all_on_page[index].playlist = rubysquare.helpers.parse_json(value);
       console.log(rubysquare.playlists.all_on_page[index].playlist);
        console.log('test');
    });



//    rubysquare.playlists.songs_on_page.playlist = rubysquare.helpers.parse_json(rubysquare.settings.nodes.song_json);
//    console.log(rubysquare.playlists.songs_on_page.playlist);

    jsUtil.bind_from_json(rubysquare.ui.common_bindings);

    //todo: move me into the helper class
    var initial_view = rubysquare.helpers.parse_json(rubysquare.settings.nodes.initial_page);
    initial_view = initial_view.initial_view;
    if(initial_view === 'songs') rubysquare.views.views_manager.init( rubysquare.views.songs );
    else if(initial_view === 'playlist') { rubysquare.views.views_manager.init( rubysquare.views.playlists ); console.log('playlist view');}
    else if(initial_view === 'search') { rubysquare.views.views_manager.init( rubysquare.views.search ); console.log('search view'); }
    else if(initial_view === 'now_playing') { rubysquare.views.views_manager.init( rubysquare.views.now_playing ); console.log('now playing view')}




     //hardcode current view for now


//    rubysquare.views.views_manager.init_view( rubysquare.views.songs);
//    rubysquare.views.views_manager.switch_view( rubysquare.views.playlists );




//    var test = rubysquare.commands.test_command('test');
//    var test2 = rubysquare.commands.test_command('test2');
//
//    test.execute();
//
//    test.logger = function(){
//        console.log('testefdsafdsafds');
//    }
//
//    test.constructor.prototype.test = 'test proto val'
//
//    var child = rubysquare.commands.test_command_child();
//    child.test_method();
//    child.execute();
//
//    console.log("\n\n\n");
//
//    for(var i=0; i < 10; i++){
//        console.log(i);
//        var temp = rubysquare.commands.test_command();
//        temp.execute();
//        rubysquare.history.add(temp);
//    }
//
//    console.log("\n\n\n");
//
//    rubysquare.history.logger();
//
//    for(var i=0; i < 10; i++){
//        rubysquare.history.undo();
//    }
//
//    rubysquare.history.logger();
//
//    for(var i=0; i < 10; i++){
//        rubysquare.history.redo();
//    }
//
//    rubysquare.history.logger();
//
//    for(var i=0; i < 10; i++){
//        rubysquare.history.undo();
//    }
//
//    rubysquare.history.logger();
//
//    for(var i=0; i < 10; i++){
//        rubysquare.history.redo();
//    }
//
//    rubysquare.history.logger();


    $("#fling").click(flingable);


});