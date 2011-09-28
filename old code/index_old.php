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
<!--[if lt IE 9]>
<script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js" type="text/javascript"></script>
<![endif]-->

<script type="text/javascript">

$(document).ready(function() {
	/***********************************
	*	Music Player
	*
	***********************************/
	
	
	function plist()
	{
		var self = this;
		this.property = 'prop';
		$('#list').click(function()
		{
			alert(self.property);
		})
		
		
		
		
	};
	
	$("#jquery_jplayer_1").jPlayer({
		ready: function () {
		  $(this).jPlayer("setMedia", {
			mp3: "http://www.jplayer.org/audio/m4a/Miaow-07-Bubble.m4a"
		  });
		},
		swfPath: "js/jplayer",
		supplied: "mp3"
		});
		$("#jquery_jplayer_1").jPlayer("play");

	var plist1 = new plist();
	
	/***********************************
	*	AJAX Playlist Functions
	*
	***********************************/
	
	function get_JSON()
	{
		$.ajax
		({ 
			type: "POST", 
			url: "ajax.php", 
			data: {'send': 'test'},
			dataType:"json",
			async: false,
			success: function(msg) 
			{
				playlist_json = msg; 
			}
		}); 
			return playlist_json; 
	}
	
	//var playlist_json = get_JSON();
	/*
	audioPlaylist = new Playlist("1", 
	//json obtained by ajax
	//[playlist_json],
	//options
	{
		ready: function() {
			audioPlaylist.displayPlaylist();
			audioPlaylist.playlistInit(false); // Parameter is a boolean for autoplay.
		},
		ended: function() {
			audioPlaylist.playlistNext();
		},
		play: function() {
			$(this).jPlayer("pauseOthers");
		},
		swfPath: "js/jplayer",
		supplied: "mp3"
	});
	*/
	
	
	/***********************************
	*	Search Functions
	*
	***********************************/
	
	function send_search(query)
	{
		$.post('search.php', {search:query}, 
		function(data)
		{
			process_search(data);
		}
		);
	}
	
	function set_playlist()
	{
		audioPlaylist.playlist = [{"title":"TRIUMPH","mp3":"http:\/\/www.jplayer.org\/audio\/mp3\/Miaow-01-Tempered-song.mp3"}];
		//alert('test');
	}
	//set_playlist();
	
	
	//audioPlaylist.playlist = "test";
	$('body').live('click', function() 
	{
		//audioPlaylist.playlist = [{"title":"TRIUMPH","mp3":"http:\/\/www.jplayer.org\/audio\/mp3\/Miaow-01-Tempered-song.mp3"}];
		//audioPlaylist.change_playlist();
		//set_playlist();
		//audioPlaylist.playlist = "test";
		//alert(audioPlaylist.playlist);
		//var playlist_json = get_JSON();
		//audioPlaylist
		//audioPlaylist.alter_playlist("test");
		
		
		//playlist_json = data;
	});
	
	
	//playlist_json = 
	
	$('#search_box').keyup(function()
	{
		if ($(this).val().length > 3)
		{
			send_search($(this).val());
		}
		set_playlist();
    });
	
	function process_search(data)
	{
		if (data != "null") //make sure the value isnt null
		{
			$('#search_results').replaceWith("<div id='test'>"+data+"</div>");
		}
		return data;
		
	}
	
});
</script>

<script type="text/javascript">
$(document).ready(function(){
  $("#jquery_jplayer_1").jPlayer({
	ready: function () {
	  $(this).jPlayer("setMedia", {
		m4a: "http://www.jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
		oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
	  });
	},
	swfPath: "/js",
	supplied: "m4a, oga"
  });
});
</script>



</head>

<body>

<div id="center_page">
<div id="container">

<label for="search_box">Enter a value : </label>
<input type="text" name="search_box" value="" id="search_box">



<div id="jquery_jplayer_1" class="jp-jplayer"></div>
  <div class="jp-audio">
    <div class="jp-type-single">
      <div id="jp_interface_1" class="jp-interface">
        <ul class="jp-controls">
          <li><a href="#" class="jp-play" tabindex="1">play</a></li>
          <li><a href="#" class="jp-pause" tabindex="1">pause</a></li>
          <li><a href="#" class="jp-stop" tabindex="1">stop</a></li>
          <li><a href="#" class="jp-mute" tabindex="1">mute</a></li>
          <li><a href="#" class="jp-unmute" tabindex="1">unmute</a></li>
        </ul>
        <div class="jp-progress">
          <div class="jp-seek-bar">
            <div class="jp-play-bar"></div>
          </div>
        </div>
        <div class="jp-volume-bar">
          <div class="jp-volume-bar-value"></div>
        </div>
        <div class="jp-current-time"></div>
        <div class="jp-duration"></div>
      </div>
      <div id="jp_playlist_1" class="jp-playlist">
        <ul>
          <li>Bubble</li>
        </ul>
      </div>
    </div>
  </div>
<div id="list">
<?php
include 'php/setup.php';
$result = mysql_query('SELECT * FROM music_test_1') 
or die(mysql_error());  

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
?>


<div id="search_results">
</div>


</div>
</div><!--end container-->
</div><!--end center page-->


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
