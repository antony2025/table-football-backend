const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const playerRoutes = require("./routes/player");
const gameRoutes = require("./routes/game");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(
    `Got ${req.method} for ${req.originalUrl} with payload ${JSON.stringify(
      req.body
    )}`
  );
  next();
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(playerRoutes);
app.use(gameRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong.";
  const errors = error.errors || [];
  res.status(status).json({ message, errors });
});

mongoose
  .connect(
    "mongodb+srv://dbuser:1yS5mpHWUsbGUetG@table-football.tbmtg.mongodb.net/table-football?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    console.log(result);
    app.listen(8080, () => console.log("Listening on port 8080"));
  })
  .catch((error) => {
    console.log(error);
  });
