# list_serializer.rb
class ListSerialier < ActiveModel::Serializer
  attributes :title, :status
  belongs_to :user
  has_many :list_items
end
