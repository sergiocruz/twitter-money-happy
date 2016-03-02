const angular = require('angular')

angular
  .module('app', [
    require('angular-ui-router')
  ])
  .config(require('./config/routes'))
  .controller('MainController', require('./controllers/main-ctrl'))
