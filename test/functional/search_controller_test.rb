require 'test_helper'

class SearchControllerTest < ActionController::TestCase
  setup do
    sign_in User.first
  end

  test "should get show" do
    get :show
    assert_response :success
  end

  test "should get index" do
    get :index
    assert_response :success
  end

end
