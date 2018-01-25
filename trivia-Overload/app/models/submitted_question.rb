class SubmittedQuestion < ApplicationRecord
  belongs_to :user, optional: true
end
