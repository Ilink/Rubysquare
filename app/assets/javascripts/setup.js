//~Namespaces~//
var rubysquare = {};
rubysquare.ui = {};
rubysquare.commands = {};
rubysquare.obs = {};
rubysquare.helpers = {};
rubysquare.history = {};

//~Arrays / Storage~//
rubysquare.history.command_history = [];

//~UI Node Names~//
rubysquare.ui.node_names = {
    'shuffle_button' : '#shuffle',
    'next_button' : '#next',
    'previous_button' : '#prev'
}

//~JSON~//
rubysquare.settings = {
    'debug' : true,
    'shuffle' : true,
    'repeat' : false
}

// This could be gathered from another datasource, such as an AJAX call to the database.
// Maybe this should be abstracted to allow for that possibility?
// would require an interface to choose based on settings how to handle requests for the Now Playing playlist
rubysquare.now_playing = {};

