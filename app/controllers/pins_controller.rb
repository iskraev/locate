class PinsController < ApplicationController
  def index
    pins = Pin.where(client_id: params[:client_id])
    render json: pins, status: 200 
  end
  
  def create
    correct_params = pins_params.deep_dup

    pin = Pin.new(correct_params)

    if(pin.save)
      render json: pin, status: 200 
    else
      render json: pin.errors.full_messages, status: 422
    end
	end

  def destroy
    pin = Pin.find_by(id: params['id'])

    if(pin)
      pin.destroy
      # Client.decrement_counter(:number_of_pins, pin.client_id)

      render json: pin, status: 200
    else
      render json: ['Pin was not found.'], status: 404
    end
  end

  def update_pins
    pins = params[:pins]
    pins.each do |new_pin|
      pin = Pin.find_by(id: new_pin['id'])
      
      unless pin
        return render json: ['Pin was not found.'], status: 404
      end
      
      unless (pin.update(new_pin.as_json)) 
        return render :json => pin.errors.as_json, status: 400
      end
    end

    render json: ['Pins were successfully updated.'], status: 200
  end

  private
  def pins_params
    params.require(:pin).permit(:id, :latitude, :longitude, :client_id)
  end
end
