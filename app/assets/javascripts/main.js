//~ (undoable) Commands ~//

//~ Playlists ~//
rubysquare.playlists.songs_on_page = rubysquare.playlist();
rubysquare.playlists.now_playing = rubysquare.playlist();
rubysquare.playlists.all_on_page = [];

//~ Callbacks ~//
rubysquare.music_callbacks = {
    'seek':function( seek_val ){
//        console.log(seek_val);
        $('#seek_slider').slider({ 'value': seek_val });
    },
    'now_playing':function(song_info_json){
        console.log(song_info_json);
        rubysquare.ui.now_playing_info.show(song_info_json);
    }
}



//~ Objects ~//
rubysquare.ui.table_highlight = rubysquare.ui.Table_highlight(rubysquare.settings);
rubysquare.music = rubysquare.music_bridge(rubysquare.settings, rubysquare.playlists.now_playing, rubysquare.ui_state, rubysquare.ui.table_highlight, rubysquare.music_callbacks);
rubysquare.ajax = rubysquare.ajax_manager();
rubysquare.song_manager = rubysquare.soundmanager_song_manager();
rubysquare.views.views_manager = rubysquare.view_manager(rubysquare.ui_state, rubysquare.ui.table_highlight);

rubysquare.music_wrapper = rubysquare.Music_wrapper(soundManager);
rubysquare.song_manager = rubysquare.soundmanager_song_manager();

//~ Initialize (some) Objects ~//
rubysquare.song_manager.init


//~ JSON for bindings, for Songs view, TEMP ~//
// TODO refactor these bindings, they are very very repetitive
rubysquare.ui.songs_bindings = [
    {
        'selector' : '#songs_view .song_location, #songs_view .song_title', // This is temporary since i have to figure out the UI before i know what the strucutre of the links will be
        'bind_to' : 'dblclick',
        'func' : function() {

            var song_index = Number($(this).parent('tr').attr('id'));
            console.log(song_index);
            var playlist_index = $(this).parents('.playlist_container').attr('playlist_index');
            console.log(playlist_index);
            rubysquare.helpers.play_from_available(rubysquare.music, song_index, rubysquare.playlists.all_on_page[0], rubysquare.playlists.now_playing, playlist_index, '#songs_view', rubysquare.ui_state);
            rubysquare.ui.table_highlight.highlight(song_index, playlist_index, '#songs_view', {"action":"add", "unique": true});
        }
    },
    {
        'selector' : '.new_playlist_link',
        'bind_to' : 'click',
        'func' : function(){
            rubysquare.ui.dialog.show_dialog('#new_playlist_dialog', $(this), "above", '.close');
            return false;
        }
    }
];

