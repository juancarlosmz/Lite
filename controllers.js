var empleadoControllers = angular.module('empleadoControllers', []);
var rute = 'http://localhost:50/Lite/';
'use strict';
empleadoControllers.controller('HomeController', ['$scope','products','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$location', function($scope,products,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$location) {
    

    $scope.saveduser = localStorage.getItem('todosuser');
    $scope.SesionUser = JSON.parse($scope.saveduser);
    //console.log("nuevo nuevo",JSON.stringify($scope.SesionUser));

    for(var i in $scope.SesionUser){
        //console.log($scope.SesionUser[i]['email']);
        $scope.Email = $scope.SesionUser[i]['email'];
        $scope.Rol = $scope.SesionUser[i]['rol'];
    }
    if($scope.Rol == '1' || $scope.Rol == '2'){
        $scope.ulogin = 'ulogintrue';
        $scope.uwelcome = 'uwelcomefalse';
    }else{
        $scope.ulogin = 'uloginfalse';
        $scope.uwelcome = 'uwelcometrue';
    }

    $scope.buscarProducts = function (busquedaprod) {
        var buscados = $filter('filter') ($scope.dataProducts, function (prod) {
            return (prod.sku.toLowerCase().indexOf(busquedaprod.toLowerCase()) !== -1); // matches, contains
        });
        $scope.totalProducts = buscados.length;
        //$scope.hacerPagineoProducts(buscados);
    };


    //pintar toda la info de los productos
    $scope.searchhome = function(){
        $location.path('/Result/category-1/99');
    }

    categories.list(function(categories) {
        $scope.categories = categories;  
    });
    
    //para añadir SKU
    //$scope.prodskus = [];
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
/*
    $scope.removeStorage = function () {
        $localStorage.$reset();
    }
 */ 
    //tutorial
    //https://codepen.io/pibby/pen/DLtaK?editors=1010
    //implementando mi codigo ya funcional
    $scope.appTitlesku = "My SKU's List:";
    $scope.savedsku = localStorage.getItem('todossku');
    $scope.ImportList = JSON.parse($scope.savedsku);

   

    $scope.alert = [];
    $scope.todossku = [];

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


    $scope.addToCard = function(p) {
        var resultado = document.getElementsByClassName("valuesku");
        for (var i = 0; i < resultado.length; i++) {


            if (resultado[i].value == p.sku) {
    
	//$scope.todossku = (localStorage.getItem('todossku')!==null) ? JSON.parse($scope.savedsku) : [ ];
    
    //localStorage.setItem('todossku', JSON.stringify($scope.todossku));
                
/*
for (var j in $scope.todossku) {

    document.getElementById('disable'+$scope.todossku[j]['textsku']).disabled = "disabled";
    if(resultado[i].value == $scope.todossku[j]['textsku']){
        console.log('item en la lista');
        break;
    }else{             
        console.log('agrega');
    }
}  
  */             
                $scope.todossku.push({
                    textsku: resultado[i].value,
                    donesku: false
                });
                resultado[i].value = '';
                localStorage.setItem('todossku', JSON.stringify($scope.todossku));
                /*alert*/
                console.log('add');
                $scope.alert.push({
                    type:'success',
                    value:'Product added successfully to Import List'
                });

                document.getElementById('disable'+p.sku).disabled = "disabled";

                $timeout(function() {
                    var alerta = document.getElementsByClassName('alertskus2');
                    for (var i = 0; i < alerta.length; i++) {
                        alerta[i].style.display = "none";
                    }
                }, 2000);


                
                break; 
                //end
            }



            
        };

    };


	$scope.remainingsku = function() {
		var countsku = 0;
		angular.forEach($scope.ImportList, function(todosku){
			countsku+= todosku.donesku ? 0 : 1;
		});
		return countsku;
	};
	$scope.archivesku = function() {
		var oldTodossku = $scope.ImportList;
		$scope.ImportList = [];
		angular.forEach(oldTodossku, function(ImportList){
			if (!ImportList.donesku)
				$scope.ImportList.push(ImportList);
		});
        localStorage.setItem('todossku', JSON.stringify($scope.ImportList));
        console.log($scope.ImportList);
    };
    
    //carrusel de productos

    $scope.myInterval = 190000;

    $scope.inicializarProducts = function () {
        $scope.dataLoading = true;
        $http.post(rute+"chinabrands/GetBestSellProducts.php").then(function successCallback(response) {
            $scope.dataLoading = true;
            $timeout(function(){
                $scope.dataLoading = false;
                $scope.dataProd = response.data; 
                var miArray2 = [];
                var miArray = [];
                for (var i in $scope.dataProd.msg) {
                    if($scope.dataProd.msg[i]['sku'].substr(7,8) == "01" && $scope.dataProd.msg[i]['status'] == 1){
                        miArray = JSON.parse(JSON.stringify($scope.dataProd.msg[i]));
                        miArray2.push(miArray);
                    }
                }
                $scope.dataProducts2 = miArray2;
                //para hacer multi carrusel
                var first = [],second;
                //carrusel de 4 imagenes
                for (var k = 0; k < $scope.dataProducts2.length/4; k++) {
                    if(k==0){
                        second = {
                            image1: $scope.dataProducts2[k],  
                            image2: $scope.dataProducts2[k+1],
                            image3: $scope.dataProducts2[k+2],
                            image4: $scope.dataProducts2[k+3],
                        }; 
                    }else if(k==1){
                        second = {
                            image1: $scope.dataProducts2[k+3],  
                            image2: $scope.dataProducts2[k+4],
                            image3: $scope.dataProducts2[k+5],
                            image4: $scope.dataProducts2[k+6],
                        }; 
                    }else if(k==2){
                        second = {
                            image1: $scope.dataProducts2[k+6],  
                            image2: $scope.dataProducts2[k+7],
                            image3: $scope.dataProducts2[k+8],
                            image4: $scope.dataProducts2[k+9],
                        }; 
                    }   
                    first.push(second);
                }
                $scope.groupedSlides = first;
                //end
            }, 100);
            




        }, function errorCallback(response) {
            console.log("error 505");    
        });
        //galleria 2
        $scope.dataLoading2 = true;
        $http.post(rute+"chinabrands/GetHighPotential.php").then(function successCallback(response) {
            $scope.dataLoading2 = true;
            $timeout(function(){
                $scope.dataLoading2 = false;
                $scope.dataProd2 = response.data; 

                var miArray22 = [];
                var miArray2 = [];
                for (var i in $scope.dataProd2.msg) {
                    if($scope.dataProd2.msg[i]['sku'].substr(7,8) == "01" && $scope.dataProd2.msg[i]['status'] == 1){
                        miArray2 = JSON.parse(JSON.stringify($scope.dataProd2.msg[i]));
                        miArray22.push(miArray2);
                    }
                }
                $scope.dataProducts22 = miArray22;


                //para hacer multi carrusel
                var first = [],
                second, third;
                var many = 1;

                //carrusel de 3 imagenes
                for (var k = 0; k < $scope.dataProducts22.length/4; k++) {

                    if(k==0){
                        second = {
                            image1: $scope.dataProducts22[k],  
                            image2: $scope.dataProducts22[k+1],
                            image3: $scope.dataProducts22[k+2],
                            image4: $scope.dataProducts22[k+3],
                        }; 
                    }else if(k==1){
                        second = {
                            image1: $scope.dataProducts22[k+3],  
                            image2: $scope.dataProducts22[k+4],
                            image3: $scope.dataProducts22[k+5],
                            image4: $scope.dataProducts22[k+6],
                        }; 
                    }else if(k==2){
                        second = {
                            image1: $scope.dataProducts22[k+6],  
                            image2: $scope.dataProducts22[k+7],
                            image3: $scope.dataProducts22[k+8],
                            image4: $scope.dataProducts22[k+9],
                        }; 
                    }
                    
                    first.push(second);
                }
                $scope.groupedSlides2 = first;
                //end

            }, 100);

        }, function errorCallback(response) {
            console.log("error 505");    
        });


    };
    $scope.inicializarProducts();




}]);



