var mongoose = require("mongoose");
var seedData = require("./script.js")

mongoose.connect("mongodb://localhost/arabictweets");

var placeName = mongoose.Schema({
  text: String,
  name: String,
  eng_name: String,
  geonameId: Number,
  fclName: String,
  lat: Number,  //will Number capture to the fifth decimal place?
  lng: Number,
  num_mentions: Number
});

//optional
var Tweet = mongoose.Schema({
  text: String,
  user_name: String,
  time: Date,
  num_retweets: Number
});

mongoose.model("placeName", placeName);
mongoose.model("Tweet", Tweet);


//really not sure about this. 
placeName.remove({}).then(function(){
  placeName.collection.insert(seedData).then(function(){
    process.exit();
  });
});

module.exports = mongoose;
