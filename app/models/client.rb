class Client < ApplicationRecord
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP } 
  validates :full_name, :email, :number_of_sites, :phase, presence: true
  
  has_many :pins,
    class_name: :Pin,
    foreign_key: :client_id,
    dependent: :delete_all

  # has_many :number_of_pins,
  #   class_name: :Pin,
  #   foreign_key: :client_id
end
