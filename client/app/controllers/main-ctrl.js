const socket = require('socket.io-client')('http://localhost:4000');

const ColorManipulate = require('color-manipulate');
const Color = require('color');


module.exports = [
  '$scope',
  '$timeout',
  '$http',
  MainCtrl
]

function MainCtrl($scope, $timeout, $http) {
  var vm = this;
  vm.mix = mix;
  vm.factor = 50;
  vm.color = null;
  vm.tweetsAnalyzed = 0;
  vm.loading = true;

  var red = Color("#cb3837");
  var green = Color("#8BCB37");

  activate();

  ///////////////

  /**
   * Default actions...
   * @return {Void}
   */
  function activate() {
    console.log('activated')
    $scope.$watch('vm.factor', mix)

    $timeout(function() {

      $http.get('http://localhost:4000/avg')
        .then(function(res) {

          console.log('done loading!');
          updateFactor(res.data.avg);
          vm.loading = false;
        })

    }, 2000)


    // mix();
  }

  /**
   * Mixes colors
   * @return {Void}
   */
  function mix() {

    // Parses factor
    vm.factor = parseInt(vm.factor);

    // Does nothing if number is invalid
    if (isNaN(vm.factor)) {
      vm.factor = 0;
      return;
    }

    // Produces new color
    vm.color = ColorManipulate.mix(red.clone(), green.clone(), vm.factor / 100);

    // Calculates feeling
    calculateFeeling();
  }

  /**
   * Calculates feeling
   * @return {Void}
   */
  function calculateFeeling() {

    if (vm.factor < 20) {
      vm.feeling = 'We hate him';
    } else if (vm.factor < 40) {
      vm.feeling = 'We don\'t like him'
    } else if (vm.factor < 60) {
      vm.feeling = 'He\'s ok'
    } else if (vm.factor < 80) {
      vm.feeling = 'We like him'
    } else {
      vm.feeling = 'We love him'
    }

  }

  /**
   * Start listening
   * @return {Void}
   */
   socket.on('connect', function() {
     console.log('connected')

     socket.on('tweet', function(avg) {

       console.log('avg', avg);
       $timeout(updateFactor.bind(null, avg));
       // updateFactor(avg);

     })
   });




  /**
   * Updates factor
   * @param  {number} avg
   * @return {Void}
   */
  function updateFactor(avg) {

    var number = (avg + 5) * 10;

    if (number > 100) {
      vm.factor = 100;
      return;
    } else if (number < 0) {
      vm.factor = 0;
      return;
    }

    vm.factor = number;
    vm.tweetsAnalyzed++;


  }

}