empleadoControllers.controller('SearchController', ['$scope','products','categories','$localStorage','$sessionStorage','$timeout','$filter','$http', function($scope,products,categories,$localStorage,$sessionStorage,$timeout,$filter,$http) {
    //filter products after onload

    $scope.filtroProducts = [];
    $scope.currentPageProducts = 1;
    $scope.numPerPageProducts = 42; //es 40

    $scope.hacerPagineoProducts = function (arreglo) {
        //si no retorna ningun valor
        if (!arreglo || !arreglo.length) { return; }
        var principio = (($scope.currentPageProducts - 1) * $scope.numPerPageProducts); //0, 3
        var fin = principio + $scope.numPerPageProducts; //3, 6
        $scope.filtroProducts = arreglo.slice(principio, fin); // 
    };

    $scope.buscarProducts = function (busquedaprod) {
        var buscados = $filter('filter') ($scope.dataProducts, function (prod) {
            var textobusqueda = prod.title+prod.sku;
            return (textobusqueda.toLowerCase().indexOf(busquedaprod.toLowerCase()) !== -1); // matches, contains
        });
        $scope.totalProducts = buscados.length;
        $scope.hacerPagineoProducts(buscados);

    };

    $scope.searchtxt = function(busquedaprod){
        var buscados = $filter('filter') ($scope.dataProducts, function (prod) {
            var textobusqueda = prod.title+prod.sku;
            return (textobusqueda.toLowerCase().indexOf(busquedaprod.toLowerCase()) !== -1); // matches, contains
        });
        $scope.totalProducts = buscados.length;
        $scope.hacerPagineoProducts(buscados);
    }

    $scope.$watch('currentPageProducts',function(){
          $scope.hacerPagineoProducts($scope.dataProducts);

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
        //$scope.dataProducts = $scope.products.msg;
        //console.log($scope.products.msg);
        //para no contar los que terminan en 01 y status 0
        
        var miArray2 = [];
        var miArray = [];
        for (var i in $scope.products.msg) {
            var skuconhijos = $scope.products.msg[i]['sku'];
            if( skuconhijos.substr(7,8) == "01" && $scope.products.msg[i]['status'] == 1){
                miArray = JSON.parse(JSON.stringify($scope.products.msg[i]));

                /*
                v = {
                    title : p.title
                    
                }
                */
                //console.log(miArray);
                miArray2.push(miArray);
            }
        }
        $scope.dataProducts = miArray2;

        //total de productos
        $scope.totalProducts = $scope.dataProducts.length;
        $scope.hacerPagineoProducts($scope.dataProducts);

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
                    value:'Product added successfully to Import List'
                });
                //ocultar el boton x cada sku añadido
                document.getElementById('disable'+p.sku).disabled = 'disabled';
                //end
                //mostrar y ocultar alerta
                $timeout(function() {
                    var alerta = document.getElementsByClassName('alertskus2');
                    for (var i = 0; i < alerta.length; i++) {
                        alerta[i].style.display = "none";
                    }
                }, 2000);
                break;
            }; 
        };

    };



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



empleadoControllers.controller('Productview', ['$scope','product','stock','$timeout','$routeParams','$http', function($scope,product,stock,$timeout,$routeParams,$http) {
    $scope.saveduser = localStorage.getItem('todosuser');
    $scope.SesionUser = JSON.parse($scope.saveduser);
    //console.log("nuevo nuevo",JSON.stringify($scope.SesionUser));

    for(var i in $scope.SesionUser){
        //console.log($scope.SesionUser[i]['email']);
        $scope.Email = $scope.SesionUser[i]['email'];
        $scope.Rol = $scope.SesionUser[i]['rol'];
    }
    if($scope.Rol == '1' || $scope.Rol == '2'){
        $scope.ulogin = 'ulogintrue';
        $scope.uwelcome = 'uwelcomefalse';
    }else{
        $scope.ulogin = 'uloginfalse';
        $scope.uwelcome = 'uwelcometrue';
    }

    product.list(function(product) {
        $scope.product = product;
        
        for(var i in $scope.product.msg){
            $scope.prodSKU = $scope.product.msg[i]['sku'];
            console.log($scope.product.msg[i]['warehouse_list']);
            //console.log($scope.product.msg[i]['warehouse_list']['MXTJWH']);




            if(($scope.product.msg[i]['warehouse_list']['YB'] || $scope.product.msg[i]['warehouse_list']['ZQ01'] || $scope.product.msg[i]['warehouse_list']['ZQDZ01'] || $scope.product.msg[i]['warehouse_list']['FCYWHQ'] || $scope.product.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.product.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.product.msg[i]['warehouse_list']['FXLAWH'] || $scope.product.msg[i]['warehouse_list']['FXLAWH2'] || $scope.product.msg[i]['warehouse_list']['MXTJWH'] || $scope.product.msg[i]['warehouse_list']['FXJFKGC'] || $scope.product.msg[i]['warehouse_list']['USZYCB']   )   ){
                
                if( $scope.product.msg[i]['warehouse_list']['YB'] ){
                    var country = 'US';
                    $scope.warehouse = $scope.product.msg[i]['warehouse_list']['YB']['warehouse'];
                    $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse+'&country='+country).then(function successCallback(response) {
                        $scope.shippingmodel = response.data;
                        $scope.Place = 'China';
                        $scope.warehousename = 'CN-1 :';
                        $scope.precioenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_fee'];
                        $scope.nameenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_name'];
                        $scope.timeenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_time'];
                        console.log($scope.precioenvio);
                        console.log('la data es',$scope.shippingmodel);
                    }, function errorCallback(response) {
                        $scope.error = 'Information not found';
                        $scope.dataLoading = false;
                    });

                }else if( $scope.product.msg[i]['warehouse_list']['ZQ01']  ){
                    var country = 'US';
                    $scope.warehouse = $scope.product.msg[i]['warehouse_list']['ZQ01']['warehouse'];
                    $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse+'&country='+country  ).then(function successCallback(response) {
                        $scope.shippingmodel = response.data;
                        $scope.Place = 'China';
                        $scope.warehousename = 'CN-5 :';
                        $scope.precioenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_fee'];
                        $scope.nameenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_name'];
                        $scope.timeenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_time'];
                        console.log($scope.precioenvio);
                        console.log('la data es',$scope.shippingmodel);
                    }, function errorCallback(response) {
                        $scope.error = 'Information not found';
                        $scope.dataLoading = false;
                    });

                }else if( $scope.product.msg[i]['warehouse_list']['ZQDZ01']  ){
                    var country = 'US';  
                      
                    $scope.warehouse = $scope.product.msg[i]['warehouse_list']['ZQDZ01']['warehouse'];
                    $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse+'&country='+country  ).then(function successCallback(response) {
                        
                        $scope.shippingmodel = response.data;
                        $scope.Place = 'China';
                        $scope.warehousename = 'CN-7 :';
                        $scope.precioenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_fee'];
                        $scope.nameenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_name'];
                        $scope.timeenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_time'];
                        console.log($scope.precioenvio);
                        console.log('la data es',$scope.shippingmodel);
                    }, function errorCallback(response) {
                        $scope.error = 'Information not found';
                        $scope.dataLoading = false;
                    });

                }else if( $scope.product.msg[i]['warehouse_list']['FCYWHQ'] ){
                    var country = 'US';
                    $scope.warehouse = $scope.product.msg[i]['warehouse_list']['FCYWHQ']['warehouse'];
                    $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse+'&country='+country ).then(function successCallback(response) {
                        $scope.shippingmodel = response.data;
                        $scope.Place = 'China';
                        $scope.warehousename = 'CN-8 :'; 
                        $scope.precioenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_fee'];
                        $scope.nameenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_name'];
                        $scope.timeenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_time'];
                        console.log($scope.precioenvio);
                        console.log('la data es',$scope.shippingmodel);
                    }, function errorCallback(response) {
                        $scope.error = 'Information not found';
                        $scope.dataLoading = false;
                    });

                }else if( $scope.product.msg[i]['warehouse_list']['SZXIAWAN'] ){
                    var country = 'US';
                    $scope.warehouse = $scope.product.msg[i]['warehouse_list']['SZXIAWAN']['warehouse'];
                    $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse+'&country='+country ).then(function successCallback(response) {
                        $scope.shippingmodel = response.data;
                        $scope.Place = 'China';
                        $scope.warehousename = 'CN-9 :'; 
                        $scope.precioenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_fee'];
                        $scope.nameenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_name'];
                        $scope.timeenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_time'];
                        console.log($scope.precioenvio);
                        console.log('la data es',$scope.shippingmodel);
                    }, function errorCallback(response) {
                        $scope.error = 'Information not found';
                        $scope.dataLoading = false;
                    });

                }else if( $scope.product.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                    var country = 'US';
                    $scope.warehouse = $scope.product.msg[i]['warehouse_list']['B2BREXIAOWH']['warehouse'];
                    $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse+'&country='+country ).then(function successCallback(response) {
                        $scope.shippingmodel = response.data;
                        $scope.Place = 'China';
                        $scope.warehousename = 'CN-11 :'; 
                        $scope.precioenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_fee'];
                        $scope.nameenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_name'];
                        $scope.timeenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_time'];
                        console.log($scope.precioenvio);
                        console.log('la data es',$scope.shippingmodel);
                    }, function errorCallback(response) {
                        $scope.error = 'Information not found';
                        $scope.dataLoading = false;
                    });

                }else if( $scope.product.msg[i]['warehouse_list']['FXLAWH'] ){
                    var country = 'CN';
                    $scope.warehouse = $scope.product.msg[i]['warehouse_list']['FXLAWH']['warehouse'];
                    $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse+'&country='+country ).then(function successCallback(response) {
                        $scope.shippingmodel = response.data;
                        $scope.Place = 'UNITED STATES';
                        $scope.warehousename = 'US-1 :'; 
                        $scope.precioenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_fee'];
                        $scope.nameenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_name'];
                        $scope.timeenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_time'];
                        console.log($scope.precioenvio);
                        console.log('la data es',$scope.shippingmodel);
                    }, function errorCallback(response) {
                        $scope.error = 'Information not found';
                        $scope.dataLoading = false;
                    });

                }else if( $scope.product.msg[i]['warehouse_list']['FXLAWH2'] ){
                    var country = 'CN';
                    $scope.warehouse = $scope.product.msg[i]['warehouse_list']['FXLAWH2']['warehouse'];
                    $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse+'&country='+country ).then(function successCallback(response) {
                        $scope.shippingmodel = response.data;
                        $scope.Place = 'UNITED STATES';
                        $scope.warehousename = 'US-2 :'; 
                        $scope.precioenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_fee'];
                        $scope.nameenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_name'];
                        $scope.timeenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_time'];
                        console.log($scope.precioenvio);
                        console.log('la data es',$scope.shippingmodel);
                    }, function errorCallback(response) {
                        $scope.error = 'Information not found';
                        $scope.dataLoading = false;
                    });

                }else if( $scope.product.msg[i]['warehouse_list']['MXTJWH'] ){
                    var country = 'CN';
                    $scope.warehouse = $scope.product.msg[i]['warehouse_list']['MXTJWH']['warehouse'];
                    $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse+'&country='+country ).then(function successCallback(response) {
                        $scope.shippingmodel = response.data;
                        $scope.Place = 'UNITED STATES';
                        $scope.warehousename = 'US-3 :'; 
                        $scope.precioenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_fee'];
                        $scope.nameenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_name'];
                        $scope.timeenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_time'];
                        console.log($scope.precioenvio);
                        console.log('la data es',$scope.shippingmodel);
                    }, function errorCallback(response) {
                        $scope.error = 'Information not found';
                        $scope.dataLoading = false;
                    });

                }else if( $scope.product.msg[i]['warehouse_list']['FXJFKGC'] ){
                    var country = 'CN';
                    $scope.warehouse = $scope.product.msg[i]['warehouse_list']['FXJFKGC']['warehouse'];
                    $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse+'&country='+country  ).then(function successCallback(response) {
                        $scope.shippingmodel = response.data;
                        $scope.Place = 'UNITED STATES';
                        $scope.warehousename = 'US-4 :'; 
                        $scope.precioenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_fee'];
                        $scope.nameenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_name'];
                        $scope.timeenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_time'];
                        console.log($scope.precioenvio);
                        console.log('la data es',$scope.shippingmodel);
                    }, function errorCallback(response) {
                        $scope.error = 'Information not found';
                        $scope.dataLoading = false;
                    });

                }else if( $scope.product.msg[i]['warehouse_list']['USZYCB'] ){
                    var country = 'CN';
                    $scope.warehouse = $scope.product.msg[i]['warehouse_list']['USZYCB']['warehouse'];
                    $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse+'&country='+country ).then(function successCallback(response) {
                        $scope.shippingmodel = response.data;
                        $scope.Place = 'UNITED STATES';
                        $scope.warehousename = 'US-5 :'; 
                        $scope.precioenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_fee'];
                        $scope.nameenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_name'];
                        $scope.timeenvio = $scope.shippingmodel.msg['USEXPLO']['shipping_time'];
                        console.log($scope.precioenvio);
                        console.log('la data es',$scope.shippingmodel);
                    }, function errorCallback(response) {
                        $scope.error = 'Information not found';
                        $scope.dataLoading = false;
                    });

                }

            }

            
            
        }
        $timeout(function(){
            $scope.myFunctioninfo = function(){
    
                var todalainfo = document.getElementById("inputinfo").value;
                document.getElementById("infoprod").innerHTML= todalainfo;
    
            }
            $scope.myFunctioninfo();
        }, 1000);  
        
 
    });

    stock.list(function(stock) {
        $scope.stock = stock;
    });


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
                            value:'Product added successfully to Import List'
                        });
                        //ocultar el boton x cada sku añadido
                        document.getElementById('disable'+p.sku).disabled = 'disabled';
                        //end
                        //mostrar y ocultar alerta
                        $timeout(function() {
                            var alerta = document.getElementsByClassName('alertskus2');
                            for (var i = 0; i < alerta.length; i++) {
                                alerta[i].style.display = "none";
                            }
                        }, 2000);
                        break;
                    }; 
                };
            };

}]);

