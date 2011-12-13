//~ (undoable) Commands ~//

//~ Playlists ~//
rubysquare.playlists.songs_on_page = rubysquare.playlist();
rubysquare.playlists.now_playing = rubysquare.playlist();
rubysquare.playlists.all_on_page = [];

//~ Callbacks ~//
//This is not used yet
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
rubysquare.views.views_manager = rubysquare.view_manager(rubysquare.ui_state, rubysquare.ui.table_highlight);

// Refactored objects
rubysquare.music_wrapper = rubysquare.Music_wrapper(soundManager);
rubysquare.song_manager = rubysquare.soundmanager_song_manager();


//~ Initialize (some) Objects ~//
rubysquare.maestro = rubysquare.Maestro(rubysquare.song_manager, rubysquare.music_wrapper);

rubysquare.music_callback_functions = {
    'move_seek_bar' : function(){
        $('#seek_slider').slider({ 'value': rubysquare.maestro.get_present_position() });
    },
    'show_now_playing_info' : function(){
        var song_meta = rubysquare.maestro.get_song_meta();
        console.log(song_meta);
        rubysquare.ui.now_playing_info.show({
            'artist': song_meta.artist,
            'album': song_meta.album,
            'title': song_meta.title
        });
    },
    'move_highlight' : function(){
        var song_info = rubysquare.maestro.get_current_song_info();
        console.log(song_info);
        rubysquare.ui.table_highlight.highlight(song_info.song_index, song_info.playlist_index, song_info.container_selector, {'action':'add', 'unique':true});
    },
    'next' : function(){
        rubysquare.maestro.next(rubysquare.settings);
    }
}

rubysquare.music_callbacks_new = {
    'while_playing':[
        rubysquare.music_callback_functions.move_seek_bar
    ],
    'on_finish':[
        rubysquare.music_callback_functions.next,
        rubysquare.music_callback_functions.move_highlight
    ],
    'on_play':[
        rubysquare.music_callback_functions.show_now_playing_info
    ]
}

rubysquare.song_manager.set_callbacks(rubysquare.music_callbacks_new);
rubysquare.song_manager.new_song();



