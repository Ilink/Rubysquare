class AddNowPlayingColumnToPlaylists < ActiveRecord::Migration
  def change
    add_column :playlists, :now_playing, :boolean, :default => false
  end
end
