Rubysquare::Application.routes.draw do

  #resources :podcasts
  #resources :musics

  match "/users/guest_sign_in" => "users#guest_sign_in", :as => "guest_sign_in", :via => :get
  devise_for :users
  root :to => "songs#index"

  match "/podcasts/create.json" => "podcasts#create", :as => :create_podcast, :via => :post


  match "/songs/now_playing" => "songs#now_playing", :via => :get
  match "/songs/filter" => "songs#filter", :as => :filter, :via => :get
  match "/songs/update_now_playing" => "songs#update_now_playing", :via => :post
  match "/songs/add_to_playlist" => "songs#add_to_playlist", :via => :post
  match "/songs/dashboard" => "songs#dashboard", :as => :songs_dashboard, :via => :get
  match "songs/search" => "songs#search", :via => :get

  #post "songs/manage/update" => "songs#manage_songs_update"
  match "songs/flush" => "songs#flush", :as => "flush", :via => :post

  resources :playlists
  resources :songs

  #--------------------------------------------------------------------------------------------------------------------------#
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'

end
