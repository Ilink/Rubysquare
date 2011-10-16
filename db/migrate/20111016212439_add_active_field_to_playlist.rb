class AddActiveFieldToPlaylist < ActiveRecord::Migration
  def change
    add_column :playlists, :active, :boolean, :default=>false
  end
end
