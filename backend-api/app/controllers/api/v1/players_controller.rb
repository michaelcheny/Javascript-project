class Api::V1::PlayersController < ApplicationController

  def index
    @players = Player.all
    render json: @players, status: 200
  end

  def create
    player = Player.find_or_create_by(name: params[:name])
  end
 
end