empleadoControllers.controller('LoginController', ['$scope','$location', 'AuthenticationService','$http','$timeout',function($scope,$location,AuthenticationService,$http,$timeout) {

    $scope.saveduser = localStorage.getItem('todosuser');
    $scope.SesionUser = JSON.parse($scope.saveduser);
    //console.log("nuevo nuevo",JSON.stringify($scope.SesionUser));

    for(var i in $scope.SesionUser){
        //console.log($scope.SesionUser[i]['email']);
        $scope.Email = $scope.SesionUser[i]['email'];
        $scope.Rol = $scope.SesionUser[i]['rol'];
    }
    var iduser = document.getElementById("welcome");
    var idlogin = document.getElementById("login");
    if($scope.Rol == '1'){
        iduser.style.display  = "block";
        idlogin.style.display  = "none";
    }else{
        iduser.style.display  = "none";
        iduser.disabled = true;
    }

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

                    $scope.saveduser = localStorage.getItem('todosuser');
                    $scope.todosuser = (localStorage.getItem('todosuser')!==null) ? JSON.parse($scope.saveduser) : [ ];
                    $scope.todosuser.push(consulta);
                    localStorage.setItem('todosuser', JSON.stringify($scope.todosuser));
                    $scope.dataLoading = false;
                    $location.path('/Home');
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
        $scope.dataLoading = true; 
        $timeout(function(){ 
            $scope.dataLoading = false;   
            $scope.model = response.data;
        }, 100);
            
    }, function errorCallback(response) {
        $scope.error = 'Error 808';
        $scope.dataLoading = false;
    });

    $scope.retirar = function(id){
        if(confirm('Esta seguro de realizar esta accion?')){
            $scope.dataLoading = true;
            $http.get(rute+'api/?a=eliminar&id='+ id).then(function(response){
                $scope.dataLoading = true;
                $timeout(function(){
                    location.reload();
                    $scope.dataLoading = false;
                }, 50);  
            }, function errorCallback(response) {
                $timeout(function(){
                    location.reload();
                    $scope.dataLoading = false;
                }, 50);
                
            });

        };
    };  
}]);

empleadoControllers.controller('RegisterController', ['$scope','$http','$timeout','$window','$location', function($scope,$http,$timeout,$window,$location){
    
    $scope.saveduser = localStorage.getItem('todosuser');
    $scope.SesionUser = JSON.parse($scope.saveduser);
    //console.log("nuevo nuevo",JSON.stringify($scope.SesionUser));

    for(var i in $scope.SesionUser){
        //console.log($scope.SesionUser[i]['email']);
        $scope.Email = $scope.SesionUser[i]['email'];
        $scope.Rol = $scope.SesionUser[i]['rol'];
    }
    console.log($scope.Rol);

    var iduser = document.getElementById("welcome");
    var idlogin = document.getElementById("login");
    if($scope.Rol == '1'){
        iduser.style.display  = "block";
        idlogin.style.display  = "none";
    }else{
        iduser.style.display  = "none";
        iduser.disabled = true;
    }

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
                        $scope.dataLoading = true;
                        $timeout(function(){
                            $location.path('/login');
                            $scope.dataLoading = false;
                        }, 500);

                        
                        
                    }, function errorCallback(response) {
                        $scope.dataLoading = true;
                        $timeout(function(){
                            $location.path('/login');
                            $scope.error = 'Error 505';
                            $scope.dataLoading = false;
                        }, 500);
                        
                    });
                }
            }, function errorCallback(response) {
                $scope.error = 'Information is incorrect';
            });   
    };

}]);


