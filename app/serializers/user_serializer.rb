# user_serializer.rb
class UserSerialier < ActiveModel::Serializer
  attributes :username
  has_many :lists
end
