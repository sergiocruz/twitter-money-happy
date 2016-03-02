const ColorManipulate = require('color-manipulate');
const Color = require('color');


module.exports = [
  '$scope',
  '$timeout',
  MainCtrl
]

function MainCtrl($scope, $timeout) {
  var vm = this;
  vm.mix = mix;
  vm.factor = 50;
  vm.color = null;

  var red = Color("#cb3837");
  var green = Color("#8BCB37");

  activate();

  ///////////////

  function activate() {
    console.log('activated')
    mix();
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
      vm.feeling = 'I hate it';
    } else if (vm.factor < 40) {
      vm.feeling = 'I don\'t like it'
    } else if (vm.factor < 60) {
      vm.feeling = 'It\'s ok'
    } else if (vm.factor < 80) {
      vm.feeling = 'I like it'
    } else {
      vm.feeling = 'I love it'
    }

  }

  $scope.$watch('vm.factor', mix)

}
