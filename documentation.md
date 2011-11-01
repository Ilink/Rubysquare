General Overview :: Front-end
===================================
There are a few main systems that make up the core of the application.

1. Views
2. Music Player
3. History

Views
---------
Views are the presentation layer of the application. These define the various ways a user can display information. Unlike a simple GET request for a new page, these views need to handle data fed via AJAX from Rails. This constraint exists simply because the user needs to keep music playing while they navigate the application. It would be very awkward if the user had to stop whatever they were listening to if they wanted to view their playlists. Each view contains a set of UI bindings to ensure that all user actions are handled appropriately for the current view.

Music Player
---------
The player itself uses Soundmanager2 within a wrapper class. This allows for future flexibility should a different library proove more attractive or useful. The player derives data from JSON rendered by Rails. This gives it everything it needs to play a song.

History
------------
At times it can be very frustrating to use web applications that lack undo/redo functionality. This system attempts to alleviate some of those issues. A history object controls an array that contains a set of prior (undo-able/redo-able) commands. For instance, let's say a user adds a song to a playlist. They then decide to remove the song. Instead of manually removing it, they can simply issue an undo command.