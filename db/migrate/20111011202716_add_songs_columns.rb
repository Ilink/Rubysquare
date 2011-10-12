class AddSongsColumns < ActiveRecord::Migration
  def change
    add_column :songs, :genre, :string
    add_column :songs, :file_type, :string
    add_column :songs, :size, :int
    add_column :songs, :length, :int
    add_column :songs, :track_number, :int
    add_column :songs, :year, :int
    add_column :songs, :bitrate, :int
    add_column :songs, :track_count, :int
  end
end
