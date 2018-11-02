class CreateListItems < ActiveRecord::Migration[5.2]
  def change
    create_table :list_items do |t|
      t.string :name
      t.integer :quantity, default: 1
      t.string :status
      t.belongs_to :list
      t.timestamps
    end
  end
end
