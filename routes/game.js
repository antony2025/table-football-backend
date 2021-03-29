const express = require("express");
const gameController = require("../controllers/game");

const router = express.Router();

router.post("/game", gameController.createGame);

module.exports = router;
