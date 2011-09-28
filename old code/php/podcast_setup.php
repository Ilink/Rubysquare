<?php
include('setup.php');
$query = "DROP TABLE IF EXISTS podcasts";
mysql_query($query)or die(mysql_error());  

$sql = "CREATE TABLE IF NOT EXISTS podcasts (id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id), title VARCHAR(500), feed_url VARCHAR(5000))";
mysql_query($sql) or die(mysql_error());

$url = 'http://feeds.feedburner.com/tedtalks_audio.xml';
$sql = "INSERT INTO podcasts (title, feed_url) VALUES('TED Talks Podcast', '$url')";
echo $sql."<br/>";
mysql_query($sql) or die(mysql_error());

$url = 'http://feeds.newyorker.com/services/rss/feeds/fiction_podcast.xml';
$sql = "INSERT INTO podcasts (title, feed_url) VALUES('The New Yorker Fiction Podcast', '$url')";
echo $sql."<br/>";
mysql_query($sql) or die(mysql_error());

$url = 'http://www.newyorker.com/services/mrss/feeds/newyorker_outloud.xml';
$sql = "INSERT INTO podcasts (title, feed_url) VALUES('New Yorker Out Loud Podcast', '$url')";
echo $sql."<br/>";
mysql_query($sql) or die(mysql_error());

$url = 'http://www.newyorker.com/services/mrss/feeds/comment_podcast.xml';
$sql = "INSERT INTO podcasts (title, feed_url) VALUES('New Yorker Comment Podcast', '$url')";
echo $sql."<br/>";
mysql_query($sql) or die(mysql_error());
?>