class AddImageToCompanies < ActiveRecord::Migration[5.1]
  def change
    add_column :companies, :image, :text
  end
end
