class AddTypeOfToStep < ActiveRecord::Migration[5.1]
  def change
    rename_column :steps, :type, :type_of
  end
end
