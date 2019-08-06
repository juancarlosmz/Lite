var empleadoControllers = angular.module('empleadoControllers', []);
var rute = 'http://localhost:50/Lite/';
'use strict';
empleadoControllers.controller('HomeController', ['$scope','products','categories','$localStorage','$sessionStorage','$timeout','$filter','$http', function($scope,products,categories,$localStorage,$sessionStorage,$timeout,$filter,$http) {
    //filter products after onload
    $scope.inicializarFiltroskus = function () {
        var skufilter = document.getElementsByClassName("valuesku");
        for (var i = 0; i < skufilter.length; i++) {
            if(skufilter[i].value.substr(7, 8) == "01"){
                document.getElementsByClassName("showsku")[i].style.display = "block";
            }else{
                document.getElementsByClassName("showsku")[i].style.display = "none";
            }
        }
    }; 
    $timeout(function(){
        $scope.inicializarFiltroskus();
    }, 3000);  


    $scope.filtroProducts = [];
    $scope.currentPageProducts = 1;
    $scope.numPerPageProducts = 8; //es 40

    $scope.hacerPagineoProducts = function (arreglo) {
        //si no retorna ningun valor
        if (!arreglo || !arreglo.length) { return; }
        var principio = (($scope.currentPageProducts - 1) * $scope.numPerPageProducts); //0, 3
        var fin = principio + $scope.numPerPageProducts; //3, 6
        $scope.filtroProducts = arreglo.slice(principio, fin); // 
    };

    $scope.buscarProducts = function (busquedaprod) {
        var buscados = $filter('filter') ($scope.dataProducts, function (prod) {
            return (prod.sku.toLowerCase().indexOf(busquedaprod.toLowerCase()) !== -1); // matches, contains
        });
        $scope.totalProducts = buscados.length;
        $scope.hacerPagineoProducts(buscados);
        $timeout(function(){
            $scope.inicializarFiltroskus();
        }, 500);
    };

    $scope.$watch('currentPageProducts',function(){
          $scope.hacerPagineoProducts($scope.dataProducts);
          $timeout(function(){
            $scope.inicializarFiltroskus();
          }, 500); 
    });
/*
    $scope.inicializarProducts = function () {
        $http.post(rute+"chinabrands/GetProductCollention.php").then(function successCallback(response) {
            $scope.dataProd = response.data; 
            $scope.dataProducts = $scope.dataProd.msg;
            $scope.totalProducts = $scope.dataProducts.length;
            //console.log($scope.dataProducts);
            //console.log($scope.totalProducts);
            $scope.hacerPagineoProducts($scope.dataProducts);

        }, function errorCallback(response) {
            console.log("error 505");    
        });
    };
    $scope.inicializarProducts();
*/
    //aqui ya no es necesario inicializar

    products.list(function(products) {
        $scope.products = products;  
        $scope.dataProducts = $scope.products.msg;
        $timeout(function(){
            $scope.inicializarFiltroskus();
        }, 500);  
        //para no contar los que terminan en 01
        var numberSelected = 0;
        for (var i in $scope.products.msg) {
            if($scope.products.msg[i]['sku'].substr(7,8) != "01"){
                //console.log($scope.products.msg[i]['sku']);
                numberSelected++;
            }
        }
        console.log(numberSelected)
        $scope.totalProducts = $scope.dataProducts.length;
        $scope.hacerPagineoProducts($scope.dataProducts);
        console.log($scope.totalProducts);

        
/*
        for (var i in $scope.dataProducts) {
            if($scope.dataProducts[i]['status'] == 1){
                console.log($scope.dataProducts[i]['status']);
            }
        }
*/
    });

    categories.list(function(categories) {
        $scope.categories = categories;  
    });

    
    //para añadir SKU
    $scope.prodskus = [];
/*
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
*/
    $scope.removeItem = function (x) {
        $scope.errortext = "";    
        $scope.prodskus.splice(x, 1);
    }
    //test session y local storagge
    //link-->https://github.com/gsklee/ngStorage
    $scope.$storage = $localStorage;

    $scope.removeStorage = function () {
        $localStorage.$reset();
    }

    //otro tutorial
    //https://codepen.io/pibby/pen/DLtaK?editors=1010
    //implementando mi codigo ya funcional
    $scope.appTitlesku = "My SKU's List:";
	$scope.savedsku = localStorage.getItem('todossku');
	$scope.todossku = (localStorage.getItem('todossku')!==null) ? JSON.parse($scope.savedsku) : [ ];
	localStorage.setItem('todossku', JSON.stringify($scope.todossku));


    $scope.alert = [];
    $scope.addToCard = function(p) {
        var resultado = document.getElementsByClassName("valuesku");
        for (var i = 0; i < resultado.length; i++) {
            if (resultado[i].value == p.sku) {
                $scope.todossku.push({
                    textsku: resultado[i].value,
                    donesku: false
                });
                localStorage.setItem('todossku', JSON.stringify($scope.todossku));
                /*alert*/
                $scope.alert.push({
                    type:'success',
                    value:'Product added successfully to Import List',
                    counter:3
                });
                var index = $scope.alert.length - 1;
                $scope.removeFirst(index);   
                document.getElementById('disable'+p.sku).disabled = 'disabled';
                //end
            }; 
        };

    };

    //alert mssage
    $scope.removeFirst = function(index){
        var stopped; 
        if($scope.alert[index].counter == 0){
            $scope.alert.splice(0, 1);
        }
        stopped = $timeout(function() {
            $scope.alert[index].counter--;   
            $scope.removeFirst(index);   
        }, 1000);
    };
    //end alert

	$scope.remainingsku = function() {
		var countsku = 0;
		angular.forEach($scope.todossku, function(todosku){
			countsku+= todosku.donesku ? 0 : 1;
		});
		return countsku;
	};
	$scope.archivesku = function() {
		var oldTodossku = $scope.todossku;
		$scope.todossku = [];
		angular.forEach(oldTodossku, function(todosku){
			if (!todosku.donesku)
				$scope.todossku.push(todosku);
		});
		localStorage.setItem('todossku', JSON.stringify($scope.todossku));
	};


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
        $timeout(function(){
            var model = {
                email: $scope.email,
                password: $scope.password,
            };
            var dataof = JSON.stringify(model);
            $http.post(rute+'api/?a=Login',dataof).then(function successCallback(response) {
                var consulta = response.data;
                if(consulta == false){
                    $scope.error = 'Email or password is incorrect';
                    $scope.dataLoading = false;
                }else{
                    console.log(consulta);
                    $scope.dataLoading = false;
                    $location.path('/home:user');
                }
            }, function errorCallback(response) {
                $scope.error = 'Email or password is incorrect';
                $scope.dataLoading = false;
            });
        }, 1000);
    };   
}]);

