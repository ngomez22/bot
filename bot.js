//Dependencies
var CronJob = require('cron').CronJob;
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
    console.log("Thought: " + posts.children[0].data.title);
    return posts.children[0].data.title
  }).then(function(thought) {
    //Save the thought to the text file
    fs.writeFile("./processing_sketch/files/thought.txt", thought, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  });

  //Find best /r/earthporn post
  R('/r/earthporn/top/?sort=top&t=day').listing().then(function(posts) {
    var url = posts.children[0].data.url;
    if (url.includes("imgur")) {
      url = url + ".jpg";
    }
    url.replace(/amp;/g, "");
    console.log("Pic: " + url);
    return url;
  }).then(function(pic) {
    //Save the picture
    downloadPic(pic, "./processing_sketch/files/pic.jpg", function() {
      //Generate image to be posted
      console.log("Succesfully saved image");
      const cmd = "DISPLAY=:0 ~/processing-3.3/processing-java --sketch=/home/pi/projects/earthoughts/processing_sketch --present";
      exec(cmd, function(err, stdout, stderr) {
        //Handle any possible errors
        if (err) {
          console.log(err)
        }
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
            status: formatDate(new Date()),
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
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

tweet();
new CronJob('0 0 12 * * *', tweet, function() {
  console.log('DONE RUNNING -- Twitter bot will now die');
}, true);
