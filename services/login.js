app.factory('loginlist', ['$http', function($http) { 
    return {
      list: function (callback){
        $http({
          method: 'POST',
          url: 'http://localhost:50/Lite/api/?a=Login',
          cache: true
        }).success(callback);
      }
    };
}]);