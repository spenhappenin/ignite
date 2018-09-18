class AddNotesToApplication < ActiveRecord::Migration[5.1]
  def change
    add_column :applications, :notes, :text
  end
end
