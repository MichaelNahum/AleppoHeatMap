var express      = require('express');
var hbs          = require('express-handlebars');
var app          = express();
var twit         = require('twit');
var http         = require('http');
var placeList    = [];
var fetchResults = [];
var placeName    = {num_mentions: 0}
// var mongoose= require("./db/connection");

// The Geonames API call. Returns an array of 131 objects,
var url = "http://api.geonames.org/childrenJSON?lang=ar&geonameId=170063&username=hotspotsm"

http.get(url, function(res){
  var body = ''
  res.on('data', function(d){
    body += d;
  })
  res.on('end', function(){
    var parsed = JSON.parse(body);
    for(var i=0; i < parsed.geonames.length; i++){
      placeList.push(parsed.geonames[i]);
      // getTweets(i);
    }
    // db.collection.('DATABASENAME').save(jsonResult, function(err, records){
    //   if (err) throw err;
    //   console.log("record added");
    // });
  });
});

function getTweets(i) {
  var params = {
    q: placeList[i].name +' since:2016-05-31',                                                             //since yesterday?
    lang: "ar",
    count: 5
  }
  twitterCall.get('search/tweets', params).then(function(response){
    var tweets = response.data.statuses
    for (var i = 0; i < tweets.length; i++) {
      fetchResults.push(tweets[i])
    }
    console.log(fetchResults.length);
  })
}


  // x iterate through placeList
  // x make twitter api call for each name in list
  // x grab number of results for each twitter call
  // construct object that contains place name and number of mentions on twitter for each place
  // the return an array of objects


//The Twitter API call. Should loop through result of Geonames call and count results.
var twitterCall = new twit({
  consumer_key:         '0TdkehH8AFT62g45djrd7IWd4',
  consumer_secret:      '5wjZmhgkk0tXmZFKGNwK3s2JcJEtpxImb5jny8u1I37e0u6qgm',
  access_token:         '1625578152-q36GQLNpTD1dz0eSswoKbhy0e4MCku4u3sB5shI',
  access_token_secret:  '14IjlykK4ohdFZcp7Yp4UjBmE2f2KOxOV0Bqko7nRZtwK',
  timeout_ms:           30*1000,  // optional HTTP request timeout to apply to all requests.
});


// function gotData(err, data, resonse){
//   var tweets = data.statuses;
//   for (var i = 0; i < tweets.length; i++){
//     console.log(tweets[i].text);
//     console.log("---------------------------")
//   }
// };


app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:       ".hbs",
  layoutsDir:    "views",
  partialsDir:   "views",
  defaultLayout: "index"
}));

app.get("/", function(req, res){
res.render("index");
});

app.listen(3001, function(){
  console.log("------------it's aliiive!!!------------");
});
