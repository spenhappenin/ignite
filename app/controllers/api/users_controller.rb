class Api::UsersController < ApplicationController

  def fetch_profile
    render json: current_user
  end

  def update_profile
    current_user.update(user_params)
    render json: current_user
  end

  private
    def user_params
      params.require(:user).permit(:email, :first_name, :last_name, :image)
    end

end
