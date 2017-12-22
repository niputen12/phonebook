class MaincontrollerController < ApplicationController

	def index
         redirect_to '/index.html'
     end

	def add

		register = Phonerecord.where(number: params[:number])

		if register.blank?

			register = Phonerecord.new(record_params)

			if register.save
				render json: {status: 'Success', message: 'power', data:register},status: :ok
			else
				render json: {status: 'Error', message: 'error', data:Phonerecord.error},status: :unprocessable_entity
			end

		else
			render json: {message: 'Already Existing'},status: :ok
		end
	end 

	def record_params
		params.permit(:number, :name)
	end

	def getUserInfo
		 user = Phonerecord.select('id','name','number')
		 render json:{data: user},status: :ok
	end

	def updateUser
		update = Phonerecord.where(number: params[:number])
		if update.blank?

			update = Phonerecord.find(params[:id])

			if update.update_attributes(update_user_params)
				render json:{message: 'Success!'},status: :ok
			else
				render json: {status: 'Error', message: 'error'},status: :unprocessable_entity
			end

		else
			render json: {message: 'Already Existing'},status: :ok
		end
		

		
	end

	def update_user_params
		params.permit(:name, :number)
	end

	def deleteUser
		update = Phonerecord.find(params[:id])
		update.destroy
		render json: {message: 'Deleted'},status: :ok
	end

end