//~ JSON for bindings, for Songs view, TEMP ~//
// TODO refactor these bindings, they are very very repetitive
rubysquare.ui.songs_bindings = [
//    {
//        'selector' : '#songs_view .song_location, #songs_view .song_title', // This is temporary since i have to figure out the UI before i know what the strucutre of the links will be
//        'bind_to' : 'dblclick',
//        'func' : function() {
//
//            var song_index = Number($(this).parent('tr').attr('id'));
//            console.log(song_index);
//            var playlist_index = $(this).parents('.playlist_container').attr('playlist_index');
//            console.log(playlist_index);
//            rubysquare.helpers.play_from_available(rubysquare.music, song_index, rubysquare.playlists.all_on_page[0], rubysquare.playlists.now_playing, playlist_index, '#songs_view', rubysquare.ui_state);
//            rubysquare.ui.table_highlight.highlight(song_index, playlist_index, '#songs_view', {"action":"add", "unique": true});
//        }
//    },
    {
        'selector' : '#songs_view .song_location, #songs_view .song_title', // This is temporary since i have to figure out the UI before i know what the strucutre of the links will be
        'bind_to' : 'dblclick',
        'func' : function() {
            var song_index = Number($(this).parent('tr').attr('id'));
            console.log(song_index);
            var playlist_index = Number($(this).parents('.playlist_container').attr('playlist_index'));
            console.log(playlist_index);
            rubysquare.helpers.play_from_available(rubysquare.maestro, song_index, rubysquare.playlists.all_on_page[0], rubysquare.playlists.now_playing, playlist_index, '#songs_view');
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
            var playlist_index = Number($(this).parents('.playlist_container').attr('playlist_index'));
            rubysquare.ui.table_highlight.highlight(song_index, playlist_index, '#search_view', {"action":"add", "unique": true});
//            rubysquare.helpers.play_from_available(rubysquare.music, song_index, rubysquare.playlists.all_on_page[0], rubysquare.playlists.now_playing, playlist_index, '#playlists_view', rubysquare.ui_state);
            rubysquare.helpers.play_from_available(rubysquare.maestro, song_index, rubysquare.playlists.all_on_page[0], rubysquare.playlists.now_playing, playlist_index, '#search_view');
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
            var playlist_index = Number($(this).parents('.playlist_container').attr('playlist_index'));
            console.log("playlist:" + playlist_index);
            var song_index = Number($(this).parent('tr').attr('id'));
//            rubysquare.helpers.play_from_available(rubysquare.music, song_index, rubysquare.playlists.all_on_page[playlist_index], rubysquare.playlists.now_playing, playlist_index, '#playlists_view', rubysquare.ui_state);
            rubysquare.helpers.play_from_available(rubysquare.maestro, song_index, rubysquare.playlists.all_on_page[playlist_index], rubysquare.playlists.now_playing, playlist_index, '#playlists_view');
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
            rubysquare.helpers.play_from_available(rubysquare.music, song_index, rubysquare.playlists.all_on_page[playlist_index], rubysquare.playlists.now_playing, playlist_index, '#playlist_view');
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
//            console.log('test');
//            rubysquare.ui.brief_message.message('Playlist created!');
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
            var playlist_index = Number($(this).parents('.playlist_container').attr('playlist_index'));
            rubysquare.helpers.play_from_available(rubysquare.maestro, song_index, rubysquare.playlists.all_on_page[0], rubysquare.playlists.now_playing, playlist_index, '#now_playing_view');
            rubysquare.ui.table_highlight.highlight(song_index, playlist_index, '#now_playing_view', {"action":"add", "unique": true});
//            rubysquare.helpers.play_from_available(rubysquare.music, song_index, rubysquare.playlists.all_on_page[0], rubysquare.playlists.now_playing, playlist_index, '#now_playing_view', rubysquare.ui_state);
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
//                rubysquare.music.next(rubysquare.settings, rubysquare.playlists.now_playing.playlist);
                rubysquare.maestro.next(rubysquare.settings);
                rubysquare.music_callback_functions.move_highlight();
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
//                rubysquare.music.previous(rubysquare.settings, rubysquare.playlists.now_playing.playlist);
                rubysquare.maestro.previous(rubysquare.settings);
                rubysquare.music_callback_functions.move_highlight();
            }
            else
                rubysquare.log('no songs specified! please add something to the que')
        }
    },
    {
        'selector' : rubysquare.settings.nodes['pause_button'],
        'bind_to' : 'click',
        'func' : function(){
            rubysquare.maestro.pause_or_resume();
            $(this).toggleClass('bw_hover_hovered');
        }
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
        'selector' : '#seek_bar',
        'bind_to' : 'click',
        'func' : function(e){
            rubysquare.seek_bar.seek();
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
            rubysquare.music_wrapper.set_volume(ui.value, rubysquare.maestro.get_song());
        },
        'slide':function(event,ui){
            rubysquare.music_wrapper.set_volume(ui.value, rubysquare.maestro.get_song());
        }
    });

    $('#seek_slider').slider({
        'max':100,
        'min':0,
        'slide':function(event, ui){
            var val = ui.value;
            var temp = this.change;
            this.change = '';   // don't let the music player seek while the user is using the slider
            rubysquare.maestro.seek(val);
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





    //~ Drag and Drop Experiments ~//

//  http://stackoverflow.com/questions/3774755/jquery-sortable-select-and-drag-multiple-list-items
//  http://jsfiddle.net/Nqkek/56/

    var highlight = 'highlight';

    $("#droppable").droppable({
      drop: function() {

          console.log('dropped, then fire ajax request for form');
      },
        activate:function(){
            $(this).addClass(highlight);
        },
        deactivate:function(){
            $(this).removeClass(highlight);
        },
      tolerance: 'touch'
    });


    var shine = 'song_selection_highlight';
    var selector = 'tr';
    var selection = [];
    var last_selection;
    var container = 'tbody';

    $('tr').click(function(event){
        var index;
        var already_clicked = false;
        var oldest_click;
        var previous_click;
        if($(this).hasClass(shine)){
            already_clicked = true;
        }

        if(event.shiftKey){
            var oldest_selection = last_selection;

            $.each(selection, function(key, value){
                value.removeClass(shine);
            });
            selection = [];
            selection.push($(this));

            if(!already_clicked){
                selection.push($(this));
            }
            console.log(selection);
            console.log('shift click');

//            var last_selection_index = Number(last_selection.attr('id'));
//            var current_selection_index = Number($(this).attr('id'));

//            if (current_selection_index < last_selection_index){
//                index = current_selection_index;
//            } else {
//                index = last_selection_index;
//            }

            var oldest_selection_index = Number(oldest_selection.attr('id'));
            var last_selection_index = Number(last_selection.attr('id'));
            var current_selection_index = Number($(this).attr('id'));

            if (current_selection_index < last_selection_index){
                index = current_selection_index;
            } else {
                index = last_selection_index;
            }

            console.log(Math.abs(last_selection_index - current_selection_index));
            for(var i = 0; i < Math.abs(last_selection_index - current_selection_index); i++){
                selection.push( $(selector + '#'+ (index + i)) );
                $(selector + '#'+ (index + i)).addClass(shine);
                console.log( $(selector + '#'+ (index + i)) );
                console.log(selector + '#'+ (index + i));
            }



        }

        else if(event.ctrlKey || event.metaKey){
            if(!already_clicked){
                selection.push($(this));
            }

            console.log(selection);
            console.log('control click');
            $(this).addClass(shine);
        }
        else {
            console.log(last_selection);
            // remove the other highlights since this is a normal click
            $.each(selection, function(key, value){
                value.removeClass(shine);
            });

            $(this).addClass(shine);
            selection = []; // reset the array
            selection.push($(this));
            console.log('no key modifier');
        }

        last_selection = $(this);
    }).draggable({
        appendTo:'body',
        helper: function( event ) {
            console.log(selection);
            var selection_string;

            selection_string = selection.length + " songs selected";
            return $("<div class='song_selection_information_dragger'>" + selection_string + "</div>" );
        }

    });

});