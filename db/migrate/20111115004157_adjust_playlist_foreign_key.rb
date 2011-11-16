class AdjustPlaylistForeignKey < ActiveRecord::Migration
  #def change
  #  change_table(:playlists) do |t|
  #    t.change :user_id, :integer
  #  end
  #end

  #def change
  #  change_column :playlists, :user_id, :integer, :force => true
  #end

  def up
    remove_column :playlists, :user_id
    add_column :playlists, :user_id, :integer
  end

  def down
    ActiveRecord::IrreversibleMigration
  end

end
