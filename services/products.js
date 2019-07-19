

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


  app.factory('product', ['$http', function($http) { 
    return {
      list: function (callback){
        $http({
          method: 'GET',
          url: 'http://localhost:50/Lite/chinabrands/chinabrands/GetProductInformation.php',
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
