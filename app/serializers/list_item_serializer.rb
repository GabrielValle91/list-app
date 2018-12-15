# list_item_serializer.rb
class ListItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :quantity, :status
  belongs_to :list
end
