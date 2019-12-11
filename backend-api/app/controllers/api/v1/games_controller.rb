class Api::V1::GamesController < ApplicationController

  def index
    @games = Game.all

    render json: @games, status: 200
  end

  private

  def game_params
    params.require(:games).permit(:score, :rating, :player_id)
  end
  
end
