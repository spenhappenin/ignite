class CreateContacts < ActiveRecord::Migration[5.1]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.string :position
      t.text :description
      t.belongs_to :company, foreign_key: true
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
