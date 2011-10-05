(function( window, undefined ) {
$(document).ready(function() {
//$(document).ready(function() {
    var test = {
        name: 'test',
        alert_me : function() {
            //alert(this.name);
        }
    };
    
    test.alert_me();
    var test2 = Object.create(test)
    test2.name = 'temp';
    test2.alert_me();
    
    
    
    
    var music_controller = 
    {
        //Properties
        sort_direction : '',
        current : 0,
        shuffle : 0,
        shuffle_all : 0,
        sort_by : 'artist',
        jplayer_id : '#jquery_jplayer_1',
        
        /**************************
         * jPlayer Methods
        **************************/
        initialize_player : function (jplayer_id)
        {
            //jplayer_id should be #jquery_jplayer_1
            $('#jquery_jplayer_1').jPlayer({
                ready: function () {
                $('#jquery_jplayer_1').jPlayer("setMedia", {
                        mp3: "http:\/\/www.jplayer.org\/audio\/mp3\/Miaow-01-Tempered-song.mp3"
                });
                },
                ended: function()
                {
                },
                supplied: "mp3"
            });
        },
        
        set_media : function(file_location)
	{
            var song = {mp3: file_location};
            $("#jquery_jplayer_1").jPlayer("setMedia", song);
	},
        
        play : function()
	{
            $(this.jplayer_id).jPlayer("play");
	},
        
        previous : function()
	{
		//if(this.current > 0)
                if(typeof music_model.playlist[this.current].location != 'undefined')
		{
			this.current--;
			this.set_media(music_model.playlist[this.current].location);
			this.play();
                        music_view.update_now_playing();
		}
	},
	
	next : function()
	{
		//if(this.current < this.length)
                //if(typeof this.playlist[this.current].location != 'undefined')
                if(this.shuffle_all != 1 && this.current != music_model.playlist_length)
		{
                    this.current++;
                    this.set_media(music_model.playlist[this.current].location);
                    this.play();
                    music_view.update_now_playing();
		}
                
                if(this.shuffle_all == 1 && this.current == music_model.playlist_length)
                {
                    this.current = 0;
                    shuffle_all();
                    music_view.update_now_playing();
                }
	},
        
        shuffle_playlist : function()
        {
            if (music_model.playlist != '')
            {
                var i = music_model.playlist_length - 1;
                for(i; i > -1; i--)
                {
                    var j = Math.floor(Math.random() * (i + 1))
                    var temp = music_model.playlist[i].location;
                    music_model.playlist[i].location = music_model.playlist[j].location;
                    music_model.playlist[j].location = temp;
                    //$('body').prepend(this.playlist[i].location+"<br/>");
                }
            }
        },
        
        /**************************
         * Search Functions
        **************************/
        send_search : function(query)
	{
            var self = this;
		$.post('search.php', {search:query}, 
		function(data)
		{
                    if(data)
                    {
                        self.process_search(data);
                    }
		}
		);
                //music.sort_search('album');
	},
        
        search_box_controller : function(search_box_id)
        {
            if ($(search_box_id).val().length > 2)
            {
                this.send_search($(search_box_id).val());
            }

            //clear the search results if nothing is in the search box
            if(!$(search_box_id).val())
            {
                //$('body').prepend('1__]')
                //clear the search results
            }
        },
        
        search_album : function(album)
	{
                var self = this;
		$.post('search_album.php', {search:album}, 
		function(data)
                    {
                        music_model.playlist = $.parseJSON(data);
                        //alert(music.playlist[0].location);
                        music_model.playlist_length = music_model.playlist.length;
                        self.current = 0;
                        if (self.shuffle == 1)
                            {
                                self.shuffle_playlist();
                            }
                        self.set_media(music_model.playlist[self.current].location);
                        music_view.update_now_playing();
                        music_view.update_playlist_view(music_model.playlist);
                        self.play();
                    }
		);
	},
	
	search_artist : function(artist)
	{
                var self = this;
		$.post('search_artist.php', {search:artist}, 
		function(data)
			{
                            if(data)
                            {
				music_model.playlist = $.parseJSON(data);
				music_model.playlist_length = music_model.playlist.length;
				self.current = 0;
				self.set_media(music_model.playlist[self.current].location);
                                music_view.update_now_playing();
                                music_view.update_playlist_view(music_model.playlist);
				self.play();
                            }
			}
		);
	},
        
        process_search : function(data)
	{
            if (data) //make sure the value isnt null
            {
               var parsed_data = eval("(" + data + ")");
               parsed_data.sort(this.sorter('asc','artist'));
               this.sort_direction = 'artist_asc';
               music_model.search_results = parsed_data;
               music_view.update_search_results(music_model.search_results);
               return parsed_data;
            }
            else return false;
	},
        
        add_single_track : function(track)
        {
            var self = this;
            $.post('search_track.php', {search:track}, 
                function(data)
                    {
                        music_model.playlist = $.parseJSON(data);
                        //alert(music.playlist[0].location);
                        self.length = music_model.playlist.length;
                        self.current = 0;
                        if (self.shuffle == 1)
                            {
                                self.shuffle_playlist();
                            }
                        self.set_media(music_model.playlist[self.current].location);
                        music_view.update_now_playing();
                        music_view.update_playlist_view(music_model.playlist);
                        self.play();
                    }
             );
        },
        
        play_from_playlist : function(location, track_num)
        {
            this.current = track_num;
            alert(location);
            this.set_media(location);
            music_view.update_now_playing();
        },
        
        /***********************************
	*	
	*	Sort Functions
	*
	***********************************/
        
        sorter : function(direction, field)
        {
            return function (a,b)
            {
                var fieldA = a[field].toLowerCase();
                var fieldB = b[field].toLowerCase();
                if (direction == 'asc')
                {  
                    if (fieldA < fieldB) return -1
                    if (fieldA > fieldB) return 1
                }
                
                if (direction == 'dsc')
                {  
                    if (fieldA < fieldB) return 1
                    if (fieldA > fieldB) return -1
                }
                return 0
            }
        },
        
        title_sort : function()
        {
            if(this.sort_direction != 'title_dsc') 
                {
                    this.resort_results('asc','title');
                    this.sort_direction = 'title_dsc';
                }
            else 
                {
                    this.resort_results('dsc','title');
                    this.sort_direction = 'title_asc';
                }
            return false
        },
        
        artist_sort : function()
        {
            if(this.sort_direction != 'artist_dsc') 
                {
                    this.resort_results('asc','artist');
                    this.sort_direction = 'artist_dsc';
                }
            else 
                {
                    this.resort_results('dsc','artist');
                    this.sort_direction = 'artist_asc';
                }
            return false
        },
        
        album_sort : function()
        {
            if(this.sort_direction != 'album_dsc') 
                {
                    this.resort_results('asc','album');
                    this.sort_direction = 'album_dsc';
                }
            else 
                {
                    this.resort_results('dsc','title');
                    this.sort_direction = 'title_asc';
                }
                return false
        },
        
        resort_results : function(direction, field)
        {
            music_model.search_results.sort(this.sorter(direction, field));
            var parsed_data = music_model.search_results;
            music_view.update_search_results(parsed_data);
        }
    };//end controller object
    
    var music_model =
    {
        //Properties
        playlist : '',
        search_results : [],
        playlist_length : 0
        
        //Methods
        
    };//end model object
    
    var music_view =
    {
        //Properties
        
        
        //Methods
        update_playlist_view : function(data)
        {
           var arg = arguments[0];//value to pass to the nested functions
            $('.playlist_row').remove(); //remove previous playlist
            $.each(data, function(k)
            {
                $('#playlist_elements').append("<div id='playlist_row_"+k+"' class='playlist_row'>");
                
                $('#playlist_row_'+k).append(
                    "<div class='col title_col float_left' id='playlist_title_"+k+"'><a>"+data[k].title + "</a></div>"
                );

                $('#playlist_row_'+k).append(
                    "<div class='col artist_col float_left' id='playlist_artist_"+k+"'><a>"+data[k].artist + "</a></div>"
                    //"<a id='playlist_artist_"+k+"'>"+data[k].artist + "</a><br/><br/>"
                );

                $('#playlist_row_'+k).append(
                    "<div class='col album_col float_left' id='playlist_album_"+k+"'><a>"+data[k].album + "</a></div>"
                    //"<a id='playlist_album_"+k+"'>"+data[k].album + "</a><br/>"
                );

                $('#playlist_row_'+k).append("</div>");
                $('#playlist_row_'+k).append("<div class='cleaner'></div>");
                
                
                $('#playlist_title_'+k).dblclick(function(){
                    music_controller.add_single_track(arg[k]['location']);
                    music_controller.play();
                    return false;
                });
                
                $('#playlist_album_'+k).dblclick(function(){
                    music_controller.search_album(arg[k]['album']);
                    return false;
                });
                
                $('#playlist_artist_'+k).dblclick(function(){
                    music_controller.search_artist(arg[k].artist);
                    return false;
                });
            });
        },
        
        update_search_results : function(data)
        {
            var arg = arguments[0];//value to pass to the nested functions
            $('.search_result_row').remove(); //remove previous search results
            $.each(data, function(k)
            {
                $('#search_result_elements').append("<div id='search_result_row_"+k+"' class='search_result_row'>");
                
                $('#search_result_row_'+k).append(
                    "<div class='col title_col float_left' id='search_result_title_"+k+"'><a>"+data[k].title + "</a></div>"
                );

                $('#search_result_row_'+k).append(
                    "<div class='col artist_col float_left' id='search_result_artist_"+k+"'><a>"+data[k].artist + "</a></div>"
                    //"<a id='playlist_artist_"+k+"'>"+data[k].artist + "</a><br/><br/>"
                );

                $('#search_result_row_'+k).append(
                    "<div class='col album_col float_left' id='search_result_album_"+k+"'><a>"+data[k].album + "</a></div>"
                    //"<a id='playlist_album_"+k+"'>"+data[k].album + "</a><br/>"
                );

                $('#search_result_row_'+k).append("</div>");
                $('#search_result_row_'+k).append("<div class='cleaner'></div>");
                
                
                $('#search_result_title_'+k).dblclick(function(){
                    music_controller.add_single_track(arg[k]['location']);
                    music_controller.play();
                    return false;
                });
                
                $('#search_result_album_'+k).dblclick(function(){
                    music_controller.search_album(arg[k]['album']);
                    return false;
                });
                
                $('#search_result_artist_'+k).dblclick(function(){
                    music_controller.search_artist(arg[k].artist);
                    return false;
                });
            });
        },
        
        update_now_playing : function()
        {
            if (typeof music_model.playlist[music_controller.current].title != 'undefined')
            {
                //remove previous song title
                $('#current_song').empty();
                $('#current_song').append(music_model.playlist[music_controller.current].title+
                    "<br/>"+music_model.playlist[music_controller.current].artist+
                    "<br/>"+music_model.playlist[music_controller.current].album);
                
                $('#album_art_container').empty();
                $('#album_art_container').append("<img src='"+music_model.playlist[music_controller.current].album_art+"'/>");
            }
        }
    };//end view object
    
    $(document).ready(function() {
    
    /**********************************
     *
     *      Initialize!
     * 
     *********************************/
    
    music_controller.initialize_player('#jquery_jplayer_1');
    
    /**********************************
     *
     *      Setup the UI bindings
     * 
     *********************************/
    
    $('#search_box').keyup(function()
    {
        music_controller.search_box_controller('#search_box');
    });
    
    $('.jp-next').click(function ()
    {
        music_controller.next();
        return false
    });
	
    $('.jp-previous').click(function () 
    {
        music_controller.previous();
        return false
    });

    $('#library_view').click(function()
    {
        $('#search_results, #playlist').hide();
        return false
        //$('#library').show();
    });

    $('#playlist_view').click(function()
    {
        $('#search_results, #library').hide();
        $('#playlist').show();
        return false
    });

    $('#search_results_view').click(function()
    {
        $('#library, #playlist').hide();
        $('#search_results').show();
        return false
    });
    
    $('#title_col_header').click(music_controller.title_sort());
    
    $('#artist_col_header').click(music_controller.artist_sort());
    
    $('#album_col_header').click(music_controller.album_sort());
    
    });
    
    /*
    $('#shuffle_all').click(function()
    {
        shuffle_all();
        music.shuffle_all = 1;
        return false
    });
     */
//});
});
})(window);