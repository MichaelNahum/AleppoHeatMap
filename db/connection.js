var mongoose = require("mongoose");
var seedData = require("./seeds.json")


var placeNameSchema = mongoose.Schema({
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


mongoose.model("placeName", placeNameSchema);
mongoose.connect("mongodb://localhost/testdb");


module.exports = mongoose;
