class Api::V1::GamesController < ApplicationController

  def index
    @games = Game.all
    render json: @games
  end

  def create
    @game = Game.create(game_params)
    render json: @game, status: 201
  end

  def update
    @game = Game.find(params[:id])

    @game.update(game_params)
    if @game.save
      render json: @game
    else
      render json: {errors: @game.errors.full_messages}, status: 422
    end
  end

  def destroy
    @game = Game.find(params[:id])
    gameId = @game.id
    @game.destroy
    render json: {message:"Ka-Pow! Game deleted", gameId:gameId}
  end

  def show
    @game = Game.find(params[:id])
    render json: @game, status: 200
  end

  private
  def game_params
    params.permit(:user_id, :correct_questions)
  end

end
