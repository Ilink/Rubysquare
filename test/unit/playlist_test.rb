require 'test_helper'

class PlaylistTest < ActiveSupport::TestCase
  test "create empty playlist" do
    playlist = Playlist.new
    assert !playlist.save, "Shouldn't be able to save an empty playlist"
  end

  test "create playlist involving HABTM relationship with songs" do
    playlist = Playlist.create(:title => 'testlist')
    song = Song.create(:title => 'test', :location => "test/test/tes.mp3")
    playlist.songs << song
    assert playlist.save, "Can't save song with HABTM relationship to playlist"
  end
end
