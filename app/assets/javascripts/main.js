//UI Commands
rubysquare.commands.next_song_command = rubysquare.commands.next_song_shuffle_command.execute;

//JSON for bindings

rubysquare.settings = [
    {
        'selector' : '#next',
        'bind_to' : 'click',
        'func' : rubysquare.commands.next_song_command
    }
];

$(document).ready(function(){
    
    $('#next').click(rubysquare.commands.next_song_command);
    
});
