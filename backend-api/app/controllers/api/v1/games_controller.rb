class Api::V1::GamesController < ApplicationController

  def index
    @games = Game.all

    render json: @games, include: [:player], status: 200
  end

  def show 
    @game = Game.find(params[:id])

    render json: @game, include: [:player], status: 200

  end

  private

  def game_params
    params.require(:games).permit(:score, :rating, :player_id)
  end
  
end
