const Game = require("../models/game");
const Player = require("../models/player");

exports.createGame = async (req, res, next) => {
  const name = req.body.name;
  // TODO: In the frontend, change the player list to array. Then this conversion is not needed.
  const team1Player1 = req.body.team1.player1;
  const team1Player2 = req.body.team1.player2;
  const team1Players = await getPlayersIfFound([team1Player1, team1Player2]);

  const team2Player1 = req.body.team2.player1;
  const team2Player2 = req.body.team2.player2;
  const team2Players = await getPlayersIfFound([team2Player1, team2Player2]);

  updatePlayerStats([team1Player1, team1Player2, team2Player1, team2Player2]);

  const game = new Game(req.body);
  game.team1.players = team1Players;
  game.team2.players = team2Players;

  game
    .save()
    .then((result) => {
      res
        .status(201)
        .json({ message: `Game ${name} created successfully`, game: result });
    })
    .catch((error) => {
      error.statusCode = 500;
      next(error);
    });
};

const getPlayersIfFound = async (playersFromPayload) => {
  try {
    const promises = playersFromPayload.map((player) =>
      Player.findOne({ name: player.name }).exec()
    );

    return await Promise.all(promises);
  } catch (error) {
    console.log("Error while finding players", error);
    return [];
  }
};

const updatePlayerStats = (players) => {
  players.forEach(async (player) => {
    try {
      const playerFromDb = await Player.findOne({ name: player.name }).exec();
      if (playerFromDb === null) {
        return;
      }
      playerFromDb.goalsFor += player.goalsFor;
      playerFromDb.goalsAgainst += player.goalsAgainst;
      playerFromDb.wins += player.wins;
      playerFromDb.losses += player.losses;
      playerFromDb.gamesPlayed += player.gamesPlayed;
      await playerFromDb.save();
    } catch (error) {
      console.log(`Update player ${player.name} failed.`, error);
    }
  });
};
