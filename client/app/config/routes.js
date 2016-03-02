module.exports = [
  '$stateProvider',
  '$urlRouterProvider',
  function setupRoutes($stateProvider, $urlRouterProvider) {

    // No otherwise allowed until we merge the routers
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      });
  }
]
