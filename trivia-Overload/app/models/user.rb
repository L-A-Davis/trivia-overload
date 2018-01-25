class User < ApplicationRecord
  validates :name, uniqueness: true

  has_many :games
  has_many :questions
  has_many :submitted_questions
end
