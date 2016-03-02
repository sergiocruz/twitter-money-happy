// Dependencies
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 4000;
var twcfg = require('./twitter-keys');
var cors = require('cors')
var twitter = require('twitter');
var client = new twitter(twcfg);
var sentiment = require('sentiment');
var mongoose = require('mongoose');
var Tweet = require('./model/Tweet');

// Connect to mongo
mongoose.connect('mongodb://162.243.193.22/twitter-money-happy');

// Use CORS
app.use(cors());

// DiCaprio Record to update
var dicaprio = null;
Tweet.findById('56d65327481026594e000ac9', function(err, doc) {
  dicaprio = doc;
});

// Listen to server
server.listen(port, function() {
  console.log('Server listening at port %d', port);
});

// Home route (for test purposes)
app.get('/', function(req, res) {
  res.send('hello world')
});

// Get average
app.get('/avg', function(req, res) {
  res.json({
    avg: dicaprio.avg
  });
})

// Routing
app.use(express.static(__dirname + '/public'));

// Streaming API
client.stream('statuses/filter', {
  track: 'DiCaprio', // search term
  language: 'en' // language
}, function onStream(stream) {

  stream.on('data', function(tweet) {

    // Sentiment
    var senti = sentiment(tweet.text);

    if (senti.score != 0) {

      // DiCaprio Score
      dicaprio.avg = (dicaprio.avg + senti.score) / 2;
      dicaprio.save();

      // Log
      console.log("A: " + parseInt(dicaprio.avg) + " -- S: " + senti.score + " -- " + tweet.text);

      // Send data to frontend
      io.emit('tweet', dicaprio.avg);
    }
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});
