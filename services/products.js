

app.factory('products', ['$http', function($http) { 
    return {
      list: function (callback){
        $http({
          method: 'GET',
          url: 'http://localhost:50/Lite/chinabrands/GetProductCollention.php',
          cache: true
        }).success(callback);
      }
    };
}]);

app.factory('categories', ['$http', function($http) { 
  return {
    list: function (callback){
      $http({
        method: 'GET',
        url: 'http://localhost:50/Lite/chinabrands/GetCategories.php',
        cache: true
      }).success(callback);
    }
  };
}]);

 
app.factory('product', ['$http','$routeParams', function($http,$routeParams) { 
    return {
      list: function (callback){
        $http({
          method: 'GET',
          url: 'http://localhost:50/Lite/chinabrands/GetProductInformation.php?id='+ $routeParams.id,
          cache: true
        }).success(callback);
      }
    };
}]);  

app.factory('stock', ['$http','$routeParams', function($http,$routeParams) { 
    return {
      list: function (callback){
        $http({
          method: 'GET',
          url: 'http://localhost:50/Lite/chinabrands/GetProductStock.php?id='+ $routeParams.id,
          cache: true
        }).success(callback);
      }
    };
}]);  
  
/*
 app.factory('products', ['$http', function($http) { 
  return $http.get('https://s3.amazonaws.com/codecademy-content/courses/ltp4/events-api/events.json')
            .success(function(response) {
              return response.data;
            })
            .error(function(response) {
              return response.err;
            });
}]);
*/





