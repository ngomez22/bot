//Dependencies
var Twit = require('twit');
var twitterConfig = require('./config/twitter');
var redditConfig = require('./config/reddit');
var Snoocore = require('snoocore');
var exec = require('child_process').exec;

//Setup
var T = new Twit(twitterConfig);

var reddit = new Snoocore(redditConfig);


var cmd = "C:/processing-3.2.3/processing-java.exe --sketch=C:/Users/Nicolás/Documents/bot/processing_sketch --run";

exec(cmd, done);

function done() {
    console.log("Image generated.");
}

reddit('/api/v1/me').get().then(function(result) {
  console.log(result); 
});
