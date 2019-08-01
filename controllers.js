var empleadoControllers = angular.module('empleadoControllers', []);
var rute = 'http://localhost:50/Lite/';
empleadoControllers.controller('HomeController', ['$scope','products','categories','$localStorage','$sessionStorage','$timeout', function($scope,products,categories,$localStorage,$sessionStorage,$timeout) {
    //filter products after onload
    $timeout(function(){
        document.getElementById("filtercoll").click();
    }, 3000);     
    products.list(function(products) {
        $scope.products = products;  
    });
    categories.list(function(categories) {
        $scope.categories = categories;  
    });


    //para añadir SKU
    $scope.prodskus = [];

    $scope.addToCard = function (p) {
        var resultado = document.getElementsByClassName("valuesku");
        for (var i = 0; i < resultado.length; i++) {
            if (resultado[i].value == p.sku) {
                console.log(resultado[i].value);
                if ($scope.prodskus.indexOf(resultado[i].value) == -1) {
                    $scope.prodskus.push(resultado[i].value);
                    $scope.errortext = "";
                } else {
                    $scope.errortext = "The item is already in your shopping list.";
                }
            } 
        }
    }

    $scope.removeItem = function (x) {
        $scope.errortext = "";    
        $scope.prodskus.splice(x, 1);
    }
 





    //test session y local storagge
    //link-->https://github.com/gsklee/ngStorage
    $scope.$storage = $localStorage;
/*
    $scope.$storage = $localStorage.$default({
        counter: 42
    });
    */
      
}]);

empleadoControllers.controller('Productview', ['$scope','product','stock', function($scope,product,stock) {
    product.list(function(product) {
            $scope.product = product;
    });

    stock.list(function(stock) {
            $scope.stock = stock;
    });
/*
    $scope.myInterval = 3000;
    $scope.slides = [
      {
        image: 'http://lorempixel.com/400/200/'
      },
      {
        image: 'http://lorempixel.com/400/200/food'
      },
      {
        image: 'http://lorempixel.com/400/200/sports'
      },
      {
        image: 'http://lorempixel.com/400/200/people'
      }
    ];
*/
}]);

empleadoControllers.controller('LoginController', ['$scope','$location', 'AuthenticationService','$http','$timeout',function($scope,$location,AuthenticationService,$http,$timeout) {
    $scope.login = function () {
        $scope.dataLoading = true;
        /*funciona
        AuthenticationService.Login($scope.email, $scope.password, function(response) {
            if(response.success) {
                AuthenticationService.SetCredentials($scope.email, $scope.password);
                $http.get(rute+'api/?a=User&email=' + $scope.email).then(function(response){
                    $scope.model = response.data;
                    console.log("usuario es ", response.data);
                    $location.path('/home:user');
                });        
            } else {
                $scope.error = response.message;
                $location.path('/login');
                $scope.dataLoading = false;
            }
        });
        */
        $timeout(function(){
            $http.post(rute+'api/?a=Login').then(function successCallback(response) {
                var model = response.data;
                for(var i = 0; i < model.length; i++){
                    var loginjs = model[i].email;
                    var contrajs = model[i].contra;
                    console.log(loginjs);
                    if( loginjs === $scope.email && contrajs === $scope.password){
                        $http.get(rute+'api/?a=User&email=' + $scope.email).then(function(response){
                            $scope.model = response.data;
                            console.log("usuario es ", response.data);
                            $scope.dataLoading = false;
                            $location.path('/home:user');
                        }); 
                        break;     
                    }else{
                        $scope.error = 'Email or password is incorrect';
                        $scope.dataLoading = false;
                        break;
                    };
                };
            });
        }, 1000);
    };   
}]);

empleadoControllers.controller('RegisterController', ['$scope','$http','$timeout', function($scope,$http,$timeout){
    $scope.register = function(){
        $scope.dataLoading = true;
        $timeout(function(){
            $http.post(rute+'api/?a=Login').then(function successCallback(response) {
                var model = response.data;
                for(var i = 0; i < model.length; i++){
                    var loginjs = model[i].email;
                    console.log(loginjs);
                    if( loginjs === $scope.email){
                        $scope.error = 'This email is already in use';
                        $scope.dataLoading = false;
                        break;     
                    }else{
                        var model = {
                            Nombre: $scope.Nombre,
                            Apellido: $scope.Apellido,
                            email: $scope.email,
                            contra: $scope.contra,
                        };
                        console.log(model);
                        /*
                        $http.post(rute+'api/?a=registrar',model).then(function successCallback(response) {   
                            console.log("registrrado");
                        }, function errorCallback(response) {
                            $scope.error = 'Usuario no registrado';
                        });
                        */
                        $scope.error = 'Usuario registrado';
                        $scope.dataLoading = false;
                        break;
                        //end
                    };
                };
            });
        }, 1000);    
    };
}]);



empleadoControllers.controller('HomeControllerUser', ['$scope','$rootScope','$routeParams','$http',function($scope,$rootScope,$routeParams,$http) {
    console.log("activo");
}]);

