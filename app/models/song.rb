class Song < ActiveRecord::Base

  has_and_belongs_to_many :playlists
  validates_presence_of :title, :location
  
end
