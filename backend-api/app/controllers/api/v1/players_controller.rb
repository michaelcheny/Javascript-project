class Api::V1::PlayersController < ApplicationController

  # def index
  #   @players = Player.all

  #   render json: @players, status: 200
  # end

  # def show
  #   @player = Player.find(params[:id])

  #   render json: @player, status: 200
  # end

  # def create
  #   @player = Player.new(player_params)
  #   if @player.save
  #     render json: @player, status: 200
  #   else
  #     render json: { message: 'There was a problem creating your playername, try not to use curse words, you pottymouth'}
  #   end
  # end

  def create
    player = Player.create(name: params[:name])
  end
  # def update
  #   @player = Player.find(params[:id])
  #   if @player.update(player_params)
  #     render json: @player, status: 200
  #   else
  #     render json: { message: 'There was a problem updating your playername, try not to use curse words, you pottymouth'}
  #   end
  # end

  # def destroy
  #   @player = Player.find(params[:id])
  #   if @player
  #     @player.destroy
  #     render json: {playerId: @player.id}
  #   else
  #     render json: { message: 'There was an issue.'}
  #   end
  # end

  # private

  # def player_params
  #   params.require(:player).permit(:name, :highscore)
  # end
  
end
