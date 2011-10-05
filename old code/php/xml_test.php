<?php
//taken from Chryp and then modified
function sanitize($string) {
    $strip = array("~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "=", "+", "[", "{", "]",
                   "}", "\\", "|", ";", ":", "\"", "'", "&#8216;", "&#8217;", "&#8220;", "&#8221;", "&#8211;", "&#8212;",
                   "â€”", "â€“", ",", "<", ".", ">", "/", "?");
    $clean = trim(str_replace($strip, "", strip_tags($string)));
    return $clean;
}

include("PlistParser.inc");
include 'setup.php';
require_once('get_id3/getid3/getid3.php');
error_reporting(E_ALL);
$parser = new plistParser();
$plist = $parser->parse(dirname(__FILE__) . "/library2.xml");
$getID3 = new getID3;
/*

$file = ('L:/Music/temp.mp3');
$fileinfo = $getID3->analyze($file);
echo "temp";
    echo "<pre>";
    print_r($fileinfo);
    echo "</pre>";

$picture = @$fileinfo['id3v2']['APIC'][0]['data'];
$handle = fopen("L:/Music/test.jpg", "w");
fwrite($handle, $picture);
fclose($handle);
 
 */

//echo $picture;

//echo "<br/>".getcwd()."<br/>";
//
//create table
$table = "music_test_2";
$query = "DROP TABLE IF EXISTS $table";
mysql_query($query)
	or die(mysql_error());  

$query = 
	"CREATE TABLE IF NOT EXISTS $table(
	id INT NOT NULL AUTO_INCREMENT, 
	PRIMARY KEY(id),
	location VARCHAR(5000), 
	title VARCHAR(500),
	artist VARCHAR(500),
	album VARCHAR(500),
	year INT,
	genre VARCHAR(500),
	format VARCHAR(500),
	track_number INT,
        length INT,
        album_art VARCHAR(5000)
)engine = myisam";

mysql_query($query)
	or die(mysql_error());  

$sql = "CREATE FULLTEXT INDEX index_all ON music_test_2 (title, artist, album)"; 
mysql_query($sql) or die(mysql_error());
$sql = "CREATE FULLTEXT INDEX index_album ON music_test_2 (album)"; 
mysql_query($sql) or die(mysql_error());
$sql = "CREATE FULLTEXT INDEX index_artist ON music_test_2 (artist)";
mysql_query($sql) or die(mysql_error());


foreach ($plist["Tracks"] as $tracks)
{
        if(isset($tracks['Name']))
        {
            $title = mysql_real_escape_string($tracks['Name']);
        }
        else
        {
            $title = '';
        }
        
        if(isset($tracks['Artist']))
        {
            $artist = mysql_real_escape_string($tracks['Artist']);
        }
        else
        {
            $artist ='';
        }
        
        if(isset($tracks['Track Number']))
        {
            $track_number = mysql_real_escape_string($tracks['Track Number']);
        }
        else
        {
            $track_number = 0;
        }
        
        if(isset($tracks['Year']))
        {
            $year = mysql_real_escape_string($tracks['Year']);
        }
        else
        {
            $year=0;
        }
        
        if(isset($tracks['Album']))
        {
            $album = mysql_real_escape_string($tracks['Album']);
        }
        else
        {
            $album='';
        }
        
        if(isset($tracks['Genre']))
        {
            $genre = mysql_real_escape_string($tracks['Genre']);
        }
        else
        {
            $genre='';
        }
        
        if(isset($tracks['Total Time']))
        {
            $length = mysql_real_escape_string($tracks['Total Time']);
        }
        else
        {
            $length=0;
        }
        
	$format = $tracks['Kind'];
	if ($format == 'MPEG audio file')
	{
		$format = 'mp3';
	}
	$format = mysql_real_escape_string($format);
	$location = mysql_real_escape_string($tracks['Location']);
        
        $file = "L:/".$location;
        $file = urldecode($file);
        $fileinfo = $getID3->analyze($file);
        if (isset($fileinfo))
        {
            /*
            echo "<pre>";
            print_r($fileinfo);
            echo "</pre>";
            */
        }
        
        $picture = @$fileinfo['id3v2']['APIC'][0]['data'];
        if (!empty($album))
        {
            $album_clean = sanitize($album);
            if (!empty($picture) && !file_exists("L:/Music/album_art_test/".$album_clean.".jpg"))
            {
                $handle = fopen("L:/Music/album_art_test/".$album_clean.".jpg", "x");
                if ($handle)
                {
                    fwrite($handle, $picture);
                    fclose($handle);
                }
            }
            $album_art = rawurlencode("music/album_art_test/".$album_clean.".jpg");
        }
        
        elseif (!empty($title))
        {
            $title_clean = sanitize($title);
            if (!empty($picture) && !file_exists("L:/Music/album_art_test/".$title_clean.".jpg"))
            {
                $handle = fopen("L:/Music/album_art_test/".$title_clean.".jpg", "x");
                if ($handle)
                {
                    fwrite($handle, $picture);
                    fclose($handle);
                }
            }
            $album_art = rawurlencode("music/album_art_test/".$title_clean.".jpg");
        }
        if(empty($picture))
        {
            $album_art = rawurlencode("music/album_art_test/no_art.png");
        }
        
        //because rawurlencode is stupid, we have to add the forward slashes back in
        $album_art = str_replace ('%2F', '/', $album_art);
	
	//Build SQL query for current track
	$query = "INSERT INTO music_test_2 (title, artist, track_number, year, album, genre, format, location, length, album_art) 
	VALUES('$title', '$artist', '$track_number', '$year', '$album', '$genre', '$format', '$location', '$length', '$album_art')";
	echo "<br/>$query<br/>";
	mysql_query($query) or die(mysql_error());  
	
}

//echo "<pre>"; print_r($plist); echo "</pre>";
?>