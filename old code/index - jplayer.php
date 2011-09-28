<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="stylesheet" type="text/css" href="style.css" />
<link href='http://fonts.googleapis.com/css?family=Droid+Sans:regular,bold' rel='stylesheet' type='text/css'/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title>Red Square Music PLayer</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js" type="text/javascript"></script>
<script src="js/jplayer/jquery.jplayer.min.js" type="text/javascript"></script>
<script src="js/id3-minimized.js" type="text/javascript"></script>
<!--[if lt IE 9]>
<script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js" type="text/javascript"></script>
<![endif]-->

<script type="text/javascript">

$(document).ready(function() {
	/***********************************
	*
		Music Player
	*
	***********************************/
        
	function music()
	{
		this.playlist = '';
		this.current = 0;
		this.length = 0;
		this.shuffle = 0;
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
                        this.current++;
                        $('#current_song').replace(this.playlist[this.current].location);
                        alert('test');
                    },
                            supplied: "mp3"
		});
                



	};
        
         $("#jquery_jplayer_1").bind($.jPlayer.event.ended, function() {
                    $(this).jPlayer("play");
                    $('body').prepend('test');
                });
	
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
	
	music.prototype.playlist = function(data)
	{
            
	}
        
       
	
	music.prototype.previous = function(data)
	{
		if(this.current > 0)
		{
			this.current--;
			this.set_media(this.playlist[this.current].location);
			this.play();
		}
	}
	
	music.prototype.next = function(playlist)
	{
		if(this.current < this.length)
		{
			this.current++;
			this.set_media(this.playlist[this.current].location);
			this.play();
                        //this.display_current_track();
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
        
       

	
	var music = new music();

	
	/***********************************
	*	
	*	Controls
	*
	***********************************/

	$('.jp-next').click(function ()
	{
		music.next(music.playlist);	
	});
	
	$('.jp-previous').click(function () {
		music.previous(music.playlist);
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
	}
	
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
				music.play();
                            }
			}
		);
	}
	
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
	
	function process_search(data)
	{
		if (data) //make sure the value isnt null
		{
			data = $.parseJSON(data);
			$('.search_result_row').remove(); //remove previous search results
			$.each(data, function(k, v){
				$('#search_results').append("<div id='search_result_row_"+k+"' class='search_result_row'>");
                                //var current = '#search_result_row'
                                var row_num = k+1;
                                $('#search_result_row_'+k).append(
                                    "<div class='title_col float_left' id='playlist_title_"+k+"'><a>"+data[k].title + "</a></div>"
				);

                                $('#search_result_row_'+k).append(
                                    "<div class='artist_col float_left' id='playlist_artist_"+k+"'><a>"+data[k].artist + "</a></div>"
                                    //"<a id='playlist_artist_"+k+"'>"+data[k].artist + "</a><br/><br/>"
				);
				
				$('#search_result_row_'+k).append(
                                    "<div class='album_col float_left' id='playlist_album_"+k+"'><a>"+data[k].album + "</a></div>"
                                    //"<a id='playlist_album_"+k+"'>"+data[k].album + "</a><br/>"
				);
                                    
                                $('#search_result_row_'+k).append("</div>");
                                $('#search_result_row_'+k).append("<div class='cleaner'></div>");
                                    
                                $('#playlist_title_'+k).click(function()
				{
                                    //music.set_media('http:\/\/www.jplayer.org\/audio\/mp3\/Miaow-01-Tempered-song.mp3');
                                    music.set_media(data[k].location);
                                    music.play();
				});
				
				$('#playlist_album_'+k).click(function()
				{
                                    //music.set_media('http:\/\/www.jplayer.org\/audio\/mp3\/Miaow-01-Tempered-song.mp3');
                                    search_album(data[k].album);
				});
				
				
				$('#playlist_artist_'+k).click(function()
				{
					//music.set_media('http:\/\/www.jplayer.org\/audio\/mp3\/Miaow-01-Tempered-song.mp3');
					search_artist(data[k].artist);
				});
                                /*
                                var file = data[k].location;
                                var file = "../music/temp.mp3"
                                ID3.loadTags(file, function() {
                                    var tags = ID3.getAllTags(file);
                                    $('body').append(tags.album);
                                });
                                */
			});
                        return data;
		}
                else return false;
		
	}
});
</script>

