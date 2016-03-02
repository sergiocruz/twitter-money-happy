var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 4000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.get('/', function(req, res) {
  res.send('hello world')
})

// Routing
app.use(express.static(__dirname + '/public'));


io.on('connection', function (socket) {

  socket.on('agent.connect', function(agent, cb) {

    agent.id = agents.length + 1;

    console.log('connecting agent', agent);

    whoami = agent;
    whoamiType = 'agent';

    agents.push(agent);
    cb(agent);

    console.log('all agents', agents);
  });

  

});
