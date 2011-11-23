class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me

  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates_presence_of :email
  validates_uniqueness_of :email

  # Associations
  has_many :playlists

  # Hooks
  after_create do |user|
    user.playlists.create(:title => '__now_playing__', :now_playing => true)
    Music.create(:title => "__main__")
  end

  def self.create_guest_user
    token = SecureRandom.base64(15).tr('+/=', 'xyz')
    user = ::User.new(email: "#{token}@example.net", password: token, password_confirmation: token)
    user
  end

end