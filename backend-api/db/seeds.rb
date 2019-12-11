# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



Player.create([
  { name: 'Michael', highscore: 3000 },
  { name: 'Donald Duck', highscore: 2019 },
  { name: 'Rick Sanchez', highscore: 7000 },
  { name: 'Toby the Yellow Labrador', highscore: 48 }
])

Game.create([
  {player_id: 1, score: 3000, rating: 4},
  {player_id: 2, score: 2019, rating: 3},
  {player_id: 3, score: 7000, rating: 5},
  {player_id: 4, score: 7000, rating: 5}
])

User.create([
  { name: 'Michael', score: 3000 },
  { name: 'Donald Duck', score: 2019 },
  { name: 'Rick Sanchez', score: 7000 },
  { name: 'Toby the Yellow Labrador', score: 48 }
])