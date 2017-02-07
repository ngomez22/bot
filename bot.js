//Dependencies
var Twit = require('twit');
var twitterConfig = require('./config/twitter');
var redditConfig = require('./config/reddit');
var Snoocore = require('snoocore');
var exec = require('child_process').exec;
var fs = require('fs');
var request = require('request');

//Setup
var T = new Twit(twitterConfig);
var R = new Snoocore(redditConfig);

function tweet() {
  //Find best /r/showerthoughts post
  R('/r/showerthoughts/top/?sort=top&t=day').listing().then(function(posts) {
    console.log("thought: " + posts.children[0].data.title);
    return posts.children[0].data.title
  }).then(function(thought) {
    //Save the thought to the text file
    fs.writeFile("./processing_sketch/example-files/thought.txt", thought, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  });

  //Find best /r/earthporn post
  R('/r/earthporn/top/?sort=top&t=day').listing().then(function(posts) {
    console.log("pic: " + posts.children[0].data.url);
    return posts.children[0].data.url
  }).then(function(pic) {
    //Save the picture
    downloadPic(pic, "./processing_sketch/example-files/pic.jpg", function() {
      //Generate image to be posted
      const cmd = "C:/processing-3.2.3/processing-java.exe --sketch=C:/Users/Nicolás/Documents/bot/processing_sketch --run";
      exec(cmd, function(error, stdout, stderr) {
        //Handle any possible errors

        //Post on twitter
        var b64pic = fs.readFileSync('./processing_sketch/output.png', {
          encoding: 'base64'
        })

        T.post('media/upload', {
          media_data: b64pic
        }, function(err, data, response) {
          // Retrieve uploaded's picture media id string
          var mediaId = data.media_id_string;
          // Post tweet
          T.post('statuses/update', {
            status: '#randomwalk',
            media_ids: [mediaId]
          }, function(err, data, response) {
            if (err) {
              console.log(err);
            } else {
              console.log("Tweeted! - " + data.text);
            }
          });
        });
      });
    })
  });
}

function downloadPic(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

tweet();
