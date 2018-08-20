class CreateCompanies < ActiveRecord::Migration[5.1]
  def change
    create_table :companies do |t|
      t.string :title
      t.text :description
      t.boolean :applied
      t.string :position
      t.text :position_details
      t.string :location
      t.belongs_to :user, foreign_key: true
      t.text :contacts

      t.timestamps
    end
  end
end
