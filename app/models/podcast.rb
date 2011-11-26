class Podcast < ActiveRecord::Base
  has_many :songs, :as => :audio

  validates :title, :presence => true, :uniqueness => true
  validates :url, :presence => true
end
