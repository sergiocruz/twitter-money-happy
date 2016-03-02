var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 4000;
var twcfg = require('./twitter');
var tw = require('node-tweet-stream')(twcfg);

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.get('/', function(req, res) {
  res.send('hello world')
})

// Routing
app.use(express.static(__dirname + '/public'));

tw.track('javascript');

tw.on('tweet', function(tweet) {
    console.log(tweet);
    io.emit('tweet', tweet);
});

/*io.on('connection', function (socket) {
    
});*/
