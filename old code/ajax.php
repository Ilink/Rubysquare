<?php
if (isset($_POST))
{
    $value = $_POST['send'];
}
else
{
	//this might produce an error later
    $value = "";
}

//echo json_encode(array("title"=>"test", "mp3"=>"http://www.jplayer.org/audio/mp3/Miaow-01-Tempered-song.mp3"));
echo json_encode(array("title"=>"test", "mp3"=>"http://www.drawuslines.com/wp-content/themes/digg-3-col/music/Earth%20Died%20Screaming.mp3"));
?>