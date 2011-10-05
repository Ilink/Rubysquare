$(document).ready(function() {
    
    function music_view()
    {
        //Properties
        
        
        //Methods
        function update_playlist_view(data)
        {
            $('.playlist_row').remove(); //remove previous search results
            $.each(this.playlist, function(k)
            {
                $('#playlist').append("<div id='playlist_row_"+k+"' class='playlist_row'>");

                $('#playlist_row_'+k).append(
                    "<div class='col title_col float_left' id='playlist_title_"+k+"'><a>"+data[k].title + "</a></div>"
                );

                $('#playlist_row_'+k).append(
                    "<div class='col artist_col float_left' id='playlist_artist_"+k+"'><a>"+data[k].artist + "</a></div>"
                );

                $('#playlist_row_'+k).append(
                    "<div class='col album_col float_left' id='playlist_album_"+k+"'><a>"+data[k].album + "</a></div>"
                );

                $('#playlist_row_'+k).append("</div>");
                $('#search_result_row_'+k).append("<div class='cleaner'></div>");

                /*
                Click bindings for the search results
                */
                $('#playlist_title_'+k).dblclick(function()
                {
                    music.add_single_track(data[k].location);
                    music.play();
                    return false
                });

                $('#playlist_album_'+k).dblclick(function()
                {
                    search_album(data[k].album);
                    music.update_playlist_view();
                    return false
                });

                $('#playlist_artist_'+k).dblclick(function()
                {
                    search_artist(data[k].artist);
                    return false
                });
            });
        }
        
        function update_search_results(data)
        {
            $('.search_result_row').remove(); //remove previous search results
            $.each(data, function(k){
                $('#search_result_elements').append("<div id='search_result_row_"+k+"' class='search_result_row'>");
                //var current = '#search_result_row'
                var row_num = k+1;
                $('#search_result_row_'+k).append(
                    "<div class='col title_col float_left' id='playlist_title_"+k+"'><a>"+data[k].title + "</a></div>"
                );

                $('#search_result_row_'+k).append(
                    "<div class='col artist_col float_left' id='playlist_artist_"+k+"'><a>"+data[k].artist + "</a></div>"
                    //"<a id='playlist_artist_"+k+"'>"+data[k].artist + "</a><br/><br/>"
                );

                $('#search_result_row_'+k).append(
                    "<div class='col album_col float_left' id='playlist_album_"+k+"'><a>"+data[k].album + "</a></div>"
                    //"<a id='playlist_album_"+k+"'>"+data[k].album + "</a><br/>"
                );

                $('#search_result_row_'+k).append("</div>");
                $('#search_result_row_'+k).append("<div class='cleaner'></div>");

                /*
                Click bindings for the search results
                */
                $('#playlist_title_'+k).dblclick(function()
                {
                    //music.set_media('http:\/\/www.jplayer.org\/audio\/mp3\/Miaow-01-Tempered-song.mp3');
                    //music.set_media(data[k].location);
                    music.add_single_track(data[k].location);
                    music.shuffle_all = 0;
                    music.play();
                    return false
                });

                $('#playlist_album_'+k).dblclick(function()
                {
                    //music.set_media('http:\/\/www.jplayer.org\/audio\/mp3\/Miaow-01-Tempered-song.mp3');
                    search_album(data[k].album);
                    music.shuffle_all = 0;
                    return false
                });


                $('#playlist_artist_'+k).dblclick(function()
                {
                    //music.set_media('http:\/\/www.jplayer.org\/audio\/mp3\/Miaow-01-Tempered-song.mp3');
                    search_artist(data[k].artist);
                    music.shuffle_all = 0;
                    return false
                });
                /*
                var file = data[k].location;
                var file = "../music/temp.mp3"
                ID3.loadTags(file, function() {
                    var tags = ID3.getAllTags(file);
                    $('body').append(tags.album);
                });
                */
            });
        }
        
    }
    var music_view = new music_view();
    
    $('#search_box').keyup(function()
    {
        music_controller.search_box_controller('#search_box');
    });
    
    $('.jp-next').click(function ()
    {
        music.next();
        return false
    });
	
    $('.jp-previous').click(function () 
    {
        music.previous();
        return false
    });

    $('#library_view').click(function()
    {
        $('#search_results, #playlist').hide();
        return false
        //$('#library').show();
    });

    $('#playlist_view').click(function()
    {
        $('#search_results, #library').hide();
        $('#playlist').show();
        return false
    });

    $('#search_results_view').click(function()
    {
        $('#library, #playlist').hide();
        $('#search_results').show();
        return false
    });
    
    $('#title_col_header').click(music_controller.title_sort());
    
    $('#artist_col_header').click(music_controller.artist_sort());
    
    $('#album_col_header').click(music_controller.album_sort());

    
    /*
    $('#shuffle_all').click(function()
    {
        shuffle_all();
        music.shuffle_all = 1;
        return false
    });
     */
});