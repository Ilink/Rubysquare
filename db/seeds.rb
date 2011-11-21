# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

song_locations = [
  'http://www.podtrac.com/pts/redirect.mp3/downloads.newyorker.com/mp3/outloud/111107_outloud_mendelsohn.mp3',
  'http://www.podtrac.com/pts/redirect.mp3/downloads.newyorker.com/mp3/outloud/111024_outloud_batuman.mp3',
  'http://www.podtrac.com/pts/redirect.mp3/downloads.newyorker.com/mp3/campaign/111103_politicalscene.mp3',
  'http://www.podtrac.com/pts/redirect.mp3/downloads.newyorker.com/mp3/campaign/111027_politicalscene.mp3',
  'http://www.podtrac.com/pts/redirect.mp3/downloads.newyorker.com/mp3/fiction/111018_fiction_mccann.mp3',
  'http://www.podtrac.com/pts/redirect.mp3/downloads.newyorker.com/mp3/fiction/110819_fiction_rushdie.mp3'
]

song_locations2 = [
    {
      "title" => ''
    }
]

Song.delete_all
for i in 1..100
  Song.create(
    :title => "Podcast #{i}",
    :artist => "The New Yorker #{i}",
    :album => "",
    :location => song_locations[rand(6)] # rand goes from 0 to arg-1, so this has a range of 0 to 5
  )
end