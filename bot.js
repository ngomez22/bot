var twit = require('twit');
var snoocore = require('snoocore');
var exec = require('child_process').exec;

var cmd = "C:/processing-3.2.3/processing-java.exe --sketch=C:/Users/Nicolás/Documents/bot/processing_sketch --run";

exec(cmd, done);

function done() {
    console.log("done");
}
