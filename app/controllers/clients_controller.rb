class ClientsController < ApplicationController
  def index
    # clients = Client.all.includes(:number_of_pins)
    clients = Client.all
    render json: clients, status: 200
  end

  def show
    client = Client.find_by(id: params[:id])

    if (client)
      render json: client, status: 200
    else
      render json: ['Client was not found.'], status: 404
    end
  end

  def create
    correct_params = client_params.deep_dup
    
    client = Client.new(correct_params)

    if(client.save)
      render json: client, status: 200
    else
      render :json => client.errors.as_json, status: 422
    end
  end

  def update
    correct_params = client_params.deep_dup

    client = Client.find_by(id: params[:id])
    if(client)
      if(client.update(correct_params))
        render json: client, status: 200
      else
        render :json => client.errors.as_json, status: 422
      end
    else
      render json: ['Client was not found.'], status: 404
    end
  end

  def destroy
    client = Client.find_by(id: params['id'])

    if(client)
      client.destroy

      render json: client, status: 200
    else
      render json: ['Client was not found.'], status: 404
    end
  end

  private
  def client_params
    params.require(:client).permit(:full_name, :email, :number_of_sites, :phase)
  end
end