class Song < ActiveRecord::Base

  has_and_belongs_to_many :playlists
  validates :location, :presence => true

  #scope :filter_by_artist, lambda { |artist| where("artist = ?", artist) }
  # Select * from Songs where artist = 
end
