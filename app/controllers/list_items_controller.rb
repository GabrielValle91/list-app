# list_items_controller.rb
class ListItemsController < ApplicationController

  def create
    # return json: {success: false} unless current_user.id == params[:user_id]
    @list_item = ListItem.new(list_item_params)
    if @list_item.save
      render json: @list_item
    else
      render json: @list_item.errors
    end
  end

  def update
    # return json: {success: false} unless current_user.id == params[:user_id]
    @list_item = ListItem.find(params[:id])
    if @list_item.update(list_item_params)
      render json: @list_item
    else
      render json: @list_item.errors
    end
  end

  def destroy
    # return json: {success: false} unless current_user.id == params[:user_id]
    @list_item = ListItem.find(params[:id])
    if @list_item.destroy
      render json: {success: true}
    else
      render json: {success: false}
    end
  end

  private

  def list_item_params
    params.require(:list_item).permit(:name, :quantity, :status, :list_id)
  end
end
