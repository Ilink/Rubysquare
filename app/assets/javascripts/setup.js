//~Namespaces~//
var rubysquare = {};
rubysquare.ui = {};
rubysquare.commands = {};
rubysquare.helpers = {};
rubysquare.history = {};
rubysquare.music = {};
rubysquare.ajax_manager = {};
rubysquare.playlists = {};
rubysquare.views = {};

//~Arrays / Storage~//
rubysquare.history.command_history = [];

//~JSON~//
rubysquare.settings = {
    'debug' : true,
    'shuffle' : false,
    'repeat' : false,
    'nodes' : {
        'shuffle_button' : '#shuffle',
        'next_button' : '#next',
        'previous_button' : '#prev',
        'pause_button' : '#pause',
        'song_json' : '.song_json',
        'main_container' : '#container',
        'initial_page' : '#initial_view_json',
        'controls' : '',
        'now_playing_info':"#now_playing_info",
        'seek_slider':"#seek_slider"
    },
    'music_highlight_class' : 'song_highlight',
    'links' : {
        'new_playlist' : '/playlists/new'
        // todo add more important links here for future use
    }
}

rubysquare.ui_state = {
    'currently_playing' : {
        'song_index':'',
        'playlist_index':'',
        'container':''
    }
}

rubysquare.default_song_callbacks = {};

/*
    public interface settings
        public:
            get_settings()
            settings = {}

 */

// This could be gathered from another datasource, such as an AJAX call to the database.
// Maybe this should be abstracted to allow for that possibility?
// would require an interface to choose based on settings how to handle requests for the Now Playing playlist
rubysquare.now_playing = {};

//~Soundmanager setup~//
soundManager.url = '/assets/soundmanager2.swf'
soundManager.useHTML5Audio = true; // this is partially an HTML5 experiment, plus HTML5 performs better than flash for playing music
soundManager.debugMode = false;
