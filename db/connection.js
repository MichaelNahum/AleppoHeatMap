var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/arabictweets");

var Tweet = mongoose.Schema({
  text: String,
  name: String,
  retweet_count: Number
});

mongoose.model("Tweet", Tweet);

module.exports = mongoose;
