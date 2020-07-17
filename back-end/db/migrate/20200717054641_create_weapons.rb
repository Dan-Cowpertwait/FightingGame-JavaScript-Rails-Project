class CreateWeapons < ActiveRecord::Migration[6.0]
  def change
    create_table :weapons do |t|
      t.string :name
      t.string :type
      t.integer :power
      t.integer :defence
      t.references :character, null: false, foreign_key: true

    end
  end
end
