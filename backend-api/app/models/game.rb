class Game < ApplicationRecord
  belongs_to :player


  def self.top_5_highest_scores
    order(score: :desc).limit(5)
  end
  
  def self.top_5_scores_today
    where(updated_at: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day).order(score: :desc).limit(5)
  end

  def self.average_rating
    average(:rating)
  end

  
end
