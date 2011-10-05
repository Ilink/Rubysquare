<?php
include 'setup.php';
$earth_died_screaming = mysql_escape_string('http://www.drawuslines.com/wp-content/themes/digg-3-col/music/Earth%20Died%20Screaming.mp3');

$url = 'http://www.drawuslines.com/wp-content/themes/digg-3-col/music/Earth%20Died%20Screaming.mp3';
$clean_url = mysql_real_escape_string($url, $link);

$file = '01 Magna for Annie, Josh, and Robin.mp3';
$file = mysql_real_escape_string($file);
$file = addslashes($file);
echo $file ."<br/>";

$query = "INSERT INTO music_test_1(location, title, artist, album) VALUES('$file', 'Earth Died Screaming', 'Tom Waits', 'Bone Machine')";
$query = "INSERT INTO music_test_1(location, title, artist, album) VALUES('test', 'true love', 'david bowie', 'ziggy stardust')";
echo $query;
mysql_query($query) or die(mysql_error());



?>