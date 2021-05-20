class Pin < ApplicationRecord
  validates :latitude, :longitude, :client_id, presence: true

  belongs_to :client, counter_cache: :number_of_pins
end
