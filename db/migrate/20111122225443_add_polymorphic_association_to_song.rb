class AddPolymorphicAssociationToSong < ActiveRecord::Migration
  def change
    add_column :songs, :audio_id, :integer
  end
end