empleadoControllers.controller('RegisterController_a', ['$scope','$http','$timeout','$window','$location', function($scope,$http,$timeout,$window,$location){
    
    $scope.saveduser = localStorage.getItem('todosuser');
    $scope.SesionUser = JSON.parse($scope.saveduser);
    //console.log("nuevo nuevo",JSON.stringify($scope.SesionUser));

    for(var i in $scope.SesionUser){
        //console.log($scope.SesionUser[i]['email']);
        $scope.Email = $scope.SesionUser[i]['email'];
        $scope.Rol = $scope.SesionUser[i]['rol'];
    }
    console.log($scope.Rol);
    var iduser = document.getElementById("contentlist");
    $scope.rutaroluser = '';
    if($scope.Rol == '1'){
        iduser.style.display  = "block";
        console.log('user rol 1');
    }else{
        iduser.style.display  = "none";
        iduser.disabled = true;
        console.log('user rol 2');
    }

    $scope.register = function(){
        $scope.dataLoading = true;
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
                        $scope.dataLoading = true;
                        $timeout(function(){
                            location.reload();
                            $scope.dataLoading = false;
                        }, 50);
                        
                    }, function errorCallback(response) {

                        $timeout(function(){
                            location.reload();
                            $scope.dataLoading = false;
                        }, 50);
                    });
                }
            }, function errorCallback(response) {
                $scope.error = 'Information is incorrect';
            });   
    };

    

}]);


empleadoControllers.controller('HomeControllerUser', ['$scope','$location','$http','$window','$timeout',function($scope,$location,$http,$window,$timeout) {
    console.log("activo");
    $scope.saveduser = localStorage.getItem('todosuser');
    $scope.SesionUser = JSON.parse($scope.saveduser);
    console.log("nuevo nuevo",$scope.SesionUser);
    $scope.CloseSession = function(){

        $scope.dataLoading = true;
        $timeout(function(){
            localStorage.removeItem('todosuser');
            $http.post(rute+'api/?a=Logout').then(function successCallback(response) {
                $scope.dataLoading = true;
                $location.path('/Home');      
            }, function errorCallback(response) {
                $scope.dataLoading = true;
                $scope.error = 'No User';
            });  
        }, 1000);
    };

    
}]);




empleadoControllers.controller('ListController', ['$scope','$window','$http','$timeout','$location',function($scope,$window,$http,$timeout,$location) {
    console.log("list controller");
    /*Usuario*/
    $scope.saveduser = localStorage.getItem('todosuser');
    $scope.SesionUser = JSON.parse($scope.saveduser);
    //console.log("nuevo nuevo",JSON.stringify($scope.SesionUser));

    for(var i in $scope.SesionUser){
        //console.log($scope.SesionUser[i]['email']);
        $scope.Email = $scope.SesionUser[i]['email'];
        $scope.Rol = $scope.SesionUser[i]['rol'];
    }
    /**/        
    $scope.savedsku = localStorage.getItem('todossku');
    $scope.ImportList = JSON.parse($scope.savedsku);
    //console.log($scope.ImportList);
    var ProductsSendphp2 = [];
    var ProductsSendphp = [];
    for (var i in $scope.ImportList) {
        //console.log($scope.ImportList[i].textsku );
        ProductsSendphp2.push($scope.ImportList[i].textsku);
        
    }
    
    $scope.remainingsku = function() {
		var countsku = 0;
		angular.forEach($scope.ImportList, function(todosku){
			countsku+= todosku.donesku ? 0 : 1;
		});
		return countsku;
	};
	$scope.archivesku = function() {
		var oldTodossku = $scope.ImportList;
		$scope.ImportList = [];
		angular.forEach(oldTodossku, function(ImportList){
			if (!ImportList.donesku)
				$scope.ImportList.push(ImportList);
		});
        localStorage.setItem('todossku', JSON.stringify($scope.ImportList));
        console.log($scope.ImportList);
        var ProductsSendphp2new = [];
        var ProductsSendphpnew = [];
        for (var i in $scope.ImportList) {
            ProductsSendphp2new.push($scope.ImportList[i].textsku);
        }
        ProductsSendphpnew = 'myData='+JSON.stringify(ProductsSendphp2new);
        console.log(ProductsSendphp2new);
        $http({
            method : 'POST',
            url : rute+'chinabrands/GetImportList.php',
            data: ProductsSendphpnew,
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
        }).success(function(response){
            $scope.products = response; 
            console.log($scope.products);
    
        }).error(function(error){
            console.log(error);
            
        });
        
        $timeout(function(){
            //$window.location.reload();
        }, 100);
    };
    ProductsSendphp = 'myData='+JSON.stringify(ProductsSendphp2);
    //var 
    //console.log(ProductsSendphp);
    $http({
        method : 'POST',
        url : rute+'chinabrands/GetImportList.php',
        data: ProductsSendphp,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
    }).success(function(response){
        $scope.products = response; 

        $scope.filtroProducts = [];
        $scope.currentPageProducts = 1;
        $scope.numPerPageProducts = 42; //es 40

        $scope.hacerPagineoProducts = function (arreglo) {
            //si no retorna ningun valor
            if (!arreglo || !arreglo.length) { return; }
            var principio = (($scope.currentPageProducts - 1) * $scope.numPerPageProducts); //0, 3
            var fin = principio + $scope.numPerPageProducts; //3, 6
            $scope.filtroProducts = arreglo.slice(principio, fin); // 
        };
            
        

        var miArray2 = [];
        var miArray = [];
        for (var i in $scope.products.msg) {
            var skuconhijos = $scope.products.msg[i]['sku'];
            if( skuconhijos.substr(7,8) == "01" && $scope.products.msg[i]['status'] == 1){
                miArray = JSON.parse(JSON.stringify($scope.products.msg[i]));
                miArray2.push(miArray);
            }
        }
        $scope.dataProducts = miArray2;
        //total de productos
        $scope.totalProducts = $scope.dataProducts.length;
        $scope.hacerPagineoProducts($scope.dataProducts);

        

    }).error(function(error){
        console.log(error);
        
    });
    $scope.saveimportlist = function(){
        console.log('click import list');
        $scope.ImportListData = '"'+ProductsSendphp2+'"';

        var model = {
            email: $scope.Email,
            ImportList : $scope.ImportListData ,
        };

        //console.log(JSON.stringify(model));
        var dataImportList = JSON.stringify(model);
        //console.log(dataImportList);
  
        $http.post(rute+'api/?a=registrarImportList',dataImportList).then(function successCallback(response) {   
            //$location.path('/register_a');
            localStorage.removeItem('todossku');
            $location.path('/home');
            console.log('logrado');
        }, function errorCallback(response) {
            //$location.path('/register_a');
            //$scope.error = 'Error 505';
            localStorage.removeItem('todossku');
            $location.path('/home');
            console.log('no logrado');
        });
    };
}]);


empleadoControllers.controller('UserImportListController', ['$scope','$window','$http','$timeout','$location','$routeParams',function($scope,$window,$http,$timeout,$location,$routeParams) {
    console.log("User import list");
    /*Usuario*/
    $scope.saveduser = localStorage.getItem('todosuser');
    $scope.SesionUser = JSON.parse($scope.saveduser);
    //console.log("nuevo nuevo",JSON.stringify($scope.SesionUser));

    for(var i in $scope.SesionUser){
        //console.log($scope.SesionUser[i]['email']);
        $scope.Email = $scope.SesionUser[i]['email'];
        $scope.Rol = $scope.SesionUser[i]['rol'];
    }
    if($scope.Rol == '1'){
        $http.get(rute+'api/?a=obtenerImportList&email=' + $routeParams.email).then(function successCallback(response) { 
            $scope.UserImportList = response.data;
            //$scope.downloadImpList = $scope.UserImportList.ImportList;

            for (var i in $scope.UserImportList) {
                $scope.downloadImpList = $scope.UserImportList[i]['ImportList'];
            }
            $scope.Downloadimportlist = function(){
            var data = [
                ['ImportList', $scope.downloadImpList]
            ];
                 var csv = '\n';
                 data.forEach(function(row) {
                         csv += row.join(',');
                         csv += "\n";
                 });
                 var hiddenElement = document.createElement('a');
                 hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
                 hiddenElement.target = '_blank';
                 hiddenElement.download = 'UserImportList.csv';
                 hiddenElement.click();
            };
        }, function errorCallback(response) {
            console.log('no logrado');
        }); 
    }else{
        console.log("page not found");
    }

    
}]);





