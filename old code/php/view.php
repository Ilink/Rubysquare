<?php
include 'setup.php';
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

// $query = "INSERT INTO music_test_1(location, title, artist, album) VALUES('temp', '5 years', 'david bowie', 'ziggy stardust')";
// echo $query;
// mysql_query($query) or die(mysql_error());

$search_query = "magna";
$sql = "SELECT * FROM music_test_1 WHERE MATCH(title, artist, album) AGAINST ('david' IN NATURAL LANGUAGE MODE)";
echo $sql;
$result = mysql_query($sql) or die(mysql_error());
echo "<br/><br/>Search Results:<br/>";
while($row = mysql_fetch_array($result))
{
	echo "<tr>";
	echo "<td>" . $row['location'] . "</td>";
	echo "<td>" . $row['title'] . "</td>";
	echo "<td>" . $row['artist'] . "</td>";
	echo "<td>" . $row['album'] . "</td>";
	echo "</tr>";
}


?>