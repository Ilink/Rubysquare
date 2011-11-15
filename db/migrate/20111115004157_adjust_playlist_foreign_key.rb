class AdjustPlaylistForeignKey < ActiveRecord::Migration
  #change_table(:playlists) do |t|
  #  t.column :user_id, :integer
  #end

  def change
    change_column :playlists, :user_id, :integer
  end

end
