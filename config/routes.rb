Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "api/auth"

  namespace :api do

    # Companies
    get "/companies", to: "companies#my_companies"
    post "/companies/new", to: "companies#create"
    put "/companies/:id/edit", to: "companies#update"
    delete "/companies/:id", to: "companies#destroy"

    # Contacts
    get "/company/:company_id/contacts", to: "contacts#index"
    get "/contacts/:id", to: "contacts#single_contact"
    post "/companies/:company_id/contacts", to: "contacts#create"
    put "/contacts/:id/edit", to: "contacts#update"
    delete "/contacts/:id", to: "contacts#destroy"

    # Settings
    get "/settings/profile", to: "users#fetch_profile"
    put "/settings/profile", to: "users#update_profile"

    # Applications
    get "/applications", to: "applications#index"
    get "/applications/:id", to: "applications#show"
    post "/applications", to: "applications#create"
    put "/applications/:id", to: "applications#update"
    delete "/applications/:id", to: "applications#destroy"

    # Steps
    get "applications/:application_id/steps", to: "steps#index"
    get "applications/:application_id/steps/:id", to: "steps#show"
    post "applications/:application_id/steps", to: "steps#create"
    put "applications/:application_id/steps/:id", to: "steps#update"
    delete "applications/:application_id/steps/:id", to: "steps#destroy"

  end

  #Do not place any routes below this one
  get "*other", to: "static#index"
end
