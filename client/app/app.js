const angular = require('angular')
const socket = require('socket.io-client')('http://localhost:4000');

socket.on('connect', function() {
  console.log('connected')
});

angular
  .module('app', [
    require('angular-ui-router')
  ])
  .config(require('./config/routes'))
  .controller('MainController', require('./controllers/main-ctrl'))
