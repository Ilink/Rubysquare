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
        'pause_button' : '#pause'
    }
}

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
soundManager.useHTML5Audio = true;
