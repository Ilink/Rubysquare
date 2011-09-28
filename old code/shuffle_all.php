<?php
include 'php/setup.php';
//error_reporting(E_ALL);


//$search_query = $_POST['search'];
$query = "SELECT COUNT(*) FROM music_test_2";
$result = mysql_query($query) or die(mysql_error());
$num_rows = mysql_result($result, 0);

$rand = '';
for ($i = 1; $i<=10; $i++)
{
    $rand .= rand(1, $num_rows);
    if($i != 10)
    {
        $rand .= ',';
    }
}


$sql = "SELECT * FROM music_test_2 WHERE id IN ($rand)";
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