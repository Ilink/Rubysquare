<?php
$link = mysql_connect('localhost', 'red_admin', 'naiknil1');
if (!$link) {
    die('Not connected : ' . mysql_error());
}

$db_selected = mysql_select_db('red', $link);
if (!$db_selected) {
    die ('Can\'t use $db : ' . mysql_error());
}

//echo "Connected to db<br />";
?>