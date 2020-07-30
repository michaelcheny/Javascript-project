class Api::V1::GamesController < ApplicationController

  def index
    @games = Game.all.order(created_at: :desc)
    @top_5 = Game.top_5_highest_scores
    @top_5_today = Game.top_5_scores_today

    render json: {
      games: @games,
      top_5: @top_5,
      top_5_today: @top_5_today,
      average_rating: @average
      }, status: 200
  end

  def create
    game = Game.new(player_name: params[:name], score: params[:score])
    if game.save
      render json: game, status: 200
    else
      render json: {message: "There was an error saving your information, make sure your server is running."}, status: 400
    end
  end

end
