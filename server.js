const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes");
const User = require("./models/User");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./models");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/user", function(req, res) {
  db.User.find({})
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/submit", function(req, res) {
  db.healthLog
    .create(req.body)
    .then(function(dbHealthLog) {
      return db.User.findOneAndUpdate(
        {},
        { $push: { notes: dbHealthLog._id } },
        { new: true }
      );
    })
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/populateduser", function(req, res) {
  db.User.find({})
    .populate("healthLog")
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
});

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/digitaldoctor"
);

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/digitaldoctor";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

const configurePassport = require("./controllers/passport");

const passport = configurePassport(app, mongoose, User);

app.use(routes(passport, User));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
