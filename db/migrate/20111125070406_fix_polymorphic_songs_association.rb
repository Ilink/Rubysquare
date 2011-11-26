class FixPolymorphicSongsAssociation < ActiveRecord::Migration
  def change
    add_column :songs, :audio_type, :string
  end
end
