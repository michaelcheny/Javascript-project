# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



Player.create([
  { name: 'Michael' },
  { name: 'Donald Duck' },
  { name: 'Rick Sanchez' },
  { name: 'Toby the Yellow Labrador' },
  { name: 'Balthromaw' },
  { name: 'Slippy the Snake' }
])

Game.create([
  {player_id: 1, score: 3000, rating: 4},
  {player_id: 2, score: 2019, rating: 3},
  {player_id: 3, score: 7000, rating: 5},
  {player_id: 4, score: 7000, rating: 5},
  {player_id: 5, score: 12000, rating: 4},
  {player_id: 6, score: 22000, rating: 5}
])

