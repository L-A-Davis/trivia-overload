class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.belongs_to :user
      t.integer :correct_questions

      t.timestamps
    end
  end
end
