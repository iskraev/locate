Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root :to => 'home#index'

  namespace :home do
    root action: 'index'
    end 
    
  namespace :clients do
      root action: 'index'
  end

end
