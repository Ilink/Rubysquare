# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Song.delete_all
for i in 1..100
  Song.create(
    :title => "Song #{i}",
    :artist => "Artist #{i}",
    :album => "Album #{i}",
    :location => "localhost/songs/file#{i}.mp3"
  )
end