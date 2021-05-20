class AddNumberOfPinsToClient < ActiveRecord::Migration[6.1]
  def change
    add_column :clients, :number_of_pins, :integer, default: 0
    Client.reset_column_information
    Client.all.each do |c|
      Client.update_counters c.id, number_of_pins: c.pins.length
    end
  end
end

