class Api::StepsController < ApplicationController
  before_action :set_application

  def index
    steps = @application.steps.all
    render json: steps
  end

  def create
    step = @application.steps.create(step_params)
    render json: step
  end

  private 
    def set_application
      @application = Application.find(params[:application_id])
    end

    def step_params
      params.require(:step).permit(:title, :notes, :complete, :type_of, :due_date)
    end

end