rubysquare.ui.search_bindings = [
    {
        'selector' : '#search_view .song_location, #search_view .song_title', // This is temporary since i have to figure out the UI before i know what the strucutre of the links will be
        'bind_to' : 'dblclick',
        'func' : function() {
            var song_index = Number($(this).parent('tr').attr('id'));
            var playlist_index = $(this).parents('.playlist_container').attr('playlist_index');
            rubysquare.ui.table_highlight.highlight(song_index, playlist_index, '#search_view', {"action":"add", "unique": true});
            rubysquare.helpers.play_from_available(rubysquare.music, song_index, rubysquare.playlists.all_on_page[0], rubysquare.playlists.now_playing, playlist_index, '#playlists_view', rubysquare.ui_state);
        }
    },
    {
        'selector' : '.new_playlist_link',
        'bind_to' : 'click',
        'func' : function(){
            rubysquare.ui.dialog.show_dialog('#new_playlist_dialog', $(this), "above", '.close');
            return false;
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
            console.log("playlist:" + playlist_index);
            var song_index = Number($(this).parent('tr').attr('id'));
            rubysquare.helpers.play_from_available(rubysquare.music, song_index, rubysquare.playlists.all_on_page[playlist_index], rubysquare.playlists.now_playing, playlist_index, '#playlists_view', rubysquare.ui_state);
            rubysquare.ui.table_highlight.highlight(song_index, playlist_index, '#playlists_view', {"action":"add", "unique": true});
        }
    },
    {
        'selector' : '.new_playlist_link',
        'bind_to' : 'click',
        'func' : function(){
            rubysquare.ui.dialog.show_dialog('#new_playlist_dialog', $(this), "above", '.close');
            return false;
        }
    },
    {
        'selector':'.playlist_title',
        'bind_to' : 'dblclick',
        'func' : function(){
            var song_index = 0;
            var playlist_index = $(this).attr('data-playlist_index');
            rubysquare.ui.table_highlight.highlight(song_index, playlist_index, '#playlists_view', {"action":"add", "unique": true});
            rubysquare.helpers.play_from_available(rubysquare.music, song_index, rubysquare.playlists.all_on_page[playlist_index], rubysquare.playlists.now_playing, playlist_index, '#playlist_view', rubysquare.ui_state);
            return false;
        }
    },
    {
        'selector':'.destroy_playlist',
        'bind_to' : 'ajax:complete',
        'func' : function(xhr, status) {
            rubysquare.views.views_manager.reload();
            $(this).parent().append('Removed playlist');
        }
    },
    {
        'selector':'#new_playlist',
        'bind_to' : 'ajax:complete',
        'func' : function(xhr, status) {
            console.log('test');
            rubysquare.ui.brief_message.message('Playlist created!');
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
            var playlist_index = $(this).parents('.playlist_container').attr('playlist_index');
            rubysquare.helpers.play_from_available(rubysquare.music, song_index, rubysquare.playlists.all_on_page[0], rubysquare.playlists.now_playing, playlist_index, '#now_playing_view', rubysquare.ui_state);
        }
    },
    {
        'selector' : '.new_playlist_link',
        'bind_to' : 'click',
        'func' : function(){
            rubysquare.ui.dialog.show_dialog('#new_playlist_dialog', $(this), "above", '.close');
            return false;
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
    },
    {
        'selector' : '#nav_dashboard',
        'bind_to' : 'click',
        'func' : function(){
            // TODO make sure this is uncommented for production
//            var bool = confirm("Continuing will stop your currently playing music");
//            if (!bool) return false;
        }
    }
];

//~ View Objects, these reference above JSON (for now) ~//
rubysquare.views.songs = rubysquare.view(rubysquare.ui.songs_bindings, '#songs_view', '/songs.xml', rubysquare.playlists.all_on_page );
rubysquare.views.playlists = rubysquare.view(rubysquare.ui.playlist_bindings, '#playlists_view', '/playlists.xml', rubysquare.playlists.all_on_page );
rubysquare.views.now_playing = rubysquare.view(rubysquare.ui.now_playing_bindings, '#now_playing_view', '/songs/now_playing.xml', rubysquare.playlists.all_on_page );
rubysquare.views.search = rubysquare.view(rubysquare.ui.search_bindings, '#search_view', '/songs/search.xml', rubysquare.playlists.all_on_page );


$(document).ready(function(){

    $('#volume_slider').slider({
        'max':100,
        'min':0,
        'value':75,
        'change':function(event, ui){
            rubysquare.music.set_volume(ui.value);
        },
        'slide':function(event,ui){
            rubysquare.music.set_volume(ui.value);
        }
    });

    $('#seek_slider').slider({
        'max':100,
        'min':0,
        'slide':function(event, ui){
            var val = ui.value;
            var temp = this.change;
            this.change = '';   // don't let the music player seek while the user is using the slider
            rubysquare.music.seek(val);
            this.change = temp;
        }
    });

    rubysquare.ui.make_sticky('#music_player_controls', 'top', $('#music_player_controls').offset().top);


    // Reloads the current view when some UJS action is taken
    // I dont know where to put this yet. I'm sure I will have more places where the view needs to get reloaded
    $('form#new_playlist, .add_to_playlist').live('ajax:complete', function(xhr, status) {
        rubysquare.views.views_manager.reload();
        $(this).parent().append('Added new playlist');
    });

    //~ Rails UJS AJAX Messages ~//


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
       console.log("Added playlist #"+index);
       rubysquare.playlists.all_on_page[index].playlist = rubysquare.helpers.parse_json(value);
       console.log(rubysquare.playlists.all_on_page[index].playlist);
    });



//    rubysquare.playlists.songs_on_page.playlist = rubysquare.helpers.parse_json(rubysquare.settings.nodes.song_json);
//    console.log(rubysquare.playlists.songs_on_page.playlist);

    jsUtil.bind_from_json(rubysquare.ui.common_bindings);

    //~ Set the current view ~//

    //todo: move me into the helper class
    var initial_view = rubysquare.helpers.parse_json(rubysquare.settings.nodes.initial_page);
    initial_view = initial_view.initial_view;
    
    if(initial_view === 'songs')  {
        rubysquare.views.views_manager.init( rubysquare.views.songs );
    }
    else if(initial_view === 'playlist') { rubysquare.views.views_manager.init( rubysquare.views.playlists ); console.log('playlist view');}
    else if(initial_view === 'search') { rubysquare.views.views_manager.init( rubysquare.views.search ); console.log('search view'); }
    else if(initial_view === 'now_playing') { rubysquare.views.views_manager.init( rubysquare.views.now_playing ); console.log('now playing view')}




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



});