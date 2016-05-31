var express = require('express');
var hbs     = require('express-handlebars');
var app     = express();
var twit    = require('twit');
// var mongoose= require("./db/connection");
// var Tweet   = mongoose.model("Tweet");
//
var twitterCall = new twit({
  consumer_key:         '0TdkehH8AFT62g45djrd7IWd4',
  consumer_secret:      '5wjZmhgkk0tXmZFKGNwK3s2JcJEtpxImb5jny8u1I37e0u6qgm',
  access_token:         '1625578152-q36GQLNpTD1dz0eSswoKbhy0e4MCku4u3sB5shI',
  access_token_secret:  '14IjlykK4ohdFZcp7Yp4UjBmE2f2KOxOV0Bqko7nRZtwK',
  timeout_ms:           30*1000,  // optional HTTP request timeout to apply to all requests.
});

var params = {
   q: 'حلب since:2016-05-29',
   lang: "ar",
   count: 100
};

function gotData(err, data, resonse){
  var tweets = data.statuses;
  for (var i = 0; i < tweets.length; i++){
    console.log(tweets[i].text);
    console.log("---------------------------")
  }
};

twitterCall.get('search/tweets', params, gotData)









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
//
// app.get("api/tweets", function(req, res){
//   Tweet.find().then(function(tweets){
//     res.json(tweets);
//   });
// });

app.listen(3001, function(){
  console.log("------------it's aliiive!!!------------");
});
