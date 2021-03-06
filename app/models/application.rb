class Application < ApplicationRecord
  belongs_to :user
  belongs_to :company
  has_many :steps

  def self.get_applications(user)
    select("applications.id, applications.position, sent_date, reference, overall_status, source, companies.title AS company_title, companies.image AS company_image, companies.location AS company_location")
    .joins("LEFT JOIN companies ON companies.id = applications.company_id")
    .joins("LEFT JOIN users ON users.id = applications.user_id")
    .where("users.id = #{user}")
  end

  def self.get_single_application(app_id)
    select("applications.id, company_id, applications.position, sent_date, reference, overall_status, source, notes, companies.title AS company_title, companies.image AS company_image, companies.location AS company_location")
    .joins("LEFT JOIN companies ON companies.id = applications.company_id")
    .joins("LEFT JOIN users ON users.id = applications.user_id")
    .where("applications.id = #{app_id}")
  end

end
