class Api::ContactsController < ApplicationController
  before_action :set_company, only: [:index, :create]
  before_action :set_contact, only: [:update, :destroy]

  def index 
    contacts = @company.contacts
    render json: contacts
  end

  def single_contact
    contact = Contact.find(params[:id])
    render json: contact
  end

  def create
    contact = @company.contacts.new(contact_params)
    contact.user_id = current_user.id
    contact.save
    render json: contact
  end

  def update
    @contact.update(contact_params)
    render json: @contact
  end

  def destroy
    @contact.destroy
    render json: @contact
  end

  private
    def contact_params
      params.permit(:name, :email, :phone, :position, :description)
    end

    def set_company
      @company = Company.find(params[:company_id])
    end

    def set_contact
      @contact = Contact.find(params[:id])
    end

end
