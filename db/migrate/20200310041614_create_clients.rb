class CreateClients < ActiveRecord::Migration[5.1]
  def change
    create_table :clients do |t|
      t.string :full_name
      t.string :email
      t.integer :number_of_sites
      t.string :phase

      t.timestamps
    end
    add_index :clients, :id
  end
end
