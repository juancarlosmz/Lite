app.factory('userSession', ['$http', function($http) { 
    return {
      set:function(key,value){
          return sessionStorage.setItem(key,value);
      },
      get:function(key){
          return sessionStorage.getItem(key);
      },
      destroy:function(key){
        $http.post(rute+'api/?a=Logout').then(function successCallback(response) {
            console.log('destructed session');
        }, function errorCallback(response) {
            $scope.error = 'Error 808';
        });
          return sessionStorage.removeItem(key);
      }
    };
}]);