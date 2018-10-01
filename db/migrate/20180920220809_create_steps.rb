class CreateSteps < ActiveRecord::Migration[5.1]
  def change
    create_table :steps do |t|
      t.belongs_to :application, foreign_key: true
      t.string :title
      t.text :notes
      t.string :type
      t.boolean :complete
      t.datetime :due_date

      t.timestamps
    end
  end
end
