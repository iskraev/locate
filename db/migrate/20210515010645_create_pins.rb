class CreatePins < ActiveRecord::Migration[6.1]
  def change
    create_table :pins do |t|
      t.references :client, index: true, foreign_key: true
      t.float :latitude, :null => false
      t.float :longitude, :null => false
      t.timestamps
    end
  end
end
