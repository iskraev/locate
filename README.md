# Client Tracker Project
  This project is a simple UI to help track clients
  
## Environment
- ruby 2.7.0p0 (2019-12-25 revision 647ee6f091) [x86_64-darwin20]
- Rails 6.1.3.1
- sqlite3
- Vue.js
- Vuex

## Setup
  - Nagivate into "client_tracker"
  - Run the following commands
  ```
  bundle install
  yarn install
  rails db:setup
  rails s
  ```
  Generate GoogleAPI key or request one.
  https://developers.google.com/maps/documentation/javascript/get-api-key

  This key will need to be added to 'app/views/layouts/application.html.erb'
  
  The application can be accessed at http://localhost:3000/
  
## Database
  The sqlite database contains a single table Clients. The Clients table was created with the following migration
  ```
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
  ```

## Base State
  A baseline application has already been created for you. In this application you can click on one of the clients in the list and a modal will appear with a map and an input bar with 'Search a place' as the placeholder. If the GoogleAPI key that was entered works, typing in this input bar will drop down a list to autocomplete an address. Build upon this baseline state to accomplish the goals listed below.

## Goals
  - On main page
    - Create a way to add more clients.
      - User can enter in details about a client and when saved, the new client will appear in the table.
    - Add column Number of Pins to the clients table.
  - In modal after clicking on a client.
    - When searching for a location add Pin (google marker) at the searched location and save the details (longitude, latitude pin owner) to the database.
  - In DB
    - Create a new table (rails model) to store Pins.
    
 ## Useful Docs
 https://edgeguides.rubyonrails.org/active_record_migrations.html

 https://developers.google.com/maps/documentation/javascript/examples

 https://vuejs.org/v2/guide/index.html
 
 https://vuex.vuejs.org/guide/
 
 If you run into any roadblocks or issues, feel free to contact felix@locate.ai
