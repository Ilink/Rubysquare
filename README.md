Rubysquare
==========
Cloud-esque music player. I didn't want to be tied down to a specific cloud music vendor (like Amazon or Google) so I started this project. While still in its infancy, skeletal functionality is coming along nicely.
The crux of the project is that many users can share a single music library.

Features Currently Under Development
--------------
*	Plays music, either through HTML5 or Flash (based on [Soundmanager2](https://github.com/scottschiller/SoundManager2))
*	Importing iTunes libraries (XML parsing powered by the incredible [Nokogiri](https://github.com/tenderlove/nokogiri))
    ** Available as a gem from [here](https://github.com/Ilink/iparse)
*	Playlist creation and management
*	Sophisticated UI
*	Podcast management
*	Search ([Sunspot](http://outoftime.github.com/sunspot/))
*   AJAX Powered - If you want the user to have a pleasant listening experience, you cannot interupt their music. Most everything must be requested/delivered using AJAX. [Rails UJS](https://github.com/rails/jquery-ujs) as well as a central AJAX Page system are used to manage this.
*   User authentican / management ([devise](https://github.com/plataformatec/devise)) Also includes an optional Guest user feature.

Future Features
--------------
*	Album artwork
*	Audiobook support
*	Improved integration with iTunes (it's a one-way street right now)

Usage
--------------
While many features are under heavy development, you can feel free to experiment with the project. Just make sure you have all the gems in the gemfile.
You can use either nginx or Mongrel (I use mongrel for testing) but make sure that you have Sunspot running.

Adjusting the front-end significantly would be difficult at the moment as I am in the middle of refactoring the AJAX Views system and the Music Player classes.