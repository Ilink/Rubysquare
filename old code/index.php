<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="stylesheet" type="text/css" href="style.css" />
<link href='http://fonts.googleapis.com/css?family=Droid+Sans:regular,bold' rel='stylesheet' type='text/css'/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title>Red Square Music Player</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.jsf" type="text/javascript"></script>
<script src="js/jquery-1.6.1.js" type="text/javascript"></script>
<script src="js/jplayer/jquery.jplayer.min.js" type="text/javascript"></script>
<script src="js/json2.js" type="text/javascript"></script>
<script src="js/id3-minimized.js" type="text/javascript"></script>
<script src="js/jquery-ui-1.8.12.custom.min.js" type="text/javascript"></script>
<script src="js/json_sans_eval.js" type="text/javascript"></script>
<script src="modelf.js" type="text/javascript"></script>
<script src="controller.js" type="text/javascript"></script>
<script src="viewf.js" type="text/javascript"></script>

<!--[if lt IE 9]>
<script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js" type="text/javascript"></script>
<![endif]-->


</head>

<body>

    <div><a id="shuffle_all">Shuffle library!</a></div>
    <div id="shuffle"><a>Shuffle</a></div>
    <div><a id="kalx">KALX!</a></div>
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
                <a class="jp-mute float_left">X</a>
                <a class="jp-unmute float_left">+</a>
                <div class="float_left" id="vol_slider_container"><div id="vol_slider"><div class="vol_background"></div></div></div>
                
                <!--<div class="jp-volume-bar">
                    <div class="jp-volume-bar-value"></div>
                </div>
                -->
            </div>
          </div>
          
        <ul class="jp-controls">
          <li><a class="jp-stop" tabindex="1">stop</a></li>
        </ul>
        
        
        <div class="jp-current-time"></div>
        <div class="jp-duration"></div>
      </div>
    </div>
  </div>
<div id="expanding_wrapper">
    
    <div id="current_song" class="center"></div>
    
    
    <div id="seek_bar"></div>
    <!-- jplayer seek bar 
    <div class="jp-progress">
          <div class="jp-seek-bar">
            <div class="jp-play-bar"></div>
          </div>
    </div>
    -->
    
    <div class="center" id="album_art_container"></div>

    <div id="search_container">
        <input type="text" name="search_box" value="david" id="search_box">
    </div>
    
    <div id="view_tabs_container">
        <a id="library_view">Library</a>
        <a id="search_results_view">Search Results</a>
        <a id="playlist_view">Playlist</a>
        <a id="podcasts_view">Podcasts</a>
    </div>
    
    <div id="search_results">
        <div id="column_titles">
            <div class="col title_col float_left pointer" view ="search_results" id="title_col_header_search_results">Title</div>
            <div class="col artist_col float_left pointer" view ="search_results" id="artist_col_header_search_results">Artist</div>
            <div class="col album_col float_left pointer" view ="search_results" id="album_col_header_search_results">Album</div>
            <div class="col length_col float_left" view ="search_results">Length</div>
            <div class='cleaner'></div>
        </div>
        <div id="search_result_elements"></div>
    </div>
    
    <div id="playlist">
        <div id="column_titles">
            <div class="col title_col float_left pointer" view ="playlist" id="title_col_header_playlist">Title</div>
            <div class="col artist_col float_left pointer" view ="playlist" id="artist_col_header_playlist">Artist</div>
            <div class="col album_col float_left pointer" view ="playlist" id="album_col_header_playlist">Album</div>
            <div class="col length_col float_left" view ="playlist">Length</div>
            <div class='cleaner'></div>
        </div>
        <div id="playlist_elements"></div>
    </div>
    
    <div id="podcasts">
        <div id="column_titles">
            <div class="col title_col float_left pointer" view ="podcasts" id="title_col_header_podcasts">Title</div>
            <div class="col artist_col float_left pointer" view ="podcasts" id="artist_col_header_podcasts">Artist</div>
            <div class="col album_col float_left pointer" view ="podcasts" id="album_col_header_podcasts">Album</div>
            <div class="col length_col float_left" view ="podcasts">Length</div>
            <div class='cleaner'></div>
        </div>
        <div id="playlist_elements"></div>
    </div>
    
    <div class='cleaner'>&nbsp;</div>
    
<!--<div id="center_page">
    
<div id="container">-->



<!--<div id="list">-->
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


<!--</div>end list-->
<!--</div>end container-->
<!--</div>end center page-->

</div><!--end expanding wrapper-->
</body>
</html>