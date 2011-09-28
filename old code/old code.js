<script type="text/javascript">

$(document).ready(function() {
    
        $( "#vol_slider" ).slider({
                            range:"min",
                            value:50,
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
 
	/***********************************
	*
		Music Player
	*
	***********************************/
        
	function music()
	{
		this.playlist = '';
                this.sort_direction = '';
                this.search_results = [];
		this.current = 0;
		this.length = 0;
		this.shuffle = 0;
                this.shuffle_all = 0;
                this.sort_by = 'artist';
                //initialize jplayer
		$("#jquery_jplayer_1").jPlayer({
                    ready: function () {
                    //mp3_obj = get_JSON();
                    //new_mp3 = mp3_obj.mp3;

                    $(this).jPlayer("setMedia", {
                            mp3: "http:\/\/www.jplayer.org\/audio\/mp3\/Miaow-01-Tempered-song.mp3"
                    });
                    },
                    ended: function()
                    {
                        
                    },
                    supplied: "mp3"
		});
	};
        
	/*******
	Methods
	*******/
	
	music.prototype.set_media = function(file_location)
	{
                song = {mp3: file_location};
		$("#jquery_jplayer_1").jPlayer("setMedia", song);
                
	}
	
	music.prototype.play = function()
	{
		$("#jquery_jplayer_1").jPlayer("play");
	}
	
	music.prototype.previous = function(data)
	{
		//if(this.current > 0)
                if(typeof this.playlist[this.current].location != 'undefined')
		{
			this.current--;
			this.set_media(this.playlist[this.current].location);
			this.play();
                        this.update_now_playing();
		}
	}
	
	music.prototype.next = function()
	{
		//if(this.current < this.length)
                //if(typeof this.playlist[this.current].location != 'undefined')
                if(this.shuffle_all != 1 && this.current != this.length)
		{
                    this.current++;
                    this.set_media(this.playlist[this.current].location);
                    this.play();
                    this.update_now_playing();
		}
                
                if(this.shuffle_all == 1 && this.current == this.length)
                {
                    this.current = 0;
                    shuffle_all();
                    this.update_now_playing();
                }
	}
        
        music.prototype.shuffle_playlist = function()
        {
            if (this.playlist != '')
            {
                var i = this.length - 1;
                for(i; i > -1; i--)
                {
                    var j = Math.floor(Math.random() * (i + 1))
                    var temp = this.playlist[i].location;
                    this.playlist[i].location = this.playlist[j].location;
                    this.playlist[j].location = temp;
                    //$('body').prepend(this.playlist[i].location+"<br/>");
                }
            }
        }
        
        music.prototype.update_now_playing = function()
        {
            if (typeof this.playlist[this.current].title != 'undefined')
            {
                //remove previous song title
                $('#current_song').empty();
                $('#current_song').append(this.playlist[this.current].title+"<br/>"+this.playlist[this.current].artist+"<br/>"+this.playlist[this.current].album);
                
                $('#album_art_container').empty();
                $('#album_art_container').append("<img src='"+this.playlist[this.current].album_art+"'/>");
            }
        }
        
        music.prototype.add_single_track = function(track)
        {
            $.post('search_track.php', {search:track}, 
		function(data)
                    {
                        music.playlist = $.parseJSON(data);
                        //alert(music.playlist[0].location);
                        music.length = music.playlist.length;
                        music.current = 0;
                        if (music.shuffle == 1)
                            {
                                music.shuffle_playlist();
                            }
                        music.set_media(music.playlist[music.current].location);
                        music.update_now_playing();
                        music.update_playlist_view(music.playlist);
                        music.play();
                    }
		);
        }
        
        music.prototype.update_playlist_view = function(data)
        {
            $('.playlist_row').remove(); //remove previous search results
                $.each(this.playlist, function(k, v)
                {
                    $('#playlist').append("<div id='playlist_row_"+k+"' class='playlist_row'>");
                    //var current = '#search_result_row'
                    var row_num = k+1;
                    $('#playlist_row_'+k).append(
                        "<div class='col title_col float_left' id='playlist_title_"+k+"'><a>"+data[k].title + "</a></div>"
                    );

                    $('#playlist_row_'+k).append(
                        "<div class='col artist_col float_left' id='playlist_artist_"+k+"'><a>"+data[k].artist + "</a></div>"
                    );

                    $('#playlist_row_'+k).append(
                        "<div class='col album_col float_left' id='playlist_album_"+k+"'><a>"+data[k].album + "</a></div>"
                    );

                    $('#playlist_row_'+k).append("</div>");
                    $('#search_result_row_'+k).append("<div class='cleaner'></div>");

                    /*
                    Click bindings for the search results
                    */
                    $('#playlist_title_'+k).dblclick(function()
                    {
                        //music.set_media('http:\/\/www.jplayer.org\/audio\/mp3\/Miaow-01-Tempered-song.mp3');
                        music.add_single_track(data[k].location);
                        //music.set_media(data[k].location);
                        music.shuffle_all = 0;
                        music.play();
                        return false
                    });

                    $('#playlist_album_'+k).dblclick(function()
                    {
                        //music.set_media('http:\/\/www.jplayer.org\/audio\/mp3\/Miaow-01-Tempered-song.mp3');
                        search_album(data[k].album);
                        music.update_playlist_view();
                        music.shuffle_all = 0;
                        return false
                    });

                    $('#playlist_artist_'+k).dblclick(function()
                    {
                        //music.set_media('http:\/\/www.jplayer.org\/audio\/mp3\/Miaow-01-Tempered-song.mp3');
                        search_artist(data[k].artist);
                        music.shuffle_all = 0;
                        return false
                    });
                });
        }
         /***********************************
	*	
	*	Sort Functions
	*
	***********************************/
        
        var sorter = function (direction, field)
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
        }
        
        /*
        music.prototype.sort_results = function(field)
        {
            var sort_elements = $('#search_result_elements div');
            //$('body').append(sort_elements.children('div').text());
            sort_elements.sort(function(a,b)
            {
                var fieldA = $(a).children('.album_col').text().toLowerCase();
                var fieldB = $(b).children('.album_col').text().toLowerCase();
                //fieldA = fieldA.toLowerCase();
                //fieldB = fieldB.toLowerCase();
                if (fieldA < fieldB) return -1
                if (fieldA > fieldB) return 1
                return 0
            });
            $('#search_result_elements').empty();
            $('#search_result_elements').append(sort_elements);
        }
        */
        
        music.prototype.resort_results = function(direction, field)
        {
            this.search_results.sort(sorter(direction, field));
            var parsed_data = this.search_results;
            $('.search_result_row').remove(); //remove previous search results
			$.each(parsed_data, function(k, v){
				$('#search_result_elements').append("<div id='search_result_row_"+k+"' class='search_result_row'>");
                                //var current = '#search_result_row'
                                var row_num = k+1;
                                $('#search_result_row_'+k).append(
                                    "<div class='col title_col float_left' id='playlist_title_"+k+"'><a>"+parsed_data[k].title + "</a></div>"
				);

                                $('#search_result_row_'+k).append(
                                    "<div class='col artist_col float_left' id='playlist_artist_"+k+"'><a>"+parsed_data[k].artist + "</a></div>"
                                    //"<a id='playlist_artist_"+k+"'>"+parsed_data[k].artist + "</a><br/><br/>"
				);
				
				$('#search_result_row_'+k).append(
                                    "<div class='col album_col float_left' id='playlist_album_"+k+"'><a>"+parsed_data[k].album + "</a></div>"
                                    //"<a id='playlist_album_"+k+"'>"+parsed_data[k].album + "</a><br/>"
				);
                                    
                                $('#search_result_row_'+k).append("</div>");
                                $('#search_result_row_'+k).append("<div class='cleaner'></div>");
                                    
                                /*
                                Click bindings for the search results
                                */
                                $('#playlist_title_'+k).dblclick(function()
				{
                                    //music.set_media('http:\/\/www.jplayer.org\/audio\/mp3\/Miaow-01-Tempered-song.mp3');
                                    //music.set_media(parsed_data[k].location);
                                    music.add_single_track(parsed_data[k].location);
                                    music.shuffle_all = 0;
                                    music.play();
                                    return false
				});
				
				$('#playlist_album_'+k).dblclick(function()
				{
                                    //music.set_media('http:\/\/www.jplayer.org\/audio\/mp3\/Miaow-01-Tempered-song.mp3');
                                    search_album(parsed_data[k].album);
                                    music.shuffle_all = 0;
                                    return false
				});
				
				
				$('#playlist_artist_'+k).dblclick(function()
				{
                                    //music.set_media('http:\/\/www.jplayer.org\/audio\/mp3\/Miaow-01-Tempered-song.mp3');
                                    search_artist(parsed_data[k].artist);
                                    music.shuffle_all = 0;
				});
                                /*
                                var file = parsed_data[k].location;
                                var file = "../music/temp.mp3"
                                ID3.loadTags(file, function() {
                                    var tags = ID3.getAllTags(file);
                                    $('body').append(tags.album);
                                });
                                */
			});
        }
        
        $('#title_col_header').click(function()
        {
            if(music.sort_direction != 'title_dsc') 
                {
                    music.resort_results('asc','title');
                    music.sort_direction = 'title_dsc';
                }
            else 
                {
                    music.resort_results('dsc','title');
                    music.sort_direction = 'title_asc';
                }
            return false
        });
        
        $('#artist_col_header').click(function()
        {
            if(music.sort_direction != 'artist_dsc') 
                {
                    music.resort_results('asc','artist');
                    music.sort_direction = 'artist_dsc';
                }
            else 
                {
                    music.resort_results('dsc','artist');
                    music.sort_direction = 'artist_asc';
                }
            return false
        });
        
        $('#album_col_header').click(function()
        {
            if(music.sort_direction != 'album_dsc') 
                {
                    music.resort_results('asc','album');
                    music.sort_direction = 'album_dsc';
                }
            else 
                {
                    music.resort_results('dsc','title');
                    music.sort_direction = 'title_asc';
                }
                return false
        });
        

	var music = new music();
        

	/***********************************
	*	
	*	Controls
	*
	***********************************/

	$('.jp-next').click(function ()
	{
            music.next();
            return false
	});
	
	$('.jp-previous').click(function () {
            music.previous();
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
        
        
        //$("#slider").slider();
        
        
        /***********************************
	*	
	*	Shuffle
	*
	***********************************/
       
        function shuffle_all()
        {
            $.post('php/shuffle_all.php', 
		function(data)
		{
                    if(data)
                    {
                        music.set_media(data);
                        music.playlist = $.parseJSON(data);
                        music.length = music.playlist.length;
                        music.current = 0;
                        music.set_media(music.playlist[music.current].location);
                        music.play();
                    }
		}
		);
        }
        
        $('#shuffle_all').click(function()
        {
            shuffle_all();
            music.shuffle_all = 1;
            return false
        });
            
        $("#jquery_jplayer_1").bind($.jPlayer.event.emptied, function() 
        {
            
        });
        
       
        
        
        
	
	/***********************************
	*	
	*	Search Functions
	*
	***********************************/
	
	function send_search(query)
	{
		$.post('search.php', {search:query}, 
		function(data)
		{
                    if(data)
                    {
                        process_search(data);
                    }
		}
		);
                //music.sort_search('album');
	}
        
        //Send search queries via JSON
        //SANITZE MY INPUT SOMETIME!
	$('#search_box').keyup(function()
	{
		if ($(this).val().length > 2)
                    {
			send_search($(this).val());
                    }
                    
                //clear the search results if nothing is in the search box
                if(!$(this).val())
                    {
                        //$('body').prepend('1__]')
                        //clear the search results
                    }
        });
	
	function search_album(album)
	{
		$.post('search_album.php', {search:album}, 
		function(data)
                    {
                        music.playlist = $.parseJSON(data);
                        //alert(music.playlist[0].location);
                        music.length = music.playlist.length;
                        music.current = 0;
                        if (music.shuffle == 1)
                            {
                                music.shuffle_playlist();
                            }
                        music.set_media(music.playlist[music.current].location);
                        music.update_now_playing();
                        music.update_playlist_view(music.playlist);
                        music.play();
                    }
		);
	}
	
	function search_artist(artist)
	{
		$.post('search_artist.php', {search:artist}, 
		function(data)
			{
                            if(data)
                            {
				music.playlist = $.parseJSON(data);
				music.length = music.playlist.length;
				music.current = 0;
				music.set_media(music.playlist[music.current].location);
                                music.update_playlist_view(music.playlist);
				music.play();
                            }
			}
		);
	}
	
        
	
        //process JSON data, display it on the page
	function process_search(data)
	{
		if (data) //make sure the value isnt null
		{
                       var parsed_data = eval("(" + data + ")");
                       parsed_data.sort(sorter('asc','artist'));
                       music.sort_direction = 'artist_asc';
                       music.search_results = parsed_data;
                       //sorter(parsed_data, 'asc', 'artist');

                        //alert(data);
                        $('.search_result_row').remove(); //remove previous search results
                        $.each(parsed_data, function(k){
                            $('#search_result_elements').append("<div id='search_result_row_"+k+"' class='search_result_row'>");
                            //var current = '#search_result_row'
                            var row_num = k+1;
                            $('#search_result_row_'+k).append(
                                "<div class='col title_col float_left' id='playlist_title_"+k+"'><a>"+parsed_data[k].title + "</a></div>"
                            );

                            $('#search_result_row_'+k).append(
                                "<div class='col artist_col float_left' id='playlist_artist_"+k+"'><a>"+parsed_data[k].artist + "</a></div>"
                                //"<a id='playlist_artist_"+k+"'>"+parsed_data[k].artist + "</a><br/><br/>"
                            );

                            $('#search_result_row_'+k).append(
                                "<div class='col album_col float_left' id='playlist_album_"+k+"'><a>"+parsed_data[k].album + "</a></div>"
                                //"<a id='playlist_album_"+k+"'>"+parsed_data[k].album + "</a><br/>"
                            );

                            $('#search_result_row_'+k).append("</div>");
                            $('#search_result_row_'+k).append("<div class='cleaner'></div>");

                            /*
                            Click bindings for the search results
                            */
                            $('#playlist_title_'+k).dblclick(function()
                            {
                                //music.set_media('http:\/\/www.jplayer.org\/audio\/mp3\/Miaow-01-Tempered-song.mp3');
                                //music.set_media(parsed_data[k].location);
                                music.add_single_track(parsed_data[k].location);
                                music.shuffle_all = 0;
                                music.play();
                                return false
                            });

                            $('#playlist_album_'+k).dblclick(function()
                            {
                                //music.set_media('http:\/\/www.jplayer.org\/audio\/mp3\/Miaow-01-Tempered-song.mp3');
                                search_album(parsed_data[k].album);
                                music.shuffle_all = 0;
                                return false
                            });


                            $('#playlist_artist_'+k).dblclick(function()
                            {
                                //music.set_media('http:\/\/www.jplayer.org\/audio\/mp3\/Miaow-01-Tempered-song.mp3');
                                search_artist(parsed_data[k].artist);
                                music.shuffle_all = 0;
                                return false
                            });
                            /*
                            var file = parsed_data[k].location;
                            var file = "../music/temp.mp3"
                            ID3.loadTags(file, function() {
                                var tags = ID3.getAllTags(file);
                                $('body').append(tags.album);
                            });
                            */
			});
                        return parsed_data;
		}
                else return false;
	}
        
        /*
        When the current song ends, advance to the next song and display the new song's information (title, etc)
        */
        $("#jquery_jplayer_1").bind($.jPlayer.event.ended, function() 
        {
            music.next();
        });
        
        
});//end
</script>
