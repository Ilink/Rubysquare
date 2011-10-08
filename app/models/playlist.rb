class Playlist < ActiveRecord::Base
  has_and_belongs_to_many :songs
  belongs_to :user
  
  validates :title, :presence => true

  @playlists = Playlist.all
  #@playlists = Playlist.find_all_by_user_id(current_user.id)
end
