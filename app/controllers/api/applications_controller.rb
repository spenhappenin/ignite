class Api::ApplicationsController < ApplicationController
  before_action :set_application, except: [:index, :create]

  def index
    applications = Application.get_applications(current_user.id)
    render json: applications
  end

  def show 
    render json: @application
  end

  def create
    application = current_user.applications.create(application_params)
    render json: application
  end

  def update
    @application.update(application_params)
    render json: @application
  end

  def destroy
    @application.destroy
    render json: @application
  end

  private
    def application_params
      params.require(:application).permit(:company_id, :position, :sent_date, :reference, :source, :notes,)
    end

    def set_application
      @application = Application.find(params[:id])
    end

end
