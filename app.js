


var app = angular.module('appLite', [
  'ngRoute',
  'empleadoControllers',
  'ui.bootstrap', 
  'ngCookies',
  'ngStorage',
  'ngMessages'
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
      when('/products2/:id', {
        templateUrl: 'partials/product/product2.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/products3/:id', {
        templateUrl: 'partials/product/product3.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/products4/:id', {
        templateUrl: 'partials/product/product4.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/products5/:id', {
        templateUrl: 'partials/product/product5.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/products6/:id', {
        templateUrl: 'partials/product/product6.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/products7/:id', {
        templateUrl: 'partials/product/product7.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/products8/:id', {
        templateUrl: 'partials/product/product8.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/products9/:id', {
        templateUrl: 'partials/product/product9.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/products10/:id', {
        templateUrl: 'partials/product/product10.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/products11/:id', {
        templateUrl: 'partials/product/product11.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/ver/:id', {
        templateUrl: 'partials/ver.html',
        controller: 'EmpleadoVerCtrl',
        method: 'GET',
      }).
      when('/login', {
        templateUrl: 'login/login.view.html',
        controller: 'LoginController',
        method: 'GET',
        
      }).
      when('/register', {
        templateUrl: 'register/register.view.html',
        controller: 'RegisterController',
        method: 'GET',
      }).
      when('/home:user', {
        controller: 'HomeControllerUser',
        templateUrl: 'home/homeuser.html',
        method: 'GET',
      }).
      when('/Import-List', {
        controller: 'ListController',
        templateUrl: 'partials/import-list.html',
        method: 'GET',
      }).
      otherwise({
        redirectTo: '/',
        method: 'GET',
      });
  }]);

app.controller('empleadoControllers', function($scope){
  controllerPrincipal = $scope;
});