empleadoControllers.controller('CustomerList', ['$scope','$http','$timeout','$window', function($scope,$http,$timeout,$window){
    $scope.dataLoading = true;

    $http.post(rute+'api/?a=listar').then(function successCallback(response) {
            $scope.model = response.data;
            
    }, function errorCallback(response) {
        $scope.error = 'Error 808';
        $scope.dataLoading = false;
    });

    $scope.retirar = function(id){
        if(confirm('Esta seguro de realizar esta accion?')){
            $scope.dataLoading = true;
            $http.get(rute+'api/?a=eliminar&id='+ id).then(function(response){
                $location.path('/login');   
            }, function errorCallback(response) {
                //$scope.error = 'Registered User';
                $timeout(function(){
                    $window.location.reload();
                }, 800);
            });

        };
    };  
}]);

empleadoControllers.controller('RegisterController', ['$scope','$http','$timeout','$window', function($scope,$http,$timeout,$window){
    $scope.register = function(){
            var model = {
                Nombre: $scope.Nombre,
                Apellido: $scope.Apellido,
                email: $scope.email,
                contra: $scope.contra,
            };
            var dataof = JSON.stringify(model);
            $http.post(rute+'api/?a=valemail',dataof).then(function successCallback(response) {
                var consulta = response.data;
                if(consulta != false){
                    $scope.error = 'This email is already in use';
                }else{
                    $http.post(rute+'api/?a=registrar',dataof).then(function successCallback(response) {   
                        $location.path('/login');
                    }, function errorCallback(response) {
                        //$scope.error = 'Registered User';
                        //location.reload();
                        $timeout(function(){
                            $window.location.reload();
                        }, 800);
                    });
                }
            }, function errorCallback(response) {
                $scope.error = 'Information is incorrect';
            });   
    };

}]);



empleadoControllers.controller('HomeControllerUser', ['$scope','$location','$http',function($scope,$location,$http) {
    console.log("activo");

    $scope.CloseSession = function(){

            $http.post(rute+'api/?a=Logout').then(function successCallback(response) {
                $location.path('/login');
            }, function errorCallback(response) {
                $scope.error = 'No User';
            });   
    };
}]);


empleadoControllers.controller('ListController', ['$scope','$location','$http',function($scope,$location,$http) {
    console.log("list controller");


}]);

