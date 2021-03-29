const { validationResult } = require("express-validator/check");
const Player = require("../models/player");

exports.getPlayers = (req, res, next) => {
  Player.find({})
    .then((result) => {
      res.status(200).json({
        players: result,
      });
    })
    .catch((error) => {
      error.statusCode = 500;
      next(error);
    });
};

exports.createPlayer = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  const name = req.body.name;
  const goalsFor = req.body.goalsFor || 0;
  const goalsAgainst = req.body.goalsAgainst || 0;
  const wins = req.body.wins || 0;
  const losses = req.body.losses || 0;
  const gamesPlayed = req.body.gamesPlayed || 0;

  const player = new Player({
    name,
    goalsFor,
    goalsAgainst,
    wins,
    losses,
    gamesPlayed,
  });

  player
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Player created successfully.",
        player: result,
      });
    })
    .catch((error) => {
      error.statusCode = 500;
      next(error);
    });
};
