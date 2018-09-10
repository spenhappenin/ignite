Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    # Companies
    get '/companies', to: 'companies#my_companies'
    post '/companies/new', to: 'companies#create'
    put '/companies/:id/edit', to: 'companies#update'
    delete '/companies/:id', to: 'companies#destroy'

    #Contacts
    get "/contacts", to: "contacts#index"
    post "/contacts/new", to: "contacts#create"
    put "/contacts/:id/edit", to: "contacts#update"
    delete "/contacts/:id", to: "contacts#destroy"
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
