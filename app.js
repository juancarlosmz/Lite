


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
    /*
    $locationProvider.hashPrefix('');
    
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    }).hashPrefix('');
    */
/*
    $locationProvider.hashPrefix('').html5Mode({
      enabled: true,
      requireBase: false
    });
*/
    //$locationProvider.hashPrefix('').html5Mode(true);
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
      when('/product/:id/:wh', {
        templateUrl: 'partials/Product.html',
        controller: 'ProductviewController',
        method: 'GET',
      }).
      when('/product1/:id/:wh', {
        templateUrl: 'partials/product/product.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/product2/:id/:wh', {
        templateUrl: 'partials/product/product2.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/product3/:id/:wh', {
        templateUrl: 'partials/product/product3.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/product4/:id/:wh', {
        templateUrl: 'partials/product/product4.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/product5/:id/:wh', {
        templateUrl: 'partials/product/product5.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/product6/:id/:wh', {
        templateUrl: 'partials/product/product6.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/product7/:id/:wh', {
        templateUrl: 'partials/product/product7.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/product8/:id/:wh', {
        templateUrl: 'partials/product/product8.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/product9/:id/:wh', {
        templateUrl: 'partials/product/product9.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/product10/:id/:wh', {
        templateUrl: 'partials/product/product10.html',
        controller: 'Productview',
        method: 'GET',
      }).
      when('/product11/:id/:wh', {
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
      when('/Result/category-:category/:page', {
        templateUrl: 'partials/AllProducts.html',
        controller: 'AllProductsController',
        method: 'GET',
      }).
      when('/Syncup/category0', {
        templateUrl: 'partials/Syncup.html',
        controller: 'SyncupController',
        method: 'GET',
      }).
      when('/Syncup/category1', {
        templateUrl: 'partials/Syncup.html',
        controller: 'SyncupController1',
        method: 'GET',
      }).
      when('/Syncup/category2', {
        templateUrl: 'partials/Syncup.html',
        controller: 'SyncupController2',
        method: 'GET',
      }).
      when('/Syncup/category3', {
        templateUrl: 'partials/Syncup.html',
        controller: 'SyncupController3',
        method: 'GET',
      }).
      when('/Syncup/category4', {
        templateUrl: 'partials/Syncup.html',
        controller: 'SyncupController4',
        method: 'GET',
      }).
      when('/Syncup/category5', {
        templateUrl: 'partials/Syncup.html',
        controller: 'SyncupController5',
        method: 'GET',
      }).
      when('/Syncup/category6', {
        templateUrl: 'partials/Syncup.html',
        controller: 'SyncupController6',
        method: 'GET',
      }).
      when('/Syncup/category7', {
        templateUrl: 'partials/Syncup.html',
        controller: 'SyncupController7',
        method: 'GET',
      }).
      when('/Syncup/category8', {
        templateUrl: 'partials/Syncup.html',
        controller: 'SyncupController8',
        method: 'GET',
      }).
      when('/Syncup/category9', {
        templateUrl: 'partials/Syncup.html',
        controller: 'SyncupController9',
        method: 'GET',
      }).
      when('/Syncup/category10', {
        templateUrl: 'partials/Syncup.html',
        controller: 'SyncupController10',
        method: 'GET',
      }).
      when('/Syncup/category11', {
        templateUrl: 'partials/Syncup.html',
        controller: 'SyncupController11',
        method: 'GET',
      }).
      when('/Syncup/category12', {
        templateUrl: 'partials/Syncup.html',
        controller: 'SyncupController12',
        method: 'GET',
      }).
      when('/Syncup/category13', {
        templateUrl: 'partials/Syncup.html',
        controller: 'SyncupController13',
        method: 'GET',
      }).
      when('/Syncup/category14', {
        templateUrl: 'partials/Syncup.html',
        controller: 'SyncupController14',
        method: 'GET',
      }).
      when('/Syncup/category15', {
        templateUrl: 'partials/Syncup.html',
        controller: 'SyncupController15',
        method: 'GET',
      }).
      when('/Syncup/category16', {
        templateUrl: 'partials/Syncup.html',
        controller: 'SyncupController16',
        method: 'GET',
      }).
      when('/Syncup/category17', {
        templateUrl: 'partials/Syncup.html',
        controller: 'SyncupController17',
        method: 'GET',
      }).
      when('/Syncup/category18', {
        templateUrl: 'partials/Syncup.html',
        controller: 'SyncupController18',
        method: 'GET',
      }).
      when('/Results/allProducts', {
        templateUrl: 'partials/Products.html',
        controller: 'ProductsController',
        method: 'GET',
      }).
      when('/Results/allProducts/:category', {
        templateUrl: 'partials/Products.html',
        controller: 'ProductsControllerCategory',
        method: 'GET',
      }).
      when('/Results/allProducts/:category/:subcategory', {
        templateUrl: 'partials/Products.html',
        controller: 'ProductsControllersubCategory',
        method: 'GET',
      }).
      when('/Results/allProducts/:category/:subcategory/:subsubcategory', {
        templateUrl: 'partials/Products.html',
        controller: 'ProductsControllersubsubCategory',
        method: 'GET',
      }).
      when('/Results/allProducts/:category/:subcategory/:subsubcategory/:subsubsubcategory', {
        templateUrl: 'partials/Products.html',
        controller: 'ProductsControllersubsubsubCategory',
        method: 'GET',
      }).
      when('/cifradorcesar', {
        templateUrl: 'partials/cifradorcesar.html',
        controller: 'cifradorcesarController',
        method: 'GET',
      }).
      when('/Best_Selling', {
        templateUrl: 'home_page/Best_Selling.html',
        controller: 'CustomizeHomepageController',
        method: 'GET',
      }).
      when('/High_Potential', {
        templateUrl: 'home_page/High_Potential.html',
        controller: 'CustomizeHomepageController',
        method: 'GET',
      }).
      when('/New_Arrivals', {
        templateUrl: 'home_page/New_Arrivals.html',
        controller: 'CustomizeHomepageController',
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
