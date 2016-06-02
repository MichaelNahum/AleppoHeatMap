var express      = require('express');
var hbs          = require('express-handlebars');
var app          = express();
var db           = require('./db/connection');
var http         = require('http');
var rp           = require('request-promise')
var mongoose     = require("./db/connection");
var twitterCall  = require('./twittercall');
var placeList    = [];
var numOfMentions = [];

app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:       ".hbs",
  layoutsDir:    "views",
  partialsDir:   "views",
  defaultLayout: "index"
}));
app.use("/assets", express.static('assets'));

app.get("/", function(req, res){
  if (placeList.length > 0) {
    placeList = []
  }
  var url = "http://api.geonames.org/childrenJSON?lang=ar&geonameId=170062&username=hotspotsm"
  rp(url)
  .then(function(data){
    var parsed = JSON.parse(data)
    for(var i=0; i < parsed.geonames.length; i++){
      placeList.push(
        {
          name: parsed.geonames[i].name,
          lat:  parsed.geonames[i].lat,
          lng:  parsed.geonames[i].lng,
          num_mentions: 0
        }
      );
    }
  }).then(function() {
    placeList.forEach(function(place) {
      var params = {
        q: place.name + ' since:2016-05-31',                                              //since yesterday?
        lang: "ar",
        count: 10
      }
      twitterCall
      .get('search/tweets', params)
      .then(function (response) {
        if (response.data.statuses != []) {
          place.num_mentions = response.data.statuses.length
        }
      })
    })
  })
  res.render("index");
});

app.get("/results", function(req, res){
  res.json(placeList)
});


app.listen(3001, function(){
  console.log("------------it's aliiive!!!------------");
});



// function getData() {
//   var placeList = []
//   var results;
//   var url = "http://api.geonames.org/childrenJSON?lang=ar&geonameId=170062&username=hotspotsm"
//   rp(url)
//   .then(function(data){
//     var parsed = JSON.parse(data)
//     for(var i=0; i < parsed.geonames.length; i++){
//       placeList.push(
//         {
//           name: parsed.geonames[i].name,
//           lat:  parsed.geonames[i].lat,
//           lng:  parsed.geonames[i].lng,
//           num_mentions: 0
//         }
//       );
//     }
//   }).then(function() {
//     placeList.forEach(function(place) {
//       var params = {
//         q: place.name + ' since:2016-05-31',                                              //since yesterday?
//         lang: "ar",
//         count: 10
//       }
//       twitterCall
//       .get('search/tweets', params)
//       .then(function (response) {
//         if (response.data.statuses != []) {
//           place.num_mentions = response.data.statuses.length
//         }
//       })
//     })
//   })
// }
