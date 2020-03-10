# tasks relating to seed clients.
namespace :seed_clients do
    desc "Does all the copying to prod"
    task :seed_clients => :environment do
        
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

    end
end