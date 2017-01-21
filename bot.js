//Dependencies
var Twit = require('twit');
var twitterConfig = require('./config/twitter');
var redditConfig = require('./config/reddit');
var Snoocore = require('snoocore');
var exec = require('child_process').exec;

//Setup
var T = new Twit(twitterConfig);

var reddit = new Snoocore({
    // Unique string identifying the app
    userAgent: 'node:bot:v1 (by /u/ngomez-bot)',
    // It's possible to adjust throttle less than 1 request per second.
    // Snoocore will honor rate limits if reached.
    throttle: 300,
    oauth: {
        type: 'implicit',
        key: '_sty7RuHMXLIfA',
        redirectUri: 'http://localhost:3000',
        // The OAuth scopes that we need to make the calls that we
        // want. The reddit documentation will specify which scope
        // is needed for evey call
        scope: ['identity', 'read', 'vote']
    }
});


var cmd = "C:/processing-3.2.3/processing-java.exe --sketch=C:/Users/Nicolás/Documents/bot/processing_sketch --run";

exec(cmd, done);

function done() {
    console.log("Image generated.");
}
