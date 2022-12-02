const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  userId: {
    type: String,
  },
  username: {
    type: String,
  },
  totalQuestions: {
    type: Number,
    default: 0,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("quizLeaderBoard", schema);
