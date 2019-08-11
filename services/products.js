
var ruteserv = 'http://localhost:50/Lite/';

app.factory('products', ['$http', function($http) { 
    return {
      list: function (callback){
        $http({
          method: 'POST',
          url: ruteserv+'chinabrands/GetProductCollention.php',
          cache: true
        }).success(callback);
      }
    };
}]);

app.factory('categories', ['$http', function($http) { 
  return {
    list: function (callback){
      $http({
        method: 'POST',
        url: ruteserv+'chinabrands/GetCategories.php',
        cache: true
      }).success(callback);
    }
  };
}]);
app.factory('product', ['$http','$routeParams', function($http,$routeParams) { 
    return {
      list: function (callback){
        $http({
          method: 'POST',
          url: ruteserv+'chinabrands/GetProductInformation.php?id='+ $routeParams.id,
          cache: true
        }).success(callback);
      }
    };
}]);  
app.factory('stock', ['$http','$routeParams', function($http,$routeParams) { 
    return {
      list: function (callback){
        $http({
          method: 'POST',
          url: ruteserv+'chinabrands/GetProductStock.php?id='+ $routeParams.id,
          cache: true
        }).success(callback);
      }
    };
}]);  






