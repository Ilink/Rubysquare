class Playlist < ActiveRecord::Base
  has_and_belongs_to_many :songs
  belongs_to :user
  
  validates :title, :presence => true

  scope :not_now_playing, lambda { |user_id|
    where("user_id = ? AND now_playing = false", user_id )
  }

  scope :now_playing, lambda { |user_id|
    where("user_id = ? AND now_playing = true", user_id )
  }

  scope :current_user, lambda{ |user_id|
    where("user_id = ?", user_id)
  }

end
