//Dependencies
var Twit = require('twit');
var twitterConfig = require('./config/twitter');
var redditConfig = require('./config/reddit');
var Snoocore = require('snoocore');
var exec = require('child_process').exec;

//Setup
var T = new Twit(twitterConfig);
var R = new Snoocore(redditConfig);

function tweet() {
  //Find best /r/earthporn post

  //Find best /r/showerthoughts post

  //Generate image to be posted
  var cmd = "C:/processing-3.2.3/processing-java.exe --sketch=C:/Users/Nicolás/Documents/bot/processing_sketch --run";
  exec(cmd, function() {
    console.log("Image succesfully generated.");
  });

  //Post image on Twitter

}

R('/api/v1/me').get().then(function(result) {
  console.log(result);
});
