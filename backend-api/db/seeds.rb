# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.create([
  { name: 'Michael', score: 3000 },
  { name: 'Donald Duck', score: 2019 },
  { name: 'Rick Sanchez', score: 7000 },
  { name: 'Toby the Yellow Labrador', score: 48 }
])