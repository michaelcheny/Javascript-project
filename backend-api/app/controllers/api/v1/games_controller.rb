class Api::V1::GamesController < ApplicationController

  def index
    @games = Game.all.order(created_at: :desc)
    @top_5 = Game.top_5_highest_scores
    @top_5_today = Game.top_5_scores_today
    @average = Game.average_rating

    render json: {
      games: @games,
      top_5: @top_5,
      top_5_today: @top_5_today,
      average_rating: @average
      }, include: [:player => {only: [:name]}], except: [:created_at, :updated_at], status: 200
  end

  def show 
    @game = Game.find(params[:id])
    render json: @game, include: [:player], status: 200
  end

  def create
    player = Player.find_or_create_by(name: params[:name])
    game = Game.new(player: player, score: params[:score], rating: params[:rating])
    if game.save
      render json: game, include: [:player], status: 200
    else
      render json: {message: "There was an error saving your information, make sure your server is running."}, status: 400
    end
  end

  def update
    game = Game.find(params[:id])
    game.update(rating: params[:rating])
  end

end