empleadoControllers.controller('treeController', function($scope) {
    
    $scope.saveduser = localStorage.getItem('todosuser');
    $scope.SesionUser = JSON.parse($scope.saveduser);
    //console.log("nuevo nuevo",JSON.stringify($scope.SesionUser));

    for(var i in $scope.SesionUser){
        //console.log($scope.SesionUser[i]['email']);
        $scope.Email = $scope.SesionUser[i]['email'];
        $scope.Rol = $scope.SesionUser[i]['rol'];
    }

    
    if($scope.Rol == '1' ){
        $scope.UserSesion = 'sessionis';
        $scope.ulogin = 'ulogin';
    }else if($scope.Rol == '2'){
        $scope.UserSesion = 'sessionis';
        $scope.UserManage = 'manageis';
        $scope.ulogin = 'ulogin';
    }else{
        $scope.UserSesionOff = 'sessionoff';
        $scope.ulogin = 'uwelcome';
    }
    

    /*
    $scope.tree = [{
      name: "Bob",
      link: "#",
      subtree: [{
        name: "Ann",
        link: "#"
      }]
    }, {
      name: "Jon",
      link: "#",
      subtree: [{
        name: "Mary",
        link: "#"
      }]
    }, {
      name: "divider",
      link: "#"
    }, {
      name: "Another person",
      link: "#"
    }, {
      name: "divider",
      link: "#"
    },{
      name: "Again another person",
      link: "#"
    }];
    */
   

    $scope.tree = [{
        name: "Search Products",
        link: "#/Home",
        icono: "glyphicon glyphicon-search",
        idoc2: "ocultarico"
    }, 

    /*
    {
        name: "Search Products",
        link: "#/Result/category-1/1",
        icono: "glyphicon glyphicon-minus",
        idoc: "ocultarico",
        idoc2: "ocultarico"
    }, 
    */
    
    {
        name: "Products Import List",
        link: "#/Import-List",
        icono: "glyphicon glyphicon-cog",
        idoc2: "ocultarico"
    },{
        name: "Login",
        link: "#/login",
        icono: "glyphicon glyphicon-log-in",
        idoc2: "ocultarico",
        idsession: $scope.UserSesion,
    },{
        name: "Profile",
        link: "#/home:user",
        icono: "glyphicon glyphicon-user",
        idoc2: "ocultarico",
        idsession: $scope.UserSesionOff,
    },{
        name: "Manage",
        link: "#/register_a",
        icono: "glyphicon glyphicon-th-list",
        idoc2: "ocultarico",
        idsession: $scope.UserSesionOff,
        idmanage:$scope.UserManage,
    }];

    




});




