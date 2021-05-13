class ClientsController < ApplicationController
    def index
        clients = Client.all.as_json
        render :json => clients
	end
end