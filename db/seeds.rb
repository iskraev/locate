# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Client.create(full_name: "Jason Bar", 
    email: "jbar@jb.com", 
    number_of_sites: 2, 
    phase: "Active"
)

Client.create(full_name: "Jingle Smith", 
    email: "jsmith@jingle.com", 
    number_of_sites: 5, 
    phase: "New"
)

Client.create(full_name: "Keanu", 
    email: "keanu@breathtaking.com", 
    number_of_sites: 9, 
    phase: "Active"
)