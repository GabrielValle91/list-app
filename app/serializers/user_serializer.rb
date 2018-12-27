# user_serializer.rb
class UserSerializer < ActiveModel::Serializer
  attributes :username
  has_many :lists
end
