# list.rb
class List < ApplicationRecord
  validates :title, presence: true
  has_many :list_items
  belongs_to :user
end
