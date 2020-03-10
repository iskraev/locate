class HomeController < ApplicationController
    def index
        gon.clients = Client.all.as_json
	end
end
