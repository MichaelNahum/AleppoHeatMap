var mongoose = require("mongoose");
var seedData = require("./seeds.json")
mongoose.connect("mongodb://localhost/testdb");


var placeName = mongoose.Schema({
  adminCode1: String,
  lng: String,
  geonameId: Number,
  toponymName: String,
  countryId: String,
  population: Number,
  countryCode: String,
  name: String,
  fclName: String,
  countryName: String,
  fcodeName: String,
  adminName1: String,
  lat: String,
  fcode: String,
  num_mentions: 0
})


mongoose.model("placeName", placeName);

//really not sure about this.
placeName.remove({}).then(function(){
  placeName.collection.insert(seedData).then(function(){
    process.exit();
  });
});

module.exports = mongoose;
