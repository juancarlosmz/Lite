


var app = angular.module('appLite', [
  'ngRoute',
  'empleadoControllers',
  'ui.bootstrap', 
  'ngCookies'
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
      when('/login2', {
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
      when('/products12/:id', {
        templateUrl: 'partials/product/product12.html',
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
      when('/login', {
        controller: 'LoginController',
        templateUrl: 'login/login.view.html',
        controllerAs: 'vm'
      }).
      when('/register', {
        controller: 'RegisterController',
        templateUrl: 'register/register.view.html',
        controllerAs: 'vm'
      }).
      when('/home:user', {
        controller: 'HomeControllerUser',
        templateUrl: 'home/home.html'
      }).
      otherwise({
        redirectTo: '/',
        method: 'GET',
      });







      /*para el login*/

      
      /*el login */






  }])

  .run(['$rootScope', '$location', '$cookieStore', '$http',
  function ($rootScope, $location, $cookieStore, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
          $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
          // redirect to login page if not logged in
          if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
              $location.path('/');
          }
      });
  }]);
/*
  app.run(['$rootScope', '$location', '$cookies', '$http',
  function($rootScope, $location, $cookies, $http) {

    // keep user logged in after page refresh
    $rootScope.globals = $cookies.getObject('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/');
        }
    });


  }]);

  */




app.controller('empleadoControllers', function($scope){
  controllerPrincipal = $scope;
});













