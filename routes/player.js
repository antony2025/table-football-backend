const express = require("express");
const { body } = require("express-validator/check");
const playerController = require("../controllers/player");

const router = express.Router();

router.get("/players", playerController.getPlayers);
router.post(
  "/players",
  [body("name").trim().isLength({ min: 2 })],
  playerController.createPlayer
);

module.exports = router;
