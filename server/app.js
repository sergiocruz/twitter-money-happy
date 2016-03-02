var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 4000;
var twcfg = require('./twitter-keys');
//var tw = require('node-tweet-stream')(twcfg);
var twitter = require('twitter'),
    client = new twitter(twcfg);;
var sentiment = require('sentiment');

var mongoose = require('mongoose');
mongoose.connect('mongodb://162.243.193.22/twitter-money-happy');


var Tweet = require('./model/Tweet');

var dicaprio = null;
Tweet.findById('56d65327481026594e000ac9', function(err, doc) {
    dicaprio = doc;
});

// var dicaprio = new Tweet({
//     avg: 0,
//     name: 'DiCaprio'
// });

// dicaprio.save(function(err) {

//     if (err) {
//         console.log('error saving');
//         return;
//     }

//     console.log('saved')
// })

//return;






server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.get('/', function(req, res) {
  res.send('hello world')
});

app.get('/avg', function(req, res) {
    res.json({ avg: dicaprio.avg });
})

// Routing
app.use(express.static(__dirname + '/public'));

client.stream('statuses/filter', {track: 'DiCaprio', language: 'en'}, function(stream) {
    stream.on('data', function(tweet) {
        //if (tweet.text.indexOf('RT') != 0) {
            var senti = sentiment(tweet.text);
            
            if (senti.score != 0) {
                dicaprio.avg = (dicaprio.avg + senti.score) / 2;
                dicaprio.save();

                console.log("A: " + parseInt(dicaprio.avg) + " -- S: " + senti.score + " -- " + tweet.text);
                io.emit('tweet', dicaprio.avg);
            }
        //}
    });

    stream.on('error', function(error) {
        console.log(error);
    });
});
//}

// for (var i in trackables)
//     tw.track(trackables[i]);

// tw.on('tweet', function(tweet) {
//     console.log(tweet);

//     var text = tweet.text;


//     io.emit('tweet', tweet);
// });

/*io.on('connection', function (socket) {
    
});*/
