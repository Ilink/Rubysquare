<?php
error_reporting(E_ALL);

include 'php/setup.php';

$sql = "SELECT * FROM podcasts";
$result = mysql_query($sql);
while($row = mysql_fetch_assoc($result)) 
{
    $rows[] = $row;
}

$i = 0;

foreach($rows as $key => $data)
{
    $xml_url = $data['feed_url'];
    $xml = simplexml_load_file($xml_url);
    if($xml === FALSE) 
    { 
       echo 'Failed</br>';
    }
    else 
    {
        foreach($xml->channel->item as $key2 => $data2)
        {
            $podcast_array[$i]['show_title'] = $show_title = $xml->channel->title;
            $podcast_array[$i]['location'] = $data2->enclosure['url'];
            $podcast_array[$i]['individual_title'] = $data2->title;
            $podcast_array[$i]['duration'] = $data2->children('http://www.itunes.com/dtds/podcast-1.0.dtd')->duration;
            $podcast_array[$i]['date'] = $date = $data2->pubDate;
            $i++;
            /*
            echo $data2->title."<br/>";
            echo $data2->enclosure['url']."<br/>";
            echo $data2->children('http://www.itunes.com/dtds/podcast-1.0.dtd')->duration."<br/>";
            echo $data2->pubDate."<br/>";
            echo "<br/><br/>";
            */
        }
    }
}
if(isset($podcast_array))
    {
        echo json_encode($podcast_array);
    }
?>