</head>

<body>
    Red Square
    
    
    <div id="jquery_jplayer_1" class="jp-jplayer"></div>
  <div class="jp-audio">
    <div class="jp-type-single">
      <div id="jp_interface_1" class="jp-interface">
          
          <div id="controls"class="center">
            <a class="jp-previous" tabindex="1">previous</a>
            <a class="jp-play center" tabindex="1">play</a>
            <a class="jp-pause" tabindex="1">pause</a>
            <a class="jp-next" tabindex="1">next</a>
            <!--right side-->
            <div class="right float_right">
                <a class="jp-previous" tabindex="1">previous</a>
            </div>
          </div>
          
          
        <ul class="jp-controls">
          
        
          <li><a class="jp-stop" tabindex="1">stop</a></li>
          <li><a class="jp-mute" tabindex="1">mute</a></li>
          <li><a class="jp-unmute" tabindex="1">unmute</a></li>
        </ul>
        
        <div class="jp-volume-bar">
          <div class="jp-volume-bar-value"></div>
        </div>
        <div class="jp-current-time"></div>
        <div class="jp-duration"></div>
      </div>
    </div>
  </div>
<div id="expanding_wrapper">
    
    <div id="current_song" class="center">Nick Cave</div>
    
    <!-- jplayer seek bar -->
    <div class="jp-progress">
          <div class="jp-seek-bar">
            <div class="jp-play-bar"></div>
          </div>
    </div>
    
    <div id="album_art_container">
        
    </div>
    
    <div id="search_container">
        <input type="text" name="search_box" value="myth" id="search_box">
    </div>
<!--
    <div id="search_results">
        <div class="title_col float_left">
            <div class="title_entry_top">Title</div>
            <div class="title_entry">title A</div>
        </div>

        <div class="artist_col float_left">
            <div class="artist_entry_top">Artist</div>
            <div class="artist_entry">artist A</div>
        </div>

        <div class="album_col float_left">
            <div class="album_entry_top">Album</div>
            <div class="album_entry">album A</div>
        </div>

         <div class="title_col float_left">
            <div class="length_entry_top">Length</div>
            <div class="length_entry">length A</div>
        </div>
    </div>
    -->
    <div id="search_results">
        <div id="column_titles">
            <div class="title_col float_left">Title</div>
            <div class="artist_col float_left">Artist</div>
            <div class="album_col float_left">Album</div>
            <div class="length_col float_left">Length</div>
            <div class='cleaner'></div>
        </div>
        
        <div class="search_result_row">
            <div class="title_col float_left">Title</div>
            <div class="artist_col float_left">Artist</div>
            <div class="album_col float_left">Album</div>
            <div class="length_col float_left">Length</div>
        </div>
    </div>
    
    <div class='cleaner'>&nbsp;</div>
    
<!--<div id="center_page">
    
<div id="container">-->



<div id="list">
<?php
include 'php/setup.php';
$result = mysql_query('SELECT * FROM music_test_2 LIMIT 10') 
or die(mysql_error());  
/*
echo 
	"<table>
	<tr>
	<th>location</th>
	<th>title</th>
	<th>artist</th>
	<th>album</th>
	</tr>";

while($row = mysql_fetch_array($result))
{
	echo "<tr>";
	echo "<td>" . $row['location'] . "</td>";
	echo "<td>" . $row['title'] . "</td>";
	echo "<td>" . $row['artist'] . "</td>";
	echo "<td>" . $row['album'] . "</td>";
	echo "</tr>";
}
echo "</table>";
 
 */
?>
<br/><br/>


</div><!--end list-->
<!--</div>end container-->
<!--</div>end center page-->



</div><!--end expanding wrapper-->
<!--[if lte IE 6]>
    <script language="javascript" type="text/javascript">
        //this is a conditional comment that only IE understands. If a user using IE 6 or lower 
         //views this page, the following code will run. Otherwise, it will appear commented out.
        //it goes after the body tag so it can fire after the page loads.
        fixPngs();
    </script> 
<![endif]-->
</body>
</html>