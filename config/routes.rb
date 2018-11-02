# routes.rb
Rails.application.routes.draw do
  scope '/api' do
    resources :lists, except: [:new, :edit]
    resources :list_items, only: [:create, :update, :destroy]
  end
  get '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#logout'
  get '/signup', to: 'registrations#create'
end
