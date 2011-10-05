class SessionsController < ApplicationController
  def new
  end

  def create
    auth_user = User.authenticate(params[:email], params[:password]); #see user model
    if (auth_user)
      session[:user_id] = user.id;
      redirect_to root_url, :notice => "Logged in!"
    else
      flash.now.alert = "Invalid Username or Password"
      render "new"
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url :notice => 'Logged out'
  end

end
