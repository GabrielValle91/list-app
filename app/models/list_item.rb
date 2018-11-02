# list_item.rb
class ListItem < ApplicationRecord
  validates :name, presence: true
  belongs_to :list
end
