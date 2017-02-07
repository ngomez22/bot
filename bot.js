//Dependencies
var Twit = require('twit');
var twitterConfig = require('./config/twitter');
var redditConfig = require('./config/reddit');
var Snoocore = require('snoocore');
var exec = require('child_process').exec;
var fs = require('fs');

//Setup
var T = new Twit(twitterConfig);
var R = new Snoocore(redditConfig);

function tweet() {
  //Find best /r/earthporn post
  R('/r/showerthoughts/top/?sort=top&t=day').listing().then(function(posts) {
    console.log(posts.children[0].data.title);
    return posts.children[0].data.title
  }).then(function(thought) {
    //Save the thought to the text file
  });

  //Find best /r/showerthoughts post

  //Generate image to be posted
  var cmd = "C:/processing-3.2.3/processing-java.exe --sketch=C:/Users/Nicolás/Documents/bot/processing_sketch --run";
  exec(cmd, function(error, stdout, stderr) {
    //Handle any possible errors

    //Post on twitter
  });
}
