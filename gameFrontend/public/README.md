# Floppy Drop

This is a Single Page Application - a browser based game, build using Javascript, HTML (canvas) and CSS in the frontend, and Rails as an API for the backend. This app took inspiration from [Easy Money Snake](http://easymoneysnake.com/) and [Flappy Bird](https://flappybird.io/). It is a basketball themed game where the player picks a character and controls it left and right to collide with objects falling down from the top of the game canvas. If you collide with a player playing defence, you get +100 points, if you collide with a player taking a charge, you lose a life, if you collide with the referee, you get +500 points and get an extra life. Since referees provide the most help to you, their spawns are rare. Disclaimer: This game is just poking fun at basketball players that "flop".

[Imgur](https://imgur.com/37qaafC)

# Build Using

Javascript, CSS, and HTML [Canvas](https://www.w3schools.com/html/html5_canvas.asp) for the frontend.
Rails as an API as the backend.

# Features

- Choose between James Harden and Anderson Verajao as your character.
- Has a High Scores list with the most recent score showing up top, a top 5 scores all time, and a top 5 score for today.

# Installation

1. Clone directory from [my github](https://github.com/michaelcheny/Javascript-project)
2. cd into `backend-api`
3. run `bundle install`
4. run `rails db:migrate` and `rails db:seed'
5. run `rails s` to start the server.
6. open a new terminal, cd into `gameFrontend`, and open `index.html`.

# How to play?

1. Read the instructions and choose your character.
2. Use `arrow left` and `arrow right` or `a` and `d` to move left or right. Press `s` to pause game.
3. Collide with defenders with hands up to flop for points.
4. Collide with defenders taking a charge to lose a foul.
5. Collide with referees to get bonus points and recover a life.
6. Game ends when you foul out.

# Credits

Inspiration came from a game that took a fun spin on a classic "snake" game [Easy Money Snake](http://easymoneysnake.com/). [Flappy Bird](https://flappybird.io/) also inspired me as well.

The png of Harden's head came from Bleacher Report's Game of Zones.

# License

[Mit License](https://github.com/michaelcheny/Javascript-project/blob/master/LICENSE)
