General Overview :: Front-end
===================================
There are a few main systems that make up the core of the application.

1. Views
2. Music Player
3. History

Views
---------
Views are the presentation layer of the application. These define the various ways a user can display information. Unlike a simple GET request for a new page, these views need to handle data fed via AJAX from Rails. This constraint exists simply because the user needs to keep music playing while they navigate the application. It would be very awkward if the user had to stop whatever they were listening to if they wanted to view their playlists. Each view contains a set of UI bindings to ensure that all user actions are handled appropriately for the current view.

In order for a set of views to cooperate with typical GET requests (rubysquare.com/playlists, for example), each HTML template needs to have containers for the other divs represented by the view. In the case of Rubysquare, the main page has three main views: playlists, songs and now playing. Let's say we want to look at playlists we click the Playlist link. This lets the system know that it needs to check for existing markup for the Playlist container. If the markup isn't there, the javascript inserts a new container. To orchestrate all this, each view is configured to have a container div. This lets the view easily draw itself.

A view manager class is used to coordinate views. When a user clicks on a new link, such as "playlists" the view needs to change. The view manager keeps track of the current view. When the user requests to change to a new view, the View Manager hides the current view. Then it displays the requested view and sets it to be the current view. View Manager is also responsible for initializing the first view upon page view. 

Music Player
---------
The player itself uses Soundmanager2 within a wrapper class.This allows for future flexibility should a different library prove more attractive or useful. Music is played through JSON sent by the Rails backend. Each page / view has an associated JSON returned to it and embedded in the page. In some cases, an individual view might have more than one available playlist JSON. Once the user elects to play a song, the appropriate JSON is copied and sent to the music player wrapper object. The JSON must be copied because the JSON on the page is liable to change. For instance, if the user searches for a new song, the JSON on the page will change to reflect this.

The audio library allows for playback via Flash or HTML5. 

History
------------
At times it can be very frustrating to use web applications that lack undo/redo functionality. This system attempts to alleviate some of those issues. A history object controls an array that contains a set of prior (undo-able/redo-able) commands. For instance, let's say a user adds a song to a playlist. They then decide to remove the song. Instead of manually removing it, they can simply issue an undo command. The command object keeps track of the only the last several commands, in order to save memory. The current system leverages Javascript garbage collection instead of manually re-setting the array every so often. 