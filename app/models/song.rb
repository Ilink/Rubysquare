class Song < ActiveRecord::Base

  has_and_belongs_to_many :playlists
  validates :title, :presence => true
  validates :location, :presence => true

  

end
