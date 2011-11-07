class ApplicationController < ActionController::Base
  before_filter :authenticate_user!
  protect_from_forgery

  protected
  def initial_view view_name
      initial_view = {'initial_view' => "#{view_name}"}.to_json
  end
end
