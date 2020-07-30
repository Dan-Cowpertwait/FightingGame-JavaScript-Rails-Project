Rails.application.routes.draw do
  resources :characters do 
    resources :weapons, only: [:index]
  end
  resources :weapons
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
