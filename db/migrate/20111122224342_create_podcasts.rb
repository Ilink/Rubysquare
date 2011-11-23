class CreatePodcasts < ActiveRecord::Migration
  def change
    create_table :podcasts do |t|
      t.string :title, :null => false
      t.text :description
      t.string :url, :null => false
      t.string :type

      t.timestamps
    end
  end
end

