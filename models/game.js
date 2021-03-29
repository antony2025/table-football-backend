const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 20,
      required: true,
      unique: true,
    },
    team1: {
      name: {
        type: String,
        trim: true,
        minLength: 2,
        maxLength: 20,
        required: true,
      },
      players: {
        type: [
          {
            type: Schema.Types.ObjectId,
            ref: "Player",
          },
        ],
        validate: {
          validator: (value) => value.length <= 2,
          message: `{PATH} exceeds the limit of 2.`,
        },
      },
    },
    team2: {
      name: {
        type: String,
        trim: true,
        minLength: 2,
        maxLength: 20,
        required: true,
      },
      players: {
        type: [
          {
            type: Schema.Types.ObjectId,
            ref: "Player",
          },
        ],
        validate: {
          validator: (value) => value.length <= 2,
          message: `{PATH} exceeds the limit of 2.`,
        },
      },
    },
    startTime: Date,
    endTime: Date,
    winner: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
