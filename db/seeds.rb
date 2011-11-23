# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

song_locations = [
  {
    "title" => 'Daniel Mendelsohn on the Illiad',
    "artist" => 'The New Yorker',
    "album" => 'The New Yorker Outloud',
    "location" => 'http://www.podtrac.com/pts/redirect.mp3/downloads.newyorker.com/mp3/outloud/111107_outloud_mendelsohn.mp3'
  },
  {
    "title" => 'Elif Batuman on Biodiversity',
    "artist" => 'The New Yorker',
    "album" => 'The New Yorker Outloud',
    "location" => 'http://www.podtrac.com/pts/redirect.mp3/downloads.newyorker.com/mp3/outloud/111024_outloud_batuman.mp3'
  },
  {
      "title" => 'Occupy Wallstreet',
      "artist" => 'The New Yorker',
      "album" => 'The Political Scene',
      "location" => 'http://www.podtrac.com/pts/redirect.mp3/downloads.newyorker.com/mp3/campaign/111103_politicalscene.mp3'
  },
  {
      "title" => 'Discussion of the Republican Field',
      "artist" => 'The New Yorker',
      "album" => 'The Political Scene',
      "location" => 'http://www.podtrac.com/pts/redirect.mp3/downloads.newyorker.com/mp3/campaign/111027_politicalscene.mp3'
  },
  {
      "title" => 'Colum McCann reads Benedict Kiely',
      "artist" => 'The New Yorker',
      "album" => 'The New Yorker Fiction',
      "location" => 'http://www.podtrac.com/pts/redirect.mp3/downloads.newyorker.com/mp3/fiction/111018_fiction_mccann.mp3'
  },
  {
      "title" => 'Salman Rushdie reads Donald Barthelme',
      "artist" => 'The New Yorker',
      "album" => 'The New Yorker Fiction',
      "location" => 'http://www.podtrac.com/pts/redirect.mp3/downloads.newyorker.com/mp3/fiction/110819_fiction_rushdie.mp3'
  }
]

@podcast = Podcast.create(
    :title => "The New Yorker",
    :url => "www.newyorker.com"
)

@music = Music.create(
    :title => "Library",
    :url => ""
)

Song.delete_all
for i in 1..100
  rand_song = song_locations[rand(6)] # rand goes from 0 to arg-1, so this has a range of 0 to 5
  @song = Song.new(
    :title => rand_song['title'],
    :artist => rand_song['artist'],
    :album => rand_song['album'],
    :location => rand_song['location']
  )
  @song.audio = @podcast
  @song.save!
end