empleadoControllers.controller('AllProductsController', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    $scope.saveduser = localStorage.getItem('todosuser');
    $scope.SesionUser = JSON.parse($scope.saveduser);
    //console.log("nuevo nuevo",JSON.stringify($scope.SesionUser));

    for(var i in $scope.SesionUser){
        //console.log($scope.SesionUser[i]['email']);
        $scope.Email = $scope.SesionUser[i]['email'];
        $scope.Rol = $scope.SesionUser[i]['rol'];
    }
    if($scope.Rol == '1' || $scope.Rol == '2'){
        $scope.ulogin = 'ulogintrue';
        $scope.uwelcome = 'uwelcomefalse';
    }else{
        $scope.ulogin = 'uloginfalse';
        $scope.uwelcome = 'uwelcometrue';
    }

    $scope.Downloadstop = function() {
        $timeout(function(){
            location.reload();
        }, 100);
    }

$scope.dataLoading = true;   




//$scope 
//$scope.Sincronizar = function() {
    $scope.filtroProductsOtro = [];
    $scope.currentPageProductsOtro = 1;
    $scope.numPerPageProductsOtro = 40;
    $scope.hacerPagineoProductsOtros = function (arreglo) {
    if (!arreglo || !arreglo.length) { return; }
        var principio = (($scope.currentPageProductsOtro - 1) * $scope.numPerPageProductsOtro); //0, 3
        var fin = principio + $scope.numPerPageProductsOtro; //3, 6
        $scope.filtroProductsOtro = arreglo.slice(principio, fin); // 
    };

    var arrayProtuctstatus1 = [];

$scope.dataLoading = true;        
$timeout(function(){
    $scope.dataLoading = true;
    $http.post(rute+'chinabrands/GetSearchInterface.php?category='+$routeParams.category+'&page='+ 1).then(function successCallback(response) {    


        $scope.AllproductsOff = response.data;
        console.log($scope.AllproductsOff.msg.total_pages);
        var miArray2otro = [];


        for(var i=1 ; i <= $scope.AllproductsOff.msg.total_pages; i++){
                $http.post(rute+'chinabrands/GetSearchInterface.php?category='+$routeParams.category +'&page='+ i).then(function successCallback(response) {
                    $scope.AllproductsOtro = response.data;
                    $scope.ResultadoOtro = $scope.AllproductsOtro.msg['page_result'];
                    //Array of Products, from php
                    //console.log('se debe de enviar', $scope.Resultado);
                    var ProductsSendphpOtro = 'myData='+JSON.stringify($scope.ResultadoOtro);

                    $http({
                        method : 'POST',
                        url : rute+'chinabrands/GetProductCollention.php',
                        data: ProductsSendphpOtro,
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                    }).success(function(response){
                        $scope.dataLoading = true;

                        $scope.productsotro = response;
                        for (var i in $scope.productsotro.msg) {
                            var skuconhijos = $scope.productsotro.msg[i]['sku'];
                            if( skuconhijos.substr(7,8) == "01" && $scope.productsotro.msg[i]['status'] == 1 ){

                                if(($scope.productsotro.msg[i]['warehouse_list']['YB'] || $scope.productsotro.msg[i]['warehouse_list']['ZQ01'] || $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01'] || $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] || $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] || $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] || $scope.productsotro.msg[i]['warehouse_list']['USZYCB']   )   ){
                                    //console.log('otro filtro',$scope.productsotro.msg[i]['warehouse_list'] );
                                    if( $scope.productsotro.msg[i]['warehouse_list']['YB'] ){
                                        $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number'];
                                        if($scope.stockvar > 5){
                                            var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                            miArray2otro.push(miArrayotro);
                                            console.log('del stock YB',$scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number']);
                                        }
                                    }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQ01']  ){
                                        //console.log('del stock ZQ01',$scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number']);
                                        $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                                        if($scope.stockvar > 5){
                                            var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                            miArray2otro.push(miArrayotro);
                                            console.log('del stock YB',$scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number']);
                                        }
                                    }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']  ){
                                        $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                                        if($scope.stockvar > 5){
                                            var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                            miArray2otro.push(miArrayotro);
                                            console.log('del stock ZQDZ01',$scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number']);
                                        }
                                        //console.log('del stock ZQDZ01',$scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number']);
                                    }else if( $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] ){
                                        $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                                        if($scope.stockvar > 5){
                                            var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                            miArray2otro.push(miArrayotro);
                                            console.log('del stock FCYWHQ',$scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number']);
                                        }
                                        //console.log('del stock FCYWHQ',$scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number']);
                                    }else if( $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] ){
                                        $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                                        if($scope.stockvar > 5){
                                            var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                            miArray2otro.push(miArrayotro);
                                            console.log('del stock SZXIAWAN',$scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number']);
                                        }
                                        //console.log('del stock SZXIAWAN',$scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number']);
                                    }else if( $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                                        $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                                        if($scope.stockvar > 5){
                                            var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                            miArray2otro.push(miArrayotro);
                                            console.log('del stock B2BREXIAOWH',$scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number']);
                                        }
                                        //console.log('del stock B2BREXIAOWH',$scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number']);
                                    }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] ){
                                        $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                                        if($scope.stockvar > 5){
                                            var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                            miArray2otro.push(miArrayotro);
                                            console.log('del stock FXLAWH',$scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number']);
                                        }
                                        //console.log('del stock FXLAWH',$scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number']);
                                    }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] ){
                                        $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                                        if($scope.stockvar > 5){
                                            var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                            miArray2otro.push(miArrayotro);
                                            console.log('del stock FXLAWH2',$scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number']);
                                        }
                                        //console.log('del stock FXLAWH2',$scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number']);
                                    }else if( $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] ){
                                        $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                                        if($scope.stockvar > 5){
                                            var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                            miArray2otro.push(miArrayotro);
                                            console.log('del stock MXTJWH',$scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number']);
                                        }
                                        //console.log('del stock MXTJWH',$scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number']);
                                    }else if( $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] ){
                                        $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                                        if($scope.stockvar > 5){
                                            var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                            miArray2otro.push(miArrayotro);
                                            console.log('del stock FXJFKGC',$scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number']);
                                        }
                                        //console.log('del stock FXJFKGC',$scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number']);
                                    }else if( $scope.productsotro.msg[i]['warehouse_list']['USZYCB'] ){
                                        $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                                        if($scope.stockvar > 5){
                                            var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                            miArray2otro.push(miArrayotro);
                                            console.log('del stock USZYCB',$scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number']);
                                        }
                                        //console.log('del stock USZYCB',$scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number']);
                                    }
/*
                                    var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                    miArray2otro.push(miArrayotro);
*/
                                }
                                

                                 
                            }
                        }    

                        console.log( miArray2otro.length);
                        if(miArray2otro.length >= '1'){
                            $scope.dataLoading = false;
                            $scope.dataProductsotro = miArray2otro;
                            console.log($scope.dataProductsotro);


                            

                            $timeout(function(){
                                

                                $scope.buscarProducts = function (busquedaprod) {

                                    console.log('buscar on');
                                    /*
                                    var buscados = $filter('filter') ($scope.dataProductsotro, function (prod) {
                                        var textobusqueda = prod.title+prod.sku;
                                        return (textobusqueda.toLowerCase().indexOf(busquedaprod.toLowerCase()) !== -1); // matches, contains
                                    });
                                    $scope.dataProductsotro = buscados.length;
                                    $scope.hacerPagineoProductsOtros(buscados);
                            */
                                };
                            
                                $scope.searchtxt = function(busquedaprod){
                                    console.log('searchtxt on');
                                    var buscados = $filter('filter') ($scope.dataProductsotro, function (prod) {
                                        var textobusqueda = prod.title+prod.sku;
                                        return (textobusqueda.toLowerCase().indexOf(busquedaprod.toLowerCase()) !== -1); // matches, contains
                                    });
    
    
                                    console.log(buscados);
                                    $scope.hacerPagineoProductsOtros(buscados);

                                    /*
                                    $scope.dataProductsotro = buscados.length;
                                    $scope.hacerPagineoProductsOtros(buscados);
                                    */
                                    
                                }

                                $scope.searchshipchina = function(){
                                    console.log('searchship FOR CHINA');
                                    var buscados = $filter('filter') ($scope.dataProductsotro, function (prod) {
                                        var textobusqueda = prod.warehouse_list.YB+prod.warehouse_list.ZQ01+prod.warehouse_list.ZQDZ01+prod.warehouse_list.FCYWHQ+prod.warehouse_list.SZXIAWAN+prod.warehouse_list.B2BREXIAOWH;
                                        return textobusqueda;
                                    });
                                    console.log(buscados);
/*
                                    console.log(buscados.length);
                                    */
                                    $scope.hacerPagineoProductsOtros(buscados);
                                    
                                }
                                $scope.searchshipus = function(){
                                    console.log('searchship FOR US');
                                    var buscados = $filter('filter') ($scope.dataProductsotro, function (prod) {
                                        var textobusqueda = prod.warehouse_list.FXLAWH+prod.warehouse_list.FXLAWH2+prod.warehouse_list.MXTJWH+prod.warehouse_list.FXJFKGC+prod.warehouse_list.USZYCB;
                                        return textobusqueda;
                                    });
                                    console.log(buscados);
                                    $scope.hacerPagineoProductsOtros(buscados);
                                }
                                $scope.searchallp = function(){
                                    console.log('searchship all');
                                    var buscados = $filter('filter') ($scope.dataProductsotro, function (prod) {
                                        var textobusqueda = prod.warehouse_list.FXLAWH+prod.warehouse_list.FXLAWH2+prod.warehouse_list.MXTJWH+prod.warehouse_list.FXJFKGC+prod.warehouse_list.USZYCB+prod.warehouse_list.YB+prod.warehouse_list.ZQ01+prod.warehouse_list.ZQDZ01+prod.warehouse_list.FCYWHQ+prod.warehouse_list.SZXIAWAN+prod.warehouse_list.B2BREXIAOWH;
                                        return textobusqueda;
                                    });
                                    console.log(buscados);
                                    $scope.hacerPagineoProductsOtros(buscados);
                                }

                                
                                

                                
                                $scope.$watch('currentPageProductsOtro',function(){
                                    $scope.hacerPagineoProductsOtros($scope.dataProductsotro);
                                });
                                $scope.totalProductsOtro = $scope.dataProductsotro.length;
                                $scope.hacerPagineoProductsOtros($scope.dataProductsotro);
                                console.log('los del fliltro',$scope.filtroProductsOtro);
             
                            }, 1000);
                        }
                   
                    }).error(function(error){
                        $scope.dataLoading = true;
                        console.log(error);
                        
                    });
    
                     

                }, function errorCallback(response) {
                    console.log("error 505");    
                });

/*PARA REGISTRO A PHP
            $http.post(rute+'chinabrands/GetSearchInterface.php?category='+ 1 +'&page='+ i).then(function successCallback(response) {
                    $scope.AllproductsOficial = response.data;
                    var model = {
                        ImportList : $scope.AllproductsOficial.msg.page_result,
                    };
                    var dataImportList = JSON.stringify(model);
                    console.log(dataImportList.length);
                    //console.log(dataImportList);
                    $http.post(rute+'api/?a=registrarAllSKUs',dataImportList).then(function successCallback(response) {   
                        $scope.dataSKU = response.data;
                        console.log($scope.dataSKU);
                        console.log('logrado');
                    }, function errorCallback(response) {
                        console.log('no logrado');
                    });
                    //console.log($scope.AllproductsOficial.msg.page_result );
            }, function errorCallback(response) {
                console.log("error 505");    
            });
*/
           // console.log(arrayProtuctstatus1);

        }  

/*ya funciona
        $scope.dataProductsotro = miArray2otro;
        console.log($scope.dataProductsotro);


$timeout(function(){
        $scope.$watch('currentPageProductsOtro',function(){
            $scope.hacerPagineoProductsOtros($scope.dataProductsotro);
        });
        $scope.totalProductsOtro = $scope.dataProductsotro.length;
        $scope.hacerPagineoProductsOtros($scope.dataProductsotro);
        console.log('los del fliltro',$scope.filtroProductsOtro);
}, 40000);

*/



    }, function errorCallback(response) {
        console.log("error 505");    
    });

}, 1000);



//}







































$scope.VerDescriptions = function() {

    $http.post(rute+'api/?a=listarAllSKUs').then(function successCallback(response) {   
        $scope.alldescripcionSKU = response.data;
        //console.log($scope.alldescripcionSKU);
        console.log('se debe de enviar', $scope.alldescripcionSKU.length);

        var allskusendphp2 = [];
        for(var i in $scope.alldescripcionSKU){
            //console.log($scope.alldescripcionSKU[i]['sku']);
            var allskusendphp = JSON.parse(JSON.stringify($scope.alldescripcionSKU[i]['sku']));
            allskusendphp2.push(allskusendphp);
        }


        var ProductsSendphp2 = 'myData='+JSON.stringify(allskusendphp2);
        //
        
        /*
        $http({
            method : 'POST',
            url : rute+'chinabrands/GetProductCollention.php',
            data: ProductsSendphp2,
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
        }).success(function(response){
            $scope.productsdemysql = response; 
            for(var i in $scope.productsdemysql.msg){
                if($scope.productsdemysql.msg[i]['status'] == 1){
                    console.log($scope.productsdemysql.msg[i]['sku']);
                    console.log($scope.productsdemysql.msg[i]['warehouse_list']);
                }  
            }
        }).error(function(error){
            $scope.dataLoading = true;
            console.log(error);  
        });
*/


        console.log('lista skus');
    }, function errorCallback(response) {
        console.log('no logrado');
    });
}



//cambio de pagina y productos
$http.post(rute+'chinabrands/GetSearchInterface.php?category='+ $routeParams.category+'&page='+ $routeParams.page).then(function successCallback(response) {


$scope.dataLoading = true;        
$timeout(function(){
        $scope.dataLoading = true;
        $scope.Allproducts = response.data;
        $scope.Resultado = $scope.Allproducts.msg['page_result'];
        var totalpagination = $scope.Allproducts.msg.total_pages;
        //Array of Products, from php

        //console.log('se debe de enviar', $scope.Resultado);

        var ProductsSendphp = 'myData='+JSON.stringify($scope.Resultado);
        //console.log('se debe de enviar', ProductsSendphp);
    
        $http({
            method : 'POST',
            url : rute+'chinabrands/GetProductCollention.php',
            data: ProductsSendphp,
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

        }).success(function(response){
            $scope.dataLoading = false;
            
            $scope.products = response; 


            
            $scope.filtroProducts = [];
            $scope.currentPageProducts = 1;
            $scope.numPerPageProducts = 42;
            $scope.hacerPagineoProducts = function (arreglo) {
                if (!arreglo || !arreglo.length) { return; }
                var principio = (($scope.currentPageProducts - 1) * $scope.numPerPageProducts); //0, 3
                var fin = principio + $scope.numPerPageProducts; //3, 6
                $scope.filtroProducts = arreglo.slice(principio, fin); // 
            };

            var miArray2 = [];
            for (var i in $scope.products.msg) {
                //console.log($scope.products.msg[i]);
                var skuconhijos = $scope.products.msg[i]['sku'];
                //&& $scope.products.msg[i]['warehouse_list']['YB']['goods_number'] >= 5
                if( skuconhijos.substr(7,8) == "01" && $scope.products.msg[i]['status'] == 1 ){
                    //console.log($scope.products.msg[i]['warehouse_list']['YB']['goods_number']);
                    //console.log($scope.products.msg[i]['warehouse_list']['FXLAWH']['goods_number']);
                    var miArray = JSON.parse(JSON.stringify($scope.products.msg[i]));
                    miArray2.push(miArray);
                    
                }
            }
            $scope.dataProducts = miArray2;
            //total de productos
            $scope.totalProducts = $scope.dataProducts.length;
            $scope.hacerPagineoProducts($scope.dataProducts);


            //para añadir SKU

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
                            value:'Product added successfully to Import List'
                        });
                        //ocultar el boton x cada sku añadido
                        document.getElementById('disable'+p.sku).disabled = 'disabled';
                        //end
                        //mostrar y ocultar alerta
                        $timeout(function() {
                            var alerta = document.getElementsByClassName('alertskus2');
                            for (var i = 0; i < alerta.length; i++) {
                                alerta[i].style.display = "none";
                            }
                        }, 2000);
                        break;
                    }; 
                };
        
            };

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

        }).error(function(error){
            $scope.dataLoading = true;
            console.log(error);
            
        });



        /*
        var pagination = [];
        for (var i = 1; i <= $scope.Allproducts.msg.total_pages; i++) {
            pagination.push(i);
            
        }
        $scope.pagination = pagination;
*/
        

        

        //
        /*Capturando la ruta de categoria*/

        var RutaCompleta = window.location.href;
        var RutaCategory = RutaCompleta.split("/");
        var Category = RutaCategory[6];
        var CategorySend = Category.toString();

        /*iNICIANDO LA PAGINACION */
        /*la subcategoria*/
        var subcategoriasepare = CategorySend.split("-");
        var subcategoria = subcategoriasepare[1];
        /* end subcategoria*/
        console.log(CategorySend);
        console.log(subcategoria);
        //Categorias

        //guardando el nombre de la categoria
        $scope.savedcategoria = localStorage.getItem('todoscategoria');
        $scope.todoscategoria = (localStorage.getItem('todoscategoria')!==null) ? JSON.parse($scope.savedcategoria) : [ ];
        //end
        categories.list(function(categories) {
            $scope.categories = categories;  
            for(var c in $scope.categories.msg){
                if($scope.categories.msg[c]['parent_id'] == subcategoria){
                    //console.log($scope.categories.msg[c]);
                    $scope.parentidsubcategoria = $scope.categories.msg[c]['parent_id'];
                    
                }
                if($scope.categories.msg[c]['cat_id'] == subcategoria && $scope.categories.msg[c]['parent_id'] == 0){

                    $scope.namecategoria = $scope.categories.msg[c]['cat_name'];
/*
                    $scope.todoscategoria.push($scope.namecategoria);
                    localStorage.setItem('todoscategoria', JSON.stringify($scope.todoscategoria));

                    $scope.SesionCategoria = JSON.parse($scope.savedcategoria);
                    $scope.lugaritem = $scope.SesionCategoria.length;
                    console.log($scope.lugaritem-1);
                    console.log($scope.SesionCategoria[$scope.lugaritem]);
                  */
                    localStorage.removeItem('todoscategoria');
                }

                if($scope.categories.msg[c]['cat_id'] == subcategoria && $scope.categories.msg[c]['parent_id'] != 0){
                    $scope.savedcategoria = localStorage.getItem('todoscategoria');
                    $scope.SesionCategoria = JSON.parse($scope.savedcategoria);

                    $scope.namesubcategoria = $scope.categories.msg[c]['cat_name'];
                    console.log($scope.namecategoria);
                }

                
            }
        });
   
            /* code to pagination*/
            window.MTU = {}



            function ChangeUrl(page, url) {
                    if (typeof (history.pushState) != "undefined") {
                        var obj = { Page: page, Url: url };
                        history.pushState(obj, obj.Page, obj.Url);
                    } else {
                        alert("Browser does not support HTML5.");
                    }
                }
                $(function () {
                    $("#button1").click(function () {
                        ChangeUrl('Page1', '/nani');
                    });
                    $("#button2").click(function () {
                        ChangeUrl('Page2', '/nani2');
                    });
                    $("#button3").click(function () {
                        ChangeUrl('Page3', '/nani3');
                    });
                });

            MTU.pagination = {
            init: function(args) {
                this._defaults = {
                    itemsTotal: totalpagination,        // total of the items
                    itemsPerPage: 1,                    // visible items per page
                    visiblePagination: 5,               // number of visible pagination. if ellipsis is true, this will not include the fist and last page
                    currentPage: 1,                     // current active pagination
                    element: '.js-pagination',          // element where the append will happened
                    gotoFirstText: 'First',             // text of the goto first pagination
                    gotoLastText: 'Last',               // text of the goto last pagination
                    gotoNextText: 'Next',               // text of the goto next pagination
                    gotoPrevText: 'Prev',               // text of the goto prev pagination
                    ellipsis: false,                    // ellipsis
                    enableJumpTo: true,                 // enable jump feature
                    jumpToText: 'Go to page'            // text after the jump input
                }

                this._constructor = $.extend(this._defaults, args)

                if (!$(this._constructor.element).length) { return }

                this.displayPagination()
                this.events()
                
                if (this._constructor.enableJumpTo) {
                    this.jump()
                }
            },
            displayPagination: function() {
                var _self = this
                var _constructor = _self._constructor
                // empty the element
                $(_constructor.element).empty()
                // get the total pagination
                this._constructor.paginationsTotal = Math.ceil(_constructor.itemsTotal / _constructor.itemsPerPage)
                // set the expected last page
                _constructor.expectedLastPage = _constructor.currentPage + (_constructor.visiblePagination - 1)

                if (_constructor.currentPage + (_constructor.visiblePagination - 1) > _constructor.paginationsTotal || _constructor.currentPage == _constructor.paginationsTotal) {
                    _constructor.start = _constructor.currentPage - Math.max(0, (_constructor.expectedLastPage - _constructor.paginationsTotal))

                    _constructor.end = (_constructor.start + _constructor.visiblePagination  > _constructor.expectedLastPage) ? _constructor.paginationsTotal : _constructor.start + (_constructor.visiblePagination - 1)

                    if (_constructor.start + _constructor.visiblePagination  > _constructor.expectedLastPage) {
                        _constructor.start = _constructor.end - (_constructor.visiblePagination - 1)
                    }

                } else {
                    _constructor.start = _constructor.currentPage
                    _constructor.end = _constructor.start + _constructor.visiblePagination - 1
                }
                
                // keep the max of pagination to the total number
                if (_constructor.currentPage > _constructor.paginationsTotal) {
                    _constructor.currentPage = _constructor.paginationsTotal
                    _constructor.start = _constructor.ellipsis ? _constructor.start - 1 : _constructor.start;
                }
                
                // keep the min of pagination to the 1
                if (_constructor.currentPage < 1) { _constructor.currentPage = 1 }
                
                
                // if the ellipsis is true
                if (_constructor.ellipsis) {
                    if (_constructor.currentPage == 1 && _constructor.paginationsTotal > _constructor.end) {
                        _constructor.end++
                    }
                    if (_constructor.paginationsTotal == (_constructor.end || _constructor.currentPage)) {
                        _constructor.start--
                    }
                }
                
                // keep the min of pagination to the 1
                if (_constructor.start < 1) { _constructor.start = 1 }

                for(var pagination = _constructor.start; pagination <= _constructor.end; pagination++) {
                    // if ellipsis is true
                    // means we dont need to display the first and last page
                    if (_constructor.ellipsis) {
                        if (pagination == 1 || pagination == _constructor.paginationsTotal) {
                        continue;
                        }
                    }
                    
                    if (pagination == _constructor.currentPage) {
                        $(_constructor.element).append(_self.template({
                        pageNumber: pagination,
                        classNames: 'is-active'
                        }))
                    } else {
                        $(_constructor.element).append(_self.template({
                        pageNumber: pagination
                        }))
                    }
                }

                this.displayPaginationControls()
            },
            displayPaginationControls: function() {
                var _constructor = this._constructor
                if (_constructor.ellipsis) {
                    // insert the ellipsis
                    $(this._constructor.element).prepend(this.template({
                        text: "...",
                        pageNumber: null,
                        classNames: _constructor.start < 3 ? "is-hidden" : "has-ellipsis"
                    }))
                    // insert the first
                    $(this._constructor.element).prepend(this.template({
                        text: 1,
                        pageNumber: 1,
                    }))
                    
                    var PrevPageSendString = '';
                    var PrevPageRute = window.location.href;
                    var PrevPageRuteSeparet = PrevPageRute.split("/");
                    var PrevPage = PrevPageRuteSeparet[7];
                    var PrevPageSendString = PrevPage.toString();
                    var PrevPageSend = parseInt(PrevPageSendString);
                    $(_constructor.element).prepend(this.template({
                        text: _constructor.gotoPrevText,
                        pageNumber: PrevPageSend-1,
                        classNames: _constructor.currentPage == 1 ? 'is-disabled' : null
                    }))
                    // insert the ellipsis
                    //son  los segundos puntos suspens
                    $(this._constructor.element).append(this.template({
                        text: "...",
                        pageNumber: null,
                        classNames: _constructor.end >= _constructor.paginationsTotal - 1 ? "is-hidden" : "has-ellipsis"
                    }))
                    if (this._constructor.paginationsTotal > 1) {
                        // insert the last
                        $(this._constructor.element).append(this.template({
                        text: _constructor.paginationsTotal,
                        pageNumber: _constructor.paginationsTotal,
                        classNames: _constructor.currentPage == _constructor.paginationsTotal ? "is-active" : null
                        }))
                    }
                    // insert the next
                    var NextPageRute = window.location.href;
                    var NextPageRuteSeparet = NextPageRute.split("/");
                    var NextPage = NextPageRuteSeparet[7];
                    var NextPageSendString = NextPage.toString();
                    var NextPageSend = parseInt(NextPageSendString);
                    
                    $(this._constructor.element).append(this.template({
                        text: this._constructor.gotoNextText,
                        pageNumber: NextPageSend+1,
                        classNames: _constructor.currentPage >= _constructor.paginationsTotal ? 'is-disabled' : null
                    }))
                } else {
                    // insert the prev  
                    $(_constructor.element).prepend(this.template({
                        text: _constructor.gotoPrevText,
                        pageNumber: 'prev',
                        classNames: _constructor.currentPage == 1 ? 'is-disabled' : null
                    }))
                    // insert the first
                    $(this._constructor.element).prepend(this.template({
                        text: this._constructor.gotoFirstText,
                        pageNumber: 'first',
                        classNames: _constructor.currentPage == 1 ? 'is-disabled' : null
                    }))
                    // insert the next
                    $(this._constructor.element).append(this.template({
                        text: this._constructor.gotoNextText,
                        pageNumber: 'next',
                        classNames: _constructor.currentPage >= _constructor.paginationsTotal ? 'is-disabled' : null
                    }))
                    // insert the last
                    $(this._constructor.element).append(this.template({
                        text: this._constructor.gotoLastText,
                        pageNumber: 'last',
                        classNames: _constructor.currentPage >= _constructor.paginationsTotal ? 'is-disabled' : null
                    }))
                }
                
                if (_constructor.enableJumpTo && (_constructor.paginationsTotal > _constructor.visiblePagination + 2)) {
                    let template = `<form style="color: #555;">${_constructor.jumpToText}<input type="number" min="1" /><button type="submit"></button></form>`
                
                    $(this._constructor.element).append(template)
                }
            },
            paginate: function(pagination) {
                var _constructor = this._constructor
                var $parent = $(this._constructor.element)
                var controls = {
                    "prev" : $parent.find('[data-pagination="prev"]'),
                    "next" : $parent.find('[data-pagination="next"]'),
                }
                switch (pagination) {
                    case 'prev':
                        if (_constructor.currentPage > 1) {
                        _constructor.currentPage--
                        }
                        break
                    case 'next':
                        if (_constructor.currentPage < Math.ceil(_constructor.itemsTotal / _constructor.itemsPerPage)) {
                        _constructor.currentPage++
                        }
                        break
                    default:
                        if(typeof pagination != 'number') {
                        pagination = parseInt(pagination)
                        pagination = pagination < 1 ? 1 : pagination
                        }
                        _constructor.currentPage = pagination
                } 

                if (_constructor.currentPage == _constructor.paginationsTotal) {
                    controls.next.addClass('is-disabled');
                    controls.prev.removeClass('is-disabled');
                } else if (_constructor.currentPage == 1) {
                    controls.next.removeClass('is-disabled');
                    controls.prev.addClass('is-disabled');
                } else {
                    controls.next.removeClass('is-disabled');
                    controls.prev.removeClass('is-disabled');
                }

                // render again if the page is not visible
                if (_constructor.currentPage < _constructor.start || _constructor.currentPage > _constructor.end) {
                    $(_constructor.element).empty()
                    this.displayPagination()
                }

            },
            template: function(args) {
                // args.pageNumber is required
                if (args.classNames) {
                    //return '<li class="' + args.classNames + '" data-pagination="' + args.pageNumber + '"><a href="#/Result/'+args.pageNumber + ' "  >' + (args.text == null ? args.pageNumber : args.text) + '</a></li>'
                    return '<li class="' + args.classNames + '" data-pagination="' + args.pageNumber + '"><a href="#/Result/'+CategorySend+'/'+ args.pageNumber + '  "  >' + (args.text == null ? args.pageNumber : args.text) + '</a></li>'
                } else {
                    //return '<li data-pagination="' + args.pageNumber + '"><a  href="#/Result/'+ args.pageNumber + ' "  >' + (args.text == null ? args.pageNumber : args.text) + '</a></li>'
                    return '<li data-pagination="' + args.pageNumber + '"><a  href="#/Result/'+CategorySend+'/' + args.pageNumber + ' "  >' + (args.text == null ? args.pageNumber : args.text) + '</a></li>'
                }
            },
            events: function() {
                var _self = this
                var _constructor = _self._constructor

                $(_constructor.element).on('click', 'li:not(.is-disabled)', function(){
                    var pagination = $(this).data('pagination')
                    
                    if (pagination != null) {
                        _self.paginate(pagination)
                    }
                })
            },

            jump: function() {
                const self = this;
                const _constructor = self._constructor;

                $(_constructor.element).on('submit', 'form', function(e){
                    let value = $(_constructor.element).find('input').val().trim()
                    e.preventDefault()

                    if (value > _constructor.paginationsTotal) {
                        value = _constructor.paginationsTotal
                    }

                    if (value != null && value != "" && value != undefined) {
                        self.paginate(value)
                    }
                    
                    $(_constructor.element).find('input').val(value).focus()
                })
            }
            }

            var yPagination = Object.create(MTU.pagination);

            yPagination.init({
            gotoFirstText: '<img src="https://prep-community.musictribe.com/html/assets/pagination_arrow-first.png" />',
            /*
            gotoPrevText: '<i class="glyphicon glyphicon-menu-left"></i>Prev',
            gotoNextText: 'Next <i style="float:right;" class="glyphicon glyphicon-menu-right"></i>',
            */
            gotoPrevText: '< Prev',
            gotoNextText: 'Next >',

            gotoLastText: '<img src="https://prep-community.musictribe.com/html/assets/pagination_arrow-last.png" />',
            ellipsis: true,
            element: '#pagination2'
            });
            /*end pagination*/
    
//end time to delay
}, 1000);          




    }, function errorCallback(response) {
        console.log("error 505");    
    });


    






    



}]);
