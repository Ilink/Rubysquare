class Playlist < ActiveRecord::Base
  has_and_belongs_to_many :songs
  belongs_to :user
  
  validates :title, :presence => true

  scope :not_now_playing, lambda { |user_id|
      where("user_id = ? AND ID NOT IN (1)", user_id )
  }

  scope :now_playing, lambda { |user_id|
    where("user_id = ? AND ID = (1)", user_id )
  }

  scope :current_user, where("user_id = 1")

end
