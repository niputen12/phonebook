Rails.application.routes.draw do
 
 root 'main#index'
 post 'new' => 'maincontroller#add' 
 get 'records' => 'maincontroller#getUserInfo'
 patch 'updateUser/:id' => 'maincontroller#updateUser'
 delete 'delete/:id' => 'maincontroller#deleteUser'

end
