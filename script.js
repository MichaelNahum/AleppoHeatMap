var express       = require('express');
var hbs           = require('express-handlebars');
var app           = express();
var http          = require('http');
var rp            = require('request-promise')
var twitterCall   = require('./twittercall');
var placeList     = [];
var numOfMentions = [];
var getDate       = require("./date");

app.set("port", process.env.PORT || 3001)
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:       ".hbs",
  layoutsDir:    "views",
  partialsDir:   "views",
  defaultLayout: "index"
}));
app.use("/assets", express.static('assets'));

placeList = [];
function get_tweets() {
    if (placeList.length > 0) return;

    var url = "http://api.geonames.org/childrenJSON?lang=ar&"+ "geonameId=170063" + "&username=hotspotsm"
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
          q: place.name + ' since:' + getDate.yesterdayString,
          lang: "ar",
          count: 12
        }
        twitterCall
        .get('search/tweets', params)
        .then(function (response) {
          if (response.data.statuses && response.data.statuses != []) {
            place.num_mentions = response.data.statuses.length
          }
        })
      })
    })
}

get_tweets();

app.get("/", function(req, res){
  res.render("search");
});


app.get("/map", function(req, res){
  res.render("index");
});

app.get("/results", function(req, res){
  res.json(placeList);
});

app.listen(app.get("port"), function(){
  console.log("------------it's aliiive!!!------------");
});
