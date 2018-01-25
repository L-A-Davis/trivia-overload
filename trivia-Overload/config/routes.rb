Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :questions
      resources :submitted_questions
      resources :categories
      resources :users
      resources :games
    end
  end
end
