class Playlist < ActiveRecord::Base
  has_and_belongs_to_many :songs
  belongs_to :user
  
  validates :title, :presence => true

  @playlists = Playlist.all
  @test = 'test'
end
