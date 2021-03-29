const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 20,
      required: true,
      unique: true,
    },
    goalsFor: {
      type: Number,
      min: 0,
      default: 0,
    },
    goalsAgainst: {
      type: Number,
      min: 0,
      default: 0,
    },
    wins: {
      type: Number,
      min: 0,
      default: 0,
    },
    losses: {
      type: Number,
      min: 0,
      default: 0,
    },
    gamesPlayed: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Player", playerSchema);
