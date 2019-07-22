var app = angular.module('appLite', [
  'ngRoute',
  'empleadoControllers',
  'ui.bootstrap'
]);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController',
        method: 'GET',
      }).
      when('/login', {
        templateUrl: 'partials/login.php',
        controller: 'EmpleadoLogin',
        method: 'GET',
      }).
      when('/Products', {
        templateUrl: 'partials/Products.html',
        controller: 'AllProducts',
        method: 'GET',
      }).
      when('/products/:id', {
        templateUrl: 'partials/product/product.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/ver/:id', {
        templateUrl: 'partials/ver.html',
        controller: 'EmpleadoVerCtrl',
        method: 'GET',
      }).
      when('/ver/:codigo', {
        templateUrl: 'partials/ver.html',
        controller: 'EmpleadoVerCtrl',
        method: 'GET',
      }).
      when('/listado', {
        templateUrl: 'partials/listado.html',
        controller: 'EmpleadoListadoCtrl',
        method: 'GET',
      }).
      otherwise({
        redirectTo: '/',
        method: 'GET',
      });
  }]);


