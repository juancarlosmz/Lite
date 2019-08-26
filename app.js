


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
      when('/Home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController',
        method: 'GET',
        
      }).
      when('/Search', {
        templateUrl: 'partials/search.html',
        controller: 'SearchController',
        method: 'GET',
      }).
      when('/Products', {
        templateUrl: 'partials/Products.html',
        controller: 'AllProducts',
        method: 'GET',
      }).
      when('/products/:id/:wh', {
        templateUrl: 'partials/product/product.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/products2/:id/:wh', {
        templateUrl: 'partials/product/product2.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/products3/:id/:wh', {
        templateUrl: 'partials/product/product3.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/products4/:id/:wh', {
        templateUrl: 'partials/product/product4.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/products5/:id/:wh', {
        templateUrl: 'partials/product/product5.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/products6/:id/:wh', {
        templateUrl: 'partials/product/product6.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/products7/:id/:wh', {
        templateUrl: 'partials/product/product7.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/products8/:id/:wh', {
        templateUrl: 'partials/product/product8.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/products9/:id/:wh', {
        templateUrl: 'partials/product/product9.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/products10/:id/:wh', {
        templateUrl: 'partials/product/product10.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/products11/:id/:wh', {
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
      when('/register_a', {
        templateUrl: 'register/register.view_a.html',
        controller: 'RegisterController_a',
        method: 'GET',
      }).
      when('/home:user', {
        controller: 'HomeControllerUser',
        templateUrl: 'home/homeuser.php',
        method: 'GET',
      }).
      when('/verImportList/:email', {
        controller: 'UserImportListController',
        templateUrl: 'partials/verUserImportList.html',
        method: 'GET',
      }).
      when('/Import-List', {
        controller: 'ListController',
        templateUrl: 'partials/import-list.html',
        method: 'GET',
      }).
      when('/Result', {
        controller: 'AllProductsController',
        templateUrl: 'partials/AllProducts.html',
        method: 'GET',
      }).
      when('/Result/category-:category', {
        templateUrl: 'partials/AllProducts.html',
        controller: 'AllProductsController',
        method: 'GET',
      }).
      when('/Result/category-:category/:page', {
        templateUrl: 'partials/AllProducts.html',
        controller: 'AllProductsController',
        method: 'GET',
      }).
      when('/Result/category-1/1', {
        templateUrl: 'partials/AllProducts.html',
        controller: 'AllProductsController',
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

app.directive('tree', function() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      tree: '='
    },
    templateUrl: 'template-ul.html'
  };
});

app.directive('leaf', function($compile,$timeout,$window) {
  return {
    restrict: "E",
    replace: true,
    scope: {
      leaf: "=",
    },
    templateUrl: 'template-li.html',
    link: function(scope, element, attrs) {
      if (angular.isArray(scope.leaf.subtree)) {
        element.append("<tree tree='leaf.subtree'></tree>");
        element.addClass('dropdown-submenu');
        $compile(element.contents())(scope);
      } else {
        element.bind('click', function() {
          console.log(scope.leaf.name);
          $timeout(function(){
            $window.location.reload();
          }, 50);
          
        });

      }
    }
  };
});
