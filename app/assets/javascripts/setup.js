//~Namespaces~//
var rubysquare = {};
rubysquare.ui = {};
rubysquare.commands = {};
rubysquare.obs = {};
rubysquare.helpers = {};
rubysquare.history = {};
rubysquare.music = {};
rubysquare.ajax_manager = {};

//~Arrays / Storage~//
rubysquare.history.command_history = [];


//~UI Node Names~//
rubysquare.ui.nodes = {
    'shuffle_button' : '#shuffle',
    'next_button' : '#next',
    'previous_button' : '#prev',
    'pause_button' : '#pause'
}

//~JSON~//
rubysquare.settings = {
    'debug' : true,
    'shuffle' : true,
    'repeat' : false
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
soundManager.url = 'assets/soundmanager2.swf'
soundManager.useHTML5Audio = true;
