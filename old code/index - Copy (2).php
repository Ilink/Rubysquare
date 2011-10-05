<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="stylesheet" type="text/css" href="style.css" />
<link href='http://fonts.googleapis.com/css?family=Droid+Sans:regular,bold' rel='stylesheet' type='text/css'/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title>Red Square Music PLayer</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.jsf" type="text/javascript"></script>
<script src="js/jquery-1.6.1.js" type="text/javascript"></script>
<script src="js/jplayer/jquery.jplayer.min.js" type="text/javascript"></script>
<script src="js/json2.js" type="text/javascript"></script>
<script src="js/id3-minimized.js" type="text/javascript"></script>
<script src="js/jquery-ui-1.8.12.custom.min.js" type="text/javascript"></script>

<script src="modelf.js" type="text/javascript"></script>
<script src="controller.js" type="text/javascript"></script>
<script src="viewf.js" type="text/javascript"></script>

<!--[if lt IE 9]>
<script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js" type="text/javascript"></script>
<![endif]-->


</head>

<body>
    <div id="shuffle_all">Shuffle library!</div>
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
    
    <div id="view_tabs_container">
        <a id="library_view">Library</a>
        <a id="search_results_view">Search Results</a>
        <a id="playlist_view">Playlist</a>
    </div>
    
    <div id="search_results">
        <div id="column_titles">
            <div class="col title_col float_left pointer" id="title_col_header">Title</div>
            <div class="col artist_col float_left pointer" id="artist_col_header">Artist</div>
            <div class="col album_col float_left pointer" id="album_col_header">Album</div>
            <div class="col length_col float_left">Length</div>
            <div class='cleaner'></div>
        </div>
        <div id="search_result_elements"></div>
    </div>
    
    <div id="playlist">
        <div id="column_titles">
            <div class="col title_col float_left pointer" id="title_col_header">Title</div>
            <div class="col artist_col float_left pointer" id="artist_col_header">Artist</div>
            <div class="col album_col float_left pointer" id="album_col_header">Album</div>
            <div class="col length_col float_left">Length</div>
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
<p>Pargadfsafdsa</p>


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