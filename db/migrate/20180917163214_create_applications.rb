class CreateApplications < ActiveRecord::Migration[5.1]
  def change
    create_table :applications do |t|
      t.belongs_to :user, foreign_key: true
      t.belongs_to :company, foreign_key: true
      t.string :position, :null => false
      t.date :sent_date
      t.boolean :reference
      t.string :overall_status, :default => "pending", :null => false
      t.string :source

      t.timestamps
    end
  end
end
