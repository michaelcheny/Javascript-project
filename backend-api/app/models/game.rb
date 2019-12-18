class Game < ApplicationRecord
  belongs_to :player


  def self.top_5_highest_scores
    order(score: :desc).limit(5)
  end
  
  
end
