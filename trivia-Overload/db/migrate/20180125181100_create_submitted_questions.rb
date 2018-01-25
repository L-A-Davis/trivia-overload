class CreateSubmittedQuestions < ActiveRecord::Migration[5.1]
  def change
    create_table :submitted_questions do |t|
      t.string :question
      t.string :correct_answer
      t.string :incorrect_answers_1
      t.string :incorrect_answers_2
      t.string :incorrect_answers_3
      t.integer :user_id

      t.timestamps
    end
  end
end
