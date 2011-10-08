require 'test_helper'

class SongsControllerTest < ActionController::TestCase
  setup do
    sign_in User.first
    @song = songs(:one)
    @playlist = Playlist.create(:title=>"test")
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:songs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create song" do
    assert_difference('Song.count') do
      post :create, song: @song.attributes
    end

    assert_redirected_to song_path(assigns(:song))
  end

  test "should show song" do
    get :show, id: @song.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @song.to_param
    assert_response :success
  end

  test "should update song" do
    put :update, id: @song.to_param, song: @song.attributes
    assert_redirected_to song_path(assigns(:song))
  end

  test "should destroy song" do
    assert_difference('Song.count', -1) do
      delete :destroy, id: @song.to_param
    end

    assert_redirected_to songs_path
  end

  test "create playlist from selected songs" do
    post :add_to_playlist, {:playlist => { "id" => @playlist.id}, :song_ids =>[@song.id]}
    assert_not_nil @playlist.songs, "Adding songs to playlist failed. Check the Join table and HABTM relationship"
  end

end
