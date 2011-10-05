//queing pseudo
$album.click()
{
	$.post('search_album.php', {search:data[k].album}, 
		function(data)
		{
			process_search(data);
			playlist = data;
			player.play(playlist[0]);
		}
	);
}