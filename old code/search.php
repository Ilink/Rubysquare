<?php
include 'php/setup.php';
include('php/sphinxapi.php');

$search_query = $_POST['search'];
if($search_query != null)
{
    //Setup the Sphinx API
    $sp = new SphinxClient();
    $sp->setServer('localhost',9312);
    $sp->SetLimits(0,1000000);
    if($sp->IsConnectError())
    {
        echo 'connection error';
    }
    $sp->SetMatchMode( SPH_MATCH_ANY );

    $result = $sp->Query($search_query, 'red_index');
    foreach ($result['matches'] as $key =>$data)
    {
        //echo $key;#search result row ID
        $sql = "SELECT * FROM music_test_2 WHERE id = $key";
        $sql_result = mysql_query($sql) or die(mysql_error());

        while($row = mysql_fetch_assoc($sql_result)) 
        {
            $rows[] = $row;
        }
    }

    if(isset($rows))
    {
        echo json_encode($rows);
    }
}
?>