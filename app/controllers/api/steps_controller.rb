class Api::StepsController < ApplicationController
  before_action :set_application

  def index
    steps = @application.steps.all
    render json: steps
  end

  def create
    date = "#{params[:step][:due_date]} #{params[:step][:due_time]}"
    step = @application.steps.new(step_params)
    step.due_date = date
    step.save
    render json: step
  end

  private 
    def set_application
      @application = Application.find(params[:application_id])
    end

    def step_params
      params.require(:step).permit(:title, :notes, :complete, :type_of)
    end

end
