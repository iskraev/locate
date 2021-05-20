class AddConstraintsToClients < ActiveRecord::Migration[6.1]
  def change
    change_column_null :clients, :full_name, false
    change_column_null :clients, :email, false
    change_column_null :clients, :number_of_sites, false
    change_column_null :clients, :phase, false
  end
end
