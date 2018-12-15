# lists_controller.rb
class ListsController < ApplicationController

  def index
    # return json: {success: false} unless current_user.id == params[:user_id]
    @lists = current_user.lists if current_user
    @lists = List.all if !current_user
    render json: @lists
  end

  def show
    # return json: {success: false} unless current_user.id == params[:user_id]
    if @list = List.find(params[:id])
      render json: @list
    else
      render json: {success: false}
    end
  end

  def create
    # return json: {success: false} unless current_user.id == params[:user_id]
    @list = List.new(list_params)
    if @list.save
      render json: @list
    else
      render json: @list.errors
    end
  end

  def update
    # return json: {success: false} unless current_user.id == params[:user_id]
    @list = List.find(params[:id])
    if @list.update(list_params)
      render json: @list
    else
      render json: @list.errors
    end
  end

  def destroy
    # return json: {success: false} unless current_user.id == params[:user_id]
    @list = List.find(params[:id])
    if @list.destroy
      render json: {success: true}
    else
      render json: {success: false}
    end
  end

  private

  def list_params
    params.require(:list).permit(:title, :status, :user_id)
  end
end
