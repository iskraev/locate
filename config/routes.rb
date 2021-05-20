Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root :to => 'home#index'

  namespace :home do
    root action: 'index'
  end 
  
  resources :clients, except: [:new, :edit] do
    resources :pins, only: [:index] # clients/:client_id/pins
  end
  
  resources :pins, only: [:create, :destroy]

  patch '/pins/update', to: 'pins#update_pins'
end
