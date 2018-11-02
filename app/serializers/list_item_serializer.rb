# list_item_serializer.rb
class ListItemSerialier < ActiveModel::Serializer
  attributes :name, :quantity, :status
  belongs_to :list
end
