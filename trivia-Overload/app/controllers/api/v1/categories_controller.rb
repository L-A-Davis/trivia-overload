class Api::V1::CategoriesController < ApplicationController

  def index
    @categories = Category.all
    render json: @categories
  end

  def create
    @category = Category.create(category_params)
    render json: @category, status: 201
  end

  def update
    @category = Category.find(params[:id])

    @category.update(category_params)
    if @category.save
      render json: @category
    else
      render json: {errors: @category.errors.full_messages}, status: 422
    end
  end

  def destroy
    @category = Category.find(params[:id])
    categoryId = @category.id
    @category.destroy
    render json: {message:"Ka-Pow! Category deleted", categoryId:categoryId}
  end

  def show
    @category = Category.find(params[:id])
    render json: @category, status: 200
  end

  private
  def category_params
    params.permit(:title)
  end



end
