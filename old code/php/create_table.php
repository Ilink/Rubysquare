<?php
include 'setup.php';

$table = "music_test_1";
mysql_query("CREATE TABLE IF NOT EXISTS $table(
id INT NOT NULL AUTO_INCREMENT, 
PRIMARY KEY(id),
 location VARCHAR(1000), 
 title VARCHAR(400),
 artist VARCHAR(200),
 album VARCHAR(200)
 )")
 or die(mysql_error());  

echo "table created";
?>