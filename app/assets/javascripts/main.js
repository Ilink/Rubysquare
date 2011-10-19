//~UI Commands~//
rubysquare.commands.next_song_command = rubysquare.commands.next_song_shuffle_command;

//~JSON for bindings~//
rubysquare.ui.bindings = [
    {
        'selector' : rubysquare.ui.node_names['next_button'],
        'bind_to' : 'click',
        'func' : rubysquare.commands.next_song_command.execute
    }
];

$(document).ready(function(){
    //~Temp Binds~//
    $('#shuffle').click(function(){
        if(rubysquare.settings['shuffle'])
            rubysquare.commands.shuffle_command.unexecute();
        else
            rubysquare.commands.shuffle_command.execute();
    });

    jsUtil.bind_from_json(rubysquare.ui.bindings);
});