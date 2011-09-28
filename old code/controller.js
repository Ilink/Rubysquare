(function( window, undefined ) {
"use strict";
$(document).ready(function() {
    
    /*
    var test = function(arg)
    {
        var self = this;
        this.something = function(soemthing)
        {
            
            
        }
        var something = function (soemthing)
        {
            
        }
        
        var priv;
        this.name = somethign_public;
        
    }
    */
    
    
    var music_controller = 
    {
        //Properties
        sort_direction : '',
        current : 0,
        shuffle : 0,
        shuffle_all_bool : 0,
        sort_by : 'artist',
        jplayer_id : '#jquery_jplayer_1',
        
        /**************************
         * jPlayer Methods
        **************************/
        init_controller : function (jplayer_id)
        {
            var self = this;
            //jplayer_id should be #jquery_jplayer_1
            $('#jquery_jplayer_1').jPlayer({
                ready: function () {
                $('#jquery_jplayer_1').jPlayer("setMedia", {
                        mp3: "http://icecast.media.berkeley.edu:8000/kalx-128.ogg"
                });
                },
                ended: function()
                {
                },
                supplied: "mp3"
            });
            
            $("#jquery_jplayer_1").bind($.jPlayer.event.ended, function() 
            {
                self.next();
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
                if(this.current >= 1)
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
                if(this.shuffle_all_bool != 1 && this.current != music_model.playlist_length-1)
		{
                    this.current++;
                    this.set_media(music_model.playlist[this.current].location);
                    this.play();
                    music_view.update_now_playing();
		}
                
                if(this.shuffle_all_bool == 1 && this.current != music_model.playlist_length-1)
                {
                    this.current++;
                    this.set_media(music_model.playlist[this.current].location);
                    this.play();
                    music_view.update_now_playing();
                }
                
                if(this.shuffle_all_bool == 1 && this.current == music_model.playlist_length-1)
                {
                    this.shuffle_all();
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
                    var temp = music_model.playlist[i];
                    music_model.playlist[i] = music_model.playlist[j];
                    music_model.playlist[j] = temp;
                    //$('body').prepend(this.playlist[i].location+"<br/>");
                }
            }
        },
        
        shuffle_all : function()
        {
                var self = this;
                $.post('shuffle_all.php', 
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
                        if(data)
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
                                if (self.shuffle == 1)
                                {
                                    self.shuffle_playlist();
                                }
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
               //var parsed_data = eval("(" + data + ")");
               var parsed_data = jsonParse(data);
               parsed_data.sort(this.sorter('asc','album'));
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
            this.set_media(location);
            music_view.update_now_playing();
            this.play();
        },
        
        dump_podcasts : function()
        {
            var self = this;
            $.post('podcast.php', function()
            {
                music_model.playlist = $.parseJSON(data);
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
            });
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
        
        resort_results : function(direction, field)
        {
            if (music_view.current_view === 'playlist')
                {
                    music_model.playlist.sort(this.sorter(direction, field));
                    music_view.update_playlist_view(music_model.playlist);
                }
                
            else if (music_view.current_view === 'search_results')
                {
                    music_model.search_results.sort(this.sorter(direction, field));
                    music_view.update_search_results(music_model.search_results);
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
                    this.resort_results('dsc','album');
                    this.sort_direction = 'album_asc';
                }
                return false
        }
    };//end controller prototype
    
    var music_model =
    {
        //Properties
        playlist : '',
        search_results : [],
        playlist_length : 0
        
        //Methods
        
    };//end model prototype
    
    var music_view =
    {
        //Properties
        current_view : 'search_results',
        
        //Methods
        init_view : function()
        {
            /*
            Initialize sliders
            */
           
            $( "#vol_slider" ).slider({
                            range:"min",
                            value:10,
                            min: 0,
                            max: 100,
                            step: .1,
                            slide: function( event, ui ) {
                                    //$('body').prepend(ui.value);
                                    $("#jquery_jplayer_1").jPlayer("volume", ui.value/100);
                                    $(".vol_background").css('width', ui.value+'%')
                            }
            });

            $( "#seek_bar" ).slider({
                range:"min",
                            value:0,
                            min: 0,
                            max: 100,
                            step: .1,
                            slide: function(event, ui){
                                $("#jquery_jplayer_1").unbind($.jPlayer.event.timeupdate);
                            },
                            stop: function( event, ui ) {
                                    $("#jquery_jplayer_1").jPlayer("playHead", ui.value);
                                    $("#jquery_jplayer_1").bind($.jPlayer.event.timeupdate, function() 
                                        {
                                            var current_time = $("#jquery_jplayer_1").data("jPlayer").status.currentPercentAbsolute; 
                                            $('#seek_bar > a').css('left', current_time+'%');
                                        });
                            }
            });
            
            /*
            Seek bar front-end visuals
            */

            $("#jquery_jplayer_1").bind($.jPlayer.event.timeupdate, function() 
            {
                var current_time = $("#jquery_jplayer_1").data("jPlayer").status.currentPercentAbsolute; 
                $('#seek_bar > a').css('left', current_time+'%');
            });
            
            /*
             UI Bindings
            */
           
           $('#kalx').click(function()
           {
               music_controller.set_media('http://icecast.media.berkeley.edu:8000/kalx-128.ogg');
               music_controller.play();
           });
            
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
                $('#search_results, #playlist, #podcasts').hide();
                return false
                //$('#library').show();
            });

            $('#playlist_view').click(function()
            {
                $('#search_results, #library, #podcasts').hide();
                music_view.current_view = 'playlist';
                $('#playlist').show();
                return false
            });

            $('#search_results_view').click(function()
            {
                $('#library, #playlist, #podcasts').hide();
                music_view.current_view = 'search_results';
                $('#search_results').show();
                return false
            });
            
            $('#podcasts_view').click(function()
            {
                $('#library, #playlist, #search_results').hide();
                music_view.current_view = 'podcasts';
                $('#podcasts').show();
                return false
            });

            $('#title_col_header_search_results, #title_col_header_playlist').click(function(){
                music_controller.title_sort.call(music_controller);//avoid referring to the clicked dom element with 'this'
            });

            $('#artist_col_header_search_results, #artist_col_header_playlist').click(function(){
                music_controller.artist_sort.call(music_controller);
            });
            
            $('#album_col_header_search_results, #album_col_header_playlist').click(function(){
                music_controller.album_sort.call(music_controller);
            });
            
            $('#shuffle').click(function()
            {
//                music_controller.shuffle_playlist();
//                music_controller.shuffle = 1;
                var alerts = [ 
                    {num : 1, app:'helloworld'},
                    {num : 2, app:'helloagain'}
                ];
                    
                var test = {};
                test.parent = [];
                
                var sections = 3;
                for(var i = 0; i<=3; i++)
                    {
                        var node = {"node":[
                            {
                                "title": "Header2222", "contents": "lorem ipsum2222"
                            }
                        ]};
                        test.parent[i] = node;
                    }
                    
                alert(test.parent[0].node[1].title);
   
                var test_json = JSON.stringify(test);
                $('body').prepend(test_json);
               
                for (var item in test) {
                  //alert(test[item]);
                }
            });
            
            $('#shuffle_all').click(function()
            {
                music_controller.shuffle_all();
                music_controller.shuffle_all_bool = 1;
                return false
            });
        },
        
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
                    music_controller.play_from_playlist(arg[k]['location'], k)
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
        
        update_podcast_view : function(data)
        {
            
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
                //$('#album_art_container').append("<img id='album_art'src='"+music_model.playlist[music_controller.current].album_art+"'/>");
                
                var width;
                var height;
                var src = music_model.playlist[music_controller.current].album_art;
                var image = new Image();
                var max_size = 400;
                $(image).attr('src','');
                image.onload = function() {
                    width = $('#album_art').width();
                    height = $('#album_art').width();
                    if (height > max_size)
                    {
                        height = max_size;
                        $('#album_art').attr('height',height);
                    }
                    else if (width > max_size)
                    {
                        width = max_size;
                        $('#album_art').attr('width',width);
                    }
                };

                $(image).attr('id','album_art').attr('src',src);;
                $('#album_art_container').append(image);
            }
        }
    };//end view prototype
    
    
    
    /**********************************
     *
     *      Initialize!
     * 
     *********************************/
    
    music_controller.init_controller('#jquery_jplayer_1');
    
    music_view.init_view();
});
})(window);