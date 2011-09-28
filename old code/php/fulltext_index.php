<?php
include 'setup.php';
$sql = "CREATE FULLTEXT INDEX index_all ON music_test_2 (title, artist, album)"; 
//$sql = "CREATE FULLTEXT INDEX index_album ON music_test_2 (album)"; 
$result = mysql_query($sql) or die(mysql_error());


?>