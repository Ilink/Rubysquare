General Overview :: Front-end
===================================
There are a few main systems that make up the core of the application.

1. Views
2. Music Player
3. History

Views
---------
Views are the presentation layer of the application. These define the various ways a user can display information. Unlike a simple GET request for a new page, these views need to handle data fed via AJAX from Rails. This constraint exists simply because the user needs to keep music playing while they navigate the application. It would be very awkward if the user had to stop whatever they were listening to if they wanted to view their playlists. Each view contains a set of UI bindings to ensure that all user actions are handled appropriately for the current view.

In order for a set of views to cooperate with typical GET requests (rubysquare.com/playlists, for example), each HTML template needs to have containers for the other divs represented by the view. In the case of Rubysquare, the main page has three main views: playlists, songs and now playing. Let's say we want to look at playlists we click the Playlist link. This lets the system know that it needs to check for existing markup for the Playlist container.

Music Player
---------
The player itself uses Soundmanager2 within a wrapper class. This allows for future flexibility should a different library proove more attractive or useful. Music is played through JSON sent by the Rails backend. Each page / view has an associated JSON returned to it and embedded in the page. Once the user elects to play a song, the appropriate JSON is copied and sent to the music player wrapper object. The JSON must be copied because the JSON on the page is liable to change. For instance, if the user searchs for a new song, the JSON on the page will change to reflect this.

History
------------
At times it can be very frustrating to use web applications that lack undo/redo functionality. This system attempts to alleviate some of those issues. A history object controls an array that contains a set of prior (undo-able/redo-able) commands. For instance, let's say a user adds a song to a playlist. They then decide to remove the song. Instead of manually removing it, they can simply issue an undo command.