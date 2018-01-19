class CreateQuestions < ActiveRecord::Migration[5.1]
  def change
    create_table :questions do |t|
      t.string :content
      t.string :answer
      t.integer :difficulty_level
      t.belongs_to :category
    end
  end
end
