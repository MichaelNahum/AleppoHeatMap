var twit         = require('twit');
var http         = require('http');

var twitterCall = new twit({
  consumer_key:         '0TdkehH8AFT62g45djrd7IWd4',
  consumer_secret:      '5wjZmhgkk0tXmZFKGNwK3s2JcJEtpxImb5jny8u1I37e0u6qgm',
  access_token:         '1625578152-q36GQLNpTD1dz0eSswoKbhy0e4MCku4u3sB5shI',
  access_token_secret:  '14IjlykK4ohdFZcp7Yp4UjBmE2f2KOxOV0Bqko7nRZtwK',
  timeout_ms:           30*1000,  // optional HTTP request timeout to apply to all requests.
});

module.exports = twitterCall;
