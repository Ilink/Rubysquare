<?php
include 'php/setup.php';
$search_query = $_POST['search'];
//strip out the +'s that replace spaces
$search_query = str_replace('+', ' ', $search_query);
//$sql = "SELECT location FROM music_test_2 WHERE MATCH (artist) AGAINST ('$search_query' IN NATURAL LANGUAGE MODE) ORDER BY track_number";
$sql = "SELECT * FROM music_test_2 WHERE artist = '$search_query' ORDER BY track_number";
$result = mysql_query($sql) or die(mysql_error());

while($row = mysql_fetch_assoc($result)) 
{
    $rows[] = $row;
}

//only get the mp3 locations
if(isset($rows))
    {
        echo json_encode($rows);
    }
?>