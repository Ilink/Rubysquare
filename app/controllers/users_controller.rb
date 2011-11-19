class UsersController < ApplicationController

  before_filter :authenticate_user!, :except => [:guest_sign_in] # don't authenticate this method
  def guest_sign_in
    return if user_signed_in?
    user = User.create_guest_user
    user.save!(validate: false)
    sign_in :user, user
    redirect_to root_url
  end
end