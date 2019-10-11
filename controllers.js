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
        //console.log($scope.categories);
    });
    console.log('Este controlador se repite en todos los controllers');
    
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

    $scope.filterCategory = function(cat){
        $location.path('/Results/allProducts/'+cat); 
         
    }; 
    //$scope.myValue = 'nonsense'; 

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

    $scope.myInterval = 10000;

    $scope.inicializarProducts = function () {
        $scope.dataLoading = true;

        //haciendo administrable los carruseles
        $http.post(rute+"chinabrands/GetDownloadList.php").then(function successCallback(response) {
            $scope.dataBestSell = response.data;
            //console.log($scope.dataBestSell.msg.page_result); 
            var sendDownloadList = [];
            for (var i in $scope.dataBestSell.msg.page_result) {
                sendDownloadList.push($scope.dataBestSell.msg.page_result[i]['goods_sn']);
            }
            var sendDownloadList2 = 'myDataBestSell='+JSON.stringify(sendDownloadList);
            $http({
                method : 'POST',
                url : rute+'chinabrands/GetBestSellProductsList.php',
                data: sendDownloadList2,
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
            }).success(function(response){
                $scope.BestSellRespuesta = response;
                var miArrayBestSellRespuesta2 = [];
                var miArrayBestSellRespuesta = [];
                for (var i in $scope.BestSellRespuesta.msg) {
                    if($scope.BestSellRespuesta.msg[i]['sku'].substr(7,8) == "01" && $scope.BestSellRespuesta.msg[i]['status'] == 1){
                        miArrayBestSellRespuesta = JSON.parse(JSON.stringify($scope.BestSellRespuesta.msg[i]));
                        miArrayBestSellRespuesta2.push(miArrayBestSellRespuesta);
                    }
                }
                $scope.BestSellRespuesta2 = miArrayBestSellRespuesta2;
                //para hacer multi carrusel
                var first = [],second;
                //carrusel de 4 imagenes
                for (var k = 0; k < $scope.BestSellRespuesta2.length/4; k++) {
                    if(k==0){
                        second = {
                            image1: $scope.BestSellRespuesta2[k],  
                            image2: $scope.BestSellRespuesta2[k+1],
                            image3: $scope.BestSellRespuesta2[k+2],
                            image4: $scope.BestSellRespuesta2[k+3],
                        }; 
                    }else if(k==1){
                        second = {
                            image1: $scope.BestSellRespuesta2[k+3],  
                            image2: $scope.BestSellRespuesta2[k+4],
                            image3: $scope.BestSellRespuesta2[k+5],
                            image4: $scope.BestSellRespuesta2[k+6],
                        }; 
                    }else if(k==2){
                        second = {
                            image1: $scope.BestSellRespuesta2[k+6],  
                            image2: $scope.BestSellRespuesta2[k+7],
                            image3: $scope.BestSellRespuesta2[k+8],
                            image4: $scope.BestSellRespuesta2[k+9],
                        }; 
                    }   
                    first.push(second);
                }
                $scope.groupedSlides3 = first;

            }).error(function(error){
                $scope.dataLoading = true;
                console.log(error); 
            });    

            console.log(sendDownloadList2);  
        }, function errorCallback(response) {
            console.log("error 505");    
        });
        
        
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
                console.log('Gallery best sell',$scope.dataProducts2 );
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

            
            var RutaCompletaSku = window.location.hash;

            var RutaSKU = RutaCompletaSku.split("/");
            var SKU = RutaSKU[2];


            //console.log('Los skus son',$scope.product.msg[i]['sku']);

            //color imagenes mouse over
            var idiconocolor;
            $scope.nameofcolorhover = function(p){

                var elcolor = document.getElementById('block'+p.color);
                elcolor.style.display = 'block';
                console.log(p.color);

                console.log(elcolor);
            }
            $scope.nameofcolorout = function(p){
                var elcolor = document.getElementById('block'+p.color);
                elcolor.style.display = 'none';
                console.log(p.color);

                console.log(elcolor);
            }
            
           
            if($scope.product.msg[i]['status'] == 1 && $scope.product.msg[i]['sku'] == SKU){
                $scope.prodSKU = $scope.product.msg[i]['sku'];

                console.log("El producto",$scope.product.msg[i]);
                $scope.Tituloproducto = $scope.product.msg[i]['title'];
                $scope.TheDescription = $scope.product.msg[i]['goods_desc'];
                document.getElementById("infoprod2").innerHTML= $scope.TheDescription;
                
                
                if( $scope.product.msg[i]['warehouse_list']['YB'] ){
                    //if($scope.product.msg[i]['warehouse_list']['YB']['goods_number'] > 5){
                        console.log('CN-1');
                        var country = 'US';
                        $scope.shipcn1 = false;
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['YB']['warehouse'];
                        $scope.warehouse = $scope.product.msg[i]['warehouse_list']['YB']['warehouse'];
                        $scope.priceonecn = $scope.product.msg[i]['warehouse_list']['YB']['price'];
                        $scope.stockone0 = $scope.product.msg[i]['warehouse_list']['YB']['goods_number'];
                        console.log($scope.stockone0);
                        
                        $scope.dataLoading = true;
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse+'&country='+country).then(function successCallback(response) {
                                console.log('Shipping cost CN-1');
                                $scope.shipcn1 = true;
                                $scope.dataLoading = false;
                                $scope.shippingmodel = response.data;
                                $scope.Placecn1 = 'China';
                                $scope.warehousename = 'CN-1 :';
                                $scope.stock0 = 'Stock :';
                                $scope.precioenviocn1 = $scope.shippingmodel.msg['USEXPLO']['shipping_fee'];
                                $scope.nameenviocn1 = $scope.shippingmodel.msg['USEXPLO']['shipping_name'];
                                $scope.timeenviocn1 = $scope.shippingmodel.msg['USEXPLO']['shipping_time'];
                                console.log($scope.precioenviocn1);
                                console.log('warehouse YB',$scope.shippingmodel);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400);    
                    //}
                    
                }
                if( $scope.product.msg[i]['warehouse_list']['ZQ01']  ){
                    //if($scope.product.msg[i]['warehouse_list']['ZQ01']['goods_number'] > 5){
                        console.log('CN-5');
                        var country = 'US';
                        $scope.shipcn5 = false;
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['ZQ01']['warehouse'];
                        $scope.warehouse1 = $scope.product.msg[i]['warehouse_list']['ZQ01']['warehouse'];
                        $scope.priceonecn = $scope.product.msg[i]['warehouse_list']['ZQ01']['price'];
                        $scope.stockone1 = $scope.product.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                        $scope.dataLoading = true;
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse1+'&country='+country  ).then(function successCallback(response) {
                                $scope.dataLoading = false;
                                $scope.shipcn5 = true;
                                $scope.shippingmodel1 = response.data;
                                $scope.Placecn5 = 'China';
                                $scope.warehousename1 = 'CN-5 :';
                                $scope.stock1 = 'Stock :';
                                $scope.precioenviocn5 = $scope.shippingmodel1.msg['USEXPLO']['shipping_fee'];
                                $scope.nameenviocn5 = $scope.shippingmodel1.msg['USEXPLO']['shipping_name'];
                                $scope.timeenviocn5 = $scope.shippingmodel1.msg['USEXPLO']['shipping_time'];
                                console.log($scope.precioenviocn5);
                                console.log('warehouse ZQ01',$scope.shippingmodel1);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400);    
                    //}
                }
                if( $scope.product.msg[i]['warehouse_list']['ZQDZ01']  ){
                    //if($scope.product.msg[i]['warehouse_list']['ZQDZ01']['goods_number'] > 5){
                        console.log('CN-7');
                        var country = 'US';  
                        $scope.shipcn7 = false;
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['ZQDZ01']['warehouse'];
                        $scope.warehouse2 = $scope.product.msg[i]['warehouse_list']['ZQDZ01']['warehouse'];
                        $scope.priceonecn = $scope.product.msg[i]['warehouse_list']['ZQDZ01']['price'];
                        $scope.stockone2 = $scope.product.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                        $scope.dataLoading = true;
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse2+'&country='+country  ).then(function successCallback(response) {
                                $scope.dataLoading = false;
                                $scope.shipcn7 = true;
                                $scope.shippingmodel2 = response.data;
                                $scope.Placecn7 = 'China';
                                $scope.warehousename2 = 'CN-7 :';
                                $scope.stock2 = 'Stock :';
                                $scope.precioenviocn7 = $scope.shippingmodel2.msg['USEXPLO']['shipping_fee'];
                                $scope.nameenviocn7 = $scope.shippingmodel2.msg['USEXPLO']['shipping_name'];
                                $scope.timeenviocn7 = $scope.shippingmodel2.msg['USEXPLO']['shipping_time'];
                                console.log($scope.precioenviocn7);
                                console.log('warehouse ZQDZ01',$scope.shippingmodel2);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400);   
                    //}
                }
                if( $scope.product.msg[i]['warehouse_list']['FCYWHQ'] ){
                    //if($scope.product.msg[i]['warehouse_list']['FCYWHQ']['goods_number'] > 5){
                        console.log('CN-8');
                        var country = 'US';
                        $scope.shipcn8 = false;
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['FCYWHQ']['warehouse'];
                        $scope.warehouse3 = $scope.product.msg[i]['warehouse_list']['FCYWHQ']['warehouse'];
                        $scope.priceonecn = $scope.product.msg[i]['warehouse_list']['FCYWHQ']['price'];
                        $scope.stockone3 = $scope.product.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                        $scope.dataLoading = true;
                        console.log($scope.warehouse3);
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse3+'&country='+country ).then(function successCallback(response) {
                                $scope.dataLoading = false;
                                $scope.shipcn8 = true;
                                $scope.shippingmodel3 = response.data;
                                $scope.Placecn8 = 'China';
                                $scope.warehousename3 = 'CN-8 :'; 
                                $scope.stock3 = 'Stock :';
                                $scope.precioenviocn8 = $scope.shippingmodel3.msg['USEXPLO']['shipping_fee'];
                                $scope.nameenviocn8 = $scope.shippingmodel3.msg['USEXPLO']['shipping_name'];
                                $scope.timeenviocn8 = $scope.shippingmodel3.msg['USEXPLO']['shipping_time'];
                                console.log($scope.warehousename3);
                                console.log($scope.precioenviocn8);
                                console.log('warehouse FCYWHQ',$scope.shippingmodel3);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400);
                    //}    
                }
                if( $scope.product.msg[i]['warehouse_list']['SZXIAWAN'] ){
                    //if($scope.product.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'] > 5){
                        console.log('CN-9');
                        var country = 'US';
                        $scope.shipcn9 = false;
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['SZXIAWAN']['warehouse'];
                        $scope.warehouse4 = $scope.product.msg[i]['warehouse_list']['SZXIAWAN']['warehouse'];
                        $scope.priceonecn = $scope.product.msg[i]['warehouse_list']['SZXIAWAN']['price'];
                        $scope.stockone4 = $scope.product.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                        $scope.dataLoading = true;
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse4+'&country='+country ).then(function successCallback(response) {
                                $scope.dataLoading = false;
                                $scope.shipcn9 = true;
                                $scope.shippingmodel4 = response.data;
                                $scope.Placecn9 = 'China';
                                $scope.warehousename4 = 'CN-9 :'; 
                                $scope.stock4 = 'Stock :';
                                $scope.precioenviocn9 = $scope.shippingmodel4.msg['USEXPLO']['shipping_fee'];
                                $scope.nameenviocn9 = $scope.shippingmodel4.msg['USEXPLO']['shipping_name'];
                                $scope.timeenviocn9 = $scope.shippingmodel4.msg['USEXPLO']['shipping_time'];
                                console.log($scope.precioenviocn9);
                                console.log('warehouse SZXIAWAN',$scope.shippingmodel4);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400);   
                    //}
                }
                if( $scope.product.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                    //if($scope.product.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'] > 5){
                        console.log('CN-11');
                        var country = 'US';
                        $scope.shipcn11 = false;
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['B2BREXIAOWH']['warehouse'];
                        $scope.warehouse5 = $scope.product.msg[i]['warehouse_list']['B2BREXIAOWH']['warehouse'];
                        $scope.priceonecn = $scope.product.msg[i]['warehouse_list']['B2BREXIAOWH']['price'];
                        $scope.stockone5 = $scope.product.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                        $scope.dataLoading = true;
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse5+'&country='+country ).then(function successCallback(response) {
                                $scope.dataLoading = false;
                                $scope.shipcn11 = true;
                                $scope.shippingmodel5 = response.data;
                                $scope.Placecn11 = 'China';
                                $scope.warehousename5 = 'CN-11 :'; 
                                $scope.stock5 = 'Stock :';
                                $scope.precioenviocn11 = $scope.shippingmodel5.msg['USEXPLO']['shipping_fee'];
                                $scope.nameenviocn11 = $scope.shippingmodel5.msg['USEXPLO']['shipping_name'];
                                $scope.timeenviocn11 = $scope.shippingmodel5.msg['USEXPLO']['shipping_time'];
                                console.log($scope.precioenviocn11);
                                console.log('warehouse B2BREXIAOWH',$scope.shippingmodel5);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400); 
                    //}   
                }
                if( $scope.product.msg[i]['warehouse_list']['FXLAWH'] ){
                    //if($scope.product.msg[i]['warehouse_list']['FXLAWH']['goods_number'] > 5){
                        console.log('US-1 ');
                        var country = 'US';
                        $scope.shipus1 = false;
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['FXLAWH']['warehouse'];
                        $scope.warehouse6 = $scope.product.msg[i]['warehouse_list']['FXLAWH']['warehouse'];
                        $scope.priceoneus = $scope.product.msg[i]['warehouse_list']['FXLAWH']['price'];
                        $scope.stockone6 = $scope.product.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                        $scope.dataLoading = true;
                        console.log($scope.stockone6);
                        console.log($scope.product.msg[i]['original_img'][0]);
                        $scope.prodImg = $scope.product.msg[i]['original_img'][0];
                        $scope.prodColor = $scope.product.msg[i]['color'];
                        console.log($scope.stockone6);
                        $scope.zipcode1 = '90001';
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCostUS.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse6+'&country='+country+'&zipcode='+$scope.zipcode1 ).then(function successCallback(response) {
                                console.log('Shipping cost US-1 ');
                                $scope.dataLoading = false;
                                $scope.shipus1 = true;
                                $scope.shippingmodel6 = response.data;
                                $scope.Placeus1 = 'UNITED STATES';
                                $scope.warehousename6 = 'US-1 :';
                                $scope.stock6 = 'Stock :'; 
                                $scope.precioenvious1 = $scope.shippingmodel6.msg['USPSEXPWHW']['shipping_fee'];
                                $scope.nameenvious1 = $scope.shippingmodel6.msg['USPSEXPWHW']['shipping_name'];
                                $scope.timeenvious1 = $scope.shippingmodel6.msg['USPSEXPWHW']['shipping_time'];
                                console.log($scope.precioenvious1);
                                console.log('warehouse FXLAWH',$scope.shippingmodel6);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400);
                    //}
                        
                }
                if( $scope.product.msg[i]['warehouse_list']['FXLAWH2'] ){
                    //if($scope.product.msg[i]['warehouse_list']['FXLAWH2']['goods_number'] > 5){
                        console.log('US-2');
                        var country = 'US';
                        $scope.shipus2 = false;
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['FXLAWH2']['warehouse'];
                        $scope.warehouse7 = $scope.product.msg[i]['warehouse_list']['FXLAWH2']['warehouse'];
                        $scope.priceoneus = $scope.product.msg[i]['warehouse_list']['FXLAWH2']['price'];
                        $scope.stockone7 = $scope.product.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                        $scope.dataLoading = true;
                        $scope.zipcode2 = '90001';
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCostUS.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse7+'&country='+country+'&zipcode='+$scope.zipcode2  ).then(function successCallback(response) {
                                $scope.dataLoading = false;
                                $scope.shipus2 = true;
                                $scope.shippingmodel7 = response.data;
                                $scope.Placeus2 = 'UNITED STATES';
                                $scope.warehousename7 = 'US-2 :'; 
                                $scope.stock7 = 'Stock :';
                                $scope.precioenvious2 = $scope.shippingmodel7.msg['USPSEXPWHW']['shipping_fee'];
                                $scope.nameenvious2 = $scope.shippingmodel7.msg['USPSEXPWHW']['shipping_name'];
                                $scope.timeenvious2 = $scope.shippingmodel7.msg['USPSEXPWHW']['shipping_time'];
                                console.log($scope.precioenvious2);
                                console.log('warehouse FXLAWH2',$scope.shippingmodel7);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400);  
                    //}  
                }
                if( $scope.product.msg[i]['warehouse_list']['MXTJWH'] ){
                    //if($scope.product.msg[i]['warehouse_list']['MXTJWH']['goods_number'] > 5){
                        console.log('US-3');
                        var country = 'US';
                        $scope.shipus3 = false;
                        $scope.envwarehouse = 'MXTJWH'
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['MXTJWH']['warehouse'];
                        $scope.warehouse8 = $scope.product.msg[i]['warehouse_list']['MXTJWH']['warehouse'];
                        $scope.priceoneus = $scope.product.msg[i]['warehouse_list']['MXTJWH']['price'];

                        $scope.stockone8 = $scope.product.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                        $scope.dataLoading = true;
                        $scope.zipcode3 = '90001';
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCostUS.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse8+'&country='+country+'&zipcode='+$scope.zipcode3  ).then(function successCallback(response) {
                                $scope.dataLoading = false;
                                $scope.shipus3 = true;
                                $scope.shippingmodel8 = response.data;
                                $scope.Placeus3 = 'UNITED STATES';
                                $scope.warehousename8 = 'US-3 :'; 
                                $scope.stock8 = 'Stock :';
                                $scope.precioenvious3 = $scope.shippingmodel8.msg['USPSEXPWHW']['shipping_fee'];
                                $scope.nameenvious3 = $scope.shippingmodel8.msg['USPSEXPWHW']['shipping_name'];
                                $scope.timeenvious3 = $scope.shippingmodel8.msg['USPSEXPWHW']['shipping_time'];
                                console.log($scope.precioenvious3);
                                console.log('warehouse MXTJWH',$scope.shippingmodel8);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400);
                    //}
                }
                if( $scope.product.msg[i]['warehouse_list']['FXJFKGC'] ){
                    //if($scope.product.msg[i]['warehouse_list']['FXJFKGC']['goods_number'] > 5){
                        console.log('US-4');
                        var country = 'US';
                        $scope.shipus4 = false;
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['FXJFKGC']['warehouse'];
                        $scope.warehouse9 = $scope.product.msg[i]['warehouse_list']['FXJFKGC']['warehouse'];
                        $scope.priceoneus = $scope.product.msg[i]['warehouse_list']['FXJFKGC']['price'];
                        $scope.stockone9 = $scope.product.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                        $scope.dataLoading = true;
                        $scope.zipcode4 = '10001';
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCostUS.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse9+'&country='+country+'&zipcode='+$scope.zipcode4   ).then(function successCallback(response) {
                                $scope.dataLoading = false;
                                $scope.shipus4 = true;
                                $scope.shippingmodel9 = response.data;
                                $scope.Placeus4 = 'UNITED STATES';
                                $scope.warehousename9 = 'US-4 :'; 
                                $scope.stock9 = 'Stock :';
                                $scope.precioenvious4 = $scope.shippingmodel9.msg['USPSEXPWHW']['shipping_fee'];
                                $scope.nameenvious4 = $scope.shippingmodel9.msg['USPSEXPWHW']['shipping_name'];
                                $scope.timeenvious4 = $scope.shippingmodel9.msg['USPSEXPWHW']['shipping_time'];
                                console.log($scope.precioenvious4);
                                console.log('warehouse FXJFKGC',$scope.shippingmodel9);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400);   
                    //} 
                }
                if( $scope.product.msg[i]['warehouse_list']['USZYCB'] ){
                    //if($scope.product.msg[i]['warehouse_list']['USZYCB']['goods_number'] > 5){
                        console.log('US-5');
                        var country = 'US';
                        $scope.shipus5 = false;
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['USZYCB']['warehouse'];
                        $scope.warehouse10 = $scope.product.msg[i]['warehouse_list']['USZYCB']['warehouse'];
                        $scope.priceoneus = $scope.product.msg[i]['warehouse_list']['USZYCB']['price'];
                        $scope.stockone10 = $scope.product.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                        $scope.dataLoading = true;
                        $scope.zipcode5 = '07039';
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCostUS.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse10+'&country='+country+'&zipcode='+$scope.zipcode5  ).then(function successCallback(response) {
                                $scope.dataLoading = false;
                                $scope.shipus5 = true;
                                $scope.shippingmodel10 = response.data;
                                $scope.Placeus5 = 'UNITED STATES';
                                $scope.warehousename10 = 'US-5 :'; 
                                $scope.stock10 = 'Stock :';
                                $scope.precioenvious5 = $scope.shippingmodel10.msg['USPSEXPWHW']['shipping_fee'];
                                $scope.nameenvious5 = $scope.shippingmodel10.msg['USPSEXPWHW']['shipping_name'];
                                $scope.timeenvious5 = $scope.shippingmodel10.msg['USPSEXPWHW']['shipping_time'];
                                console.log($scope.precioenvious5);
                                console.log('warehouse USZYCB',$scope.shippingmodel10);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400);   
                    //}    
                }
                if($scope.product.msg[i]['warehouse_list']['YB'] == undefined && $scope.product.msg[i]['warehouse_list']['ZQ01'] == undefined && $scope.product.msg[i]['warehouse_list']['ZQDZ01'] == undefined && $scope.product.msg[i]['warehouse_list']['FCYWHQ'] == undefined && $scope.product.msg[i]['warehouse_list']['SZXIAWAN'] == undefined && $scope.product.msg[i]['warehouse_list']['B2BREXIAOWH'] == undefined && $scope.product.msg[i]['warehouse_list']['FXLAWH'] == undefined && $scope.product.msg[i]['warehouse_list']['FXLAWH2'] == undefined && $scope.product.msg[i]['warehouse_list']['MXTJWH'] == undefined && $scope.product.msg[i]['warehouse_list']['FXJFKGC'] == undefined && $scope.product.msg[i]['warehouse_list']['USZYCB'] == undefined){
                    
                    console.log('Out of Stock, please back');
                }
                var detectawarehouse = $scope.product.msg[i]['warehouse_list']['YB'];
                
                var detectasize = $scope.product.msg[i]['size'];
                $scope.seesize = false;
                if($scope.product.msg[i]['size']){
                    $scope.seesize = true;
                }


                console.log($scope.product.msg[i]['color'].length);
                for(var k=0; k <= $scope.product.msg[i]['color'].length; k++){
                    /*
                    $scope.detectacolor = $scope.product.msg[k]['color'];
                    $scope.enviarimg = $scope.product.msg[k]['original_img'][0];
                    console.log('este es el color -> ',$scope.detectacolor);
                    console.log('este es la imagen -> ',$scope.enviarimg);              
                    */
                }
                $timeout(function(){
                    var compararxtext = document.getElementsByClassName("compararxtext");
                    var idiconocolor = document.getElementsByClassName("idiconocolor");
                    for (var i = 0; i < compararxtext.length; i++) {
                        console.log('sale siempre null',idiconocolor[i].value);
                        if(typeof(idiconocolor[i].value) === undefined){
                            console.log('no se repitens');
                        }
                        if( idiconocolor[i].value == idiconocolor[i+1].value){
                            compararxtext[i+1].style.display = "none";
                            //document.getElementById(i).style.display = "none";
                            console.log('en el otro js es',compararxtext[i]);
                            console.log('id a evaluar',idiconocolor[i].value);
                        }else{
                            console.log('no se repitens');
                        }
                    }
                }, 50);


                
            }


        }


            
        
        $timeout(function(){
            $scope.goodsnumber = document.getElementById("goodsnumber").value;
            
            if($scope.goodsnumber <= 5){
                $scope.sendRuteStock = 'YB';
                console.log('Stock NO valido');
            }else if($scope.goodsnumber == null){
                $scope.sendRuteStock = 'YB';
                console.log('Stock NO valido');
            }
            
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





empleadoControllers.controller('ProductviewController', ['$scope','product','stock','$timeout','$routeParams','$http', function($scope,product,stock,$timeout,$routeParams,$http) {
    $scope.saveduser = localStorage.getItem('todosuser');
    $scope.SesionUser = JSON.parse($scope.saveduser);
    //console.log("nuevo nuevo",JSON.stringify($scope.SesionUser));
    $scope.viewoutofstock = true;
    $scope.viewoutofstock2 = false;
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

            
            var RutaCompletaSku = window.location.hash;

            var RutaSKU = RutaCompletaSku.split("/");
            var SKU = RutaSKU[2];


            //console.log('Los skus son',$scope.product.msg[i]['sku']);

            //color imagenes mouse over
            var idiconocolor;
            $scope.nameofcolorhover = function(p){
                var elcolor = document.getElementById('block'+p.color);
                elcolor.style.display = 'block';
                console.log(p.color);
                console.log(elcolor);
            }
            $scope.nameofcolorout = function(p){
                var elcolor = document.getElementById('block'+p.color);
                elcolor.style.display = 'none';
                console.log(p.color);
                console.log(elcolor);
            }

            if($scope.product.msg[i]['status'] == 0 && $scope.product.msg[i]['sku'] == SKU){
                console.log("otra data",$scope.product.msg[i]['sku']);
                console.log("su status",$scope.product.msg[i]['status']);
                $scope.viewoutofstock = true;
                $scope.viewoutofstock2 = true;
            }
           
            if($scope.product.msg[i]['status'] == 1 && $scope.product.msg[i]['sku'] == SKU){
                $scope.viewoutofstock = true;
                $scope.viewoutofstock2 = false;

                $scope.prodSKU = $scope.product.msg[i]['sku'];

                console.log("El producto",$scope.product.msg[i]);
                $scope.skuproducto = $scope.product.msg[i]['sku'];
                $scope.Tituloproducto = $scope.product.msg[i]['title'];

                $scope.ImagenOriginal1 = $scope.product.msg[i]['original_img'][0];
                $scope.ImagenOriginal2 = $scope.product.msg[i]['original_img'][1];
                $scope.ImagenOriginal3 = $scope.product.msg[i]['original_img'][2];
                $scope.ImagenOriginal4 = $scope.product.msg[i]['original_img'][3];
                $scope.ImagenOriginal5 = $scope.product.msg[i]['original_img'][4];
                $scope.ImagenOriginal6 = $scope.product.msg[i]['original_img'][5];
                $scope.ImagenOriginal7 = $scope.product.msg[i]['original_img'][6];
                $scope.ImagenOriginal8 = $scope.product.msg[i]['original_img'][7];
                $scope.ImagenOriginal9 = $scope.product.msg[i]['original_img'][8];
                $scope.ImagenOriginal10 = $scope.product.msg[i]['original_img'][9];
                $scope.ImagenOriginal11 = $scope.product.msg[i]['original_img'][10];
                $scope.ImagenOriginal12 = $scope.product.msg[i]['original_img'][11];
                $scope.ImagenOriginal13 = $scope.product.msg[i]['original_img'][12];
                $scope.ImagenOriginal14 = $scope.product.msg[i]['original_img'][13];
                $scope.ImagenOriginal15 = $scope.product.msg[i]['original_img'][14];
                $scope.ImagenOriginal16 = $scope.product.msg[i]['original_img'][15];
                $scope.ImagenOriginal17 = $scope.product.msg[i]['original_img'][16];

                $scope.TheDescription = $scope.product.msg[i]['goods_desc'];

                document.getElementById("infoprod2").innerHTML= $scope.TheDescription;

                console.log('La descripcion es',$scope.TheDescription);

                console.log("La imagen es",$scope.ImagenOriginal);
                
                
                if( $scope.product.msg[i]['warehouse_list']['YB'] ){
                    //if($scope.product.msg[i]['warehouse_list']['YB']['goods_number'] > 5){
                        console.log('CN-1');
                        var country = 'US';
                        $scope.shipcn1 = false;
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['YB']['warehouse'];
                        $scope.warehouse = $scope.product.msg[i]['warehouse_list']['YB']['warehouse'];
                        $scope.priceonecn = $scope.product.msg[i]['warehouse_list']['YB']['price'];

                        $scope.precioYB = $scope.product.msg[i]['warehouse_list']['YB']['price'];

                        $scope.stockone0 = $scope.product.msg[i]['warehouse_list']['YB']['goods_number'];
                        console.log($scope.stockone0);
                        
                        $scope.dataLoading = true;
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse+'&country='+country).then(function successCallback(response) {
                                console.log('Shipping cost CN-1');
                                $scope.shipcn1 = true;
                                $scope.dataLoading = false;
                                $scope.shippingmodel = response.data;
                                $scope.Placecn1 = 'China';
                                $scope.warehousename = 'CN-1 :';
                                $scope.stock0 = 'Stock :';
                                $scope.precioenviocn1 = $scope.shippingmodel.msg['USEXPLO']['shipping_fee'];
                                $scope.nameenviocn1 = $scope.shippingmodel.msg['USEXPLO']['shipping_name'];
                                $scope.timeenviocn1 = $scope.shippingmodel.msg['USEXPLO']['shipping_time'];
                                console.log($scope.precioenviocn1);
                                console.log('warehouse YB',$scope.shippingmodel);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400);    
                    //}
                    
                }
                if( $scope.product.msg[i]['warehouse_list']['ZQ01']  ){
                    //if($scope.product.msg[i]['warehouse_list']['ZQ01']['goods_number'] > 5){
                        console.log('CN-5');
                        var country = 'US';
                        $scope.shipcn5 = false;
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['ZQ01']['warehouse'];
                        $scope.warehouse1 = $scope.product.msg[i]['warehouse_list']['ZQ01']['warehouse'];
                        $scope.priceonecn = $scope.product.msg[i]['warehouse_list']['ZQ01']['price'];

                        $scope.precioZQ01 = $scope.product.msg[i]['warehouse_list']['ZQ01']['price'];

                        $scope.stockone1 = $scope.product.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                        $scope.dataLoading = true;
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse1+'&country='+country  ).then(function successCallback(response) {
                                $scope.dataLoading = false;
                                $scope.shipcn5 = true;
                                $scope.shippingmodel1 = response.data;
                                $scope.Placecn5 = 'China';
                                $scope.warehousename1 = 'CN-5 :';
                                $scope.stock1 = 'Stock :';
                                $scope.precioenviocn5 = $scope.shippingmodel1.msg['USEXPLO']['shipping_fee'];
                                $scope.nameenviocn5 = $scope.shippingmodel1.msg['USEXPLO']['shipping_name'];
                                $scope.timeenviocn5 = $scope.shippingmodel1.msg['USEXPLO']['shipping_time'];
                                console.log($scope.precioenviocn5);
                                console.log('warehouse ZQ01',$scope.shippingmodel1);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400);    
                    //}
                }
                if( $scope.product.msg[i]['warehouse_list']['ZQDZ01']  ){
                    //if($scope.product.msg[i]['warehouse_list']['ZQDZ01']['goods_number'] > 5){
                        console.log('CN-7');
                        var country = 'US';  
                        $scope.shipcn7 = false;
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['ZQDZ01']['warehouse'];
                        $scope.warehouse2 = $scope.product.msg[i]['warehouse_list']['ZQDZ01']['warehouse'];
                        $scope.priceonecn = $scope.product.msg[i]['warehouse_list']['ZQDZ01']['price'];

                        $scope.precioZQDZ01 = $scope.product.msg[i]['warehouse_list']['ZQDZ01']['price'];

                        $scope.stockone2 = $scope.product.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                        $scope.dataLoading = true;
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse2+'&country='+country  ).then(function successCallback(response) {
                                $scope.dataLoading = false;
                                $scope.shipcn7 = true;
                                $scope.shippingmodel2 = response.data;
                                $scope.Placecn7 = 'China';
                                $scope.warehousename2 = 'CN-7 :';
                                $scope.stock2 = 'Stock :';
                                $scope.precioenviocn7 = $scope.shippingmodel2.msg['USEXPLO']['shipping_fee'];
                                $scope.nameenviocn7 = $scope.shippingmodel2.msg['USEXPLO']['shipping_name'];
                                $scope.timeenviocn7 = $scope.shippingmodel2.msg['USEXPLO']['shipping_time'];
                                console.log($scope.precioenviocn7);
                                console.log('warehouse ZQDZ01',$scope.shippingmodel2);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400);   
                    //}
                }
                if( $scope.product.msg[i]['warehouse_list']['FCYWHQ'] ){
                    //if($scope.product.msg[i]['warehouse_list']['FCYWHQ']['goods_number'] > 5){
                        console.log('CN-8');
                        var country = 'US';
                        $scope.shipcn8 = false;
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['FCYWHQ']['warehouse'];
                        $scope.warehouse3 = $scope.product.msg[i]['warehouse_list']['FCYWHQ']['warehouse'];
                        $scope.priceonecn = $scope.product.msg[i]['warehouse_list']['FCYWHQ']['price'];

                        $scope.precioFCYWHQ = $scope.product.msg[i]['warehouse_list']['FCYWHQ']['price'];

                        $scope.stockone3 = $scope.product.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                        $scope.dataLoading = true;
                        console.log($scope.warehouse3);
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse3+'&country='+country ).then(function successCallback(response) {
                                $scope.dataLoading = false;
                                $scope.shipcn8 = true;
                                $scope.shippingmodel3 = response.data;
                                $scope.Placecn8 = 'China';
                                $scope.warehousename3 = 'CN-8 :'; 
                                $scope.stock3 = 'Stock :';
                                $scope.precioenviocn8 = $scope.shippingmodel3.msg['USEXPLO']['shipping_fee'];
                                $scope.nameenviocn8 = $scope.shippingmodel3.msg['USEXPLO']['shipping_name'];
                                $scope.timeenviocn8 = $scope.shippingmodel3.msg['USEXPLO']['shipping_time'];
                                console.log($scope.warehousename3);
                                console.log($scope.precioenviocn8);
                                console.log('warehouse FCYWHQ',$scope.shippingmodel3);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400);
                    //}    
                }
                if( $scope.product.msg[i]['warehouse_list']['SZXIAWAN'] ){
                    //if($scope.product.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'] > 5){
                        console.log('CN-9');
                        var country = 'US';
                        $scope.shipcn9 = false;
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['SZXIAWAN']['warehouse'];
                        $scope.warehouse4 = $scope.product.msg[i]['warehouse_list']['SZXIAWAN']['warehouse'];
                        $scope.priceonecn = $scope.product.msg[i]['warehouse_list']['SZXIAWAN']['price'];

                        $scope.precioSZXIAWAN = $scope.product.msg[i]['warehouse_list']['SZXIAWAN']['price'];

                        $scope.stockone4 = $scope.product.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                        $scope.dataLoading = true;
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse4+'&country='+country ).then(function successCallback(response) {
                                $scope.dataLoading = false;
                                $scope.shipcn9 = true;
                                $scope.shippingmodel4 = response.data;
                                $scope.Placecn9 = 'China';
                                $scope.warehousename4 = 'CN-9 :'; 
                                $scope.stock4 = 'Stock :';
                                $scope.precioenviocn9 = $scope.shippingmodel4.msg['USEXPLO']['shipping_fee'];
                                $scope.nameenviocn9 = $scope.shippingmodel4.msg['USEXPLO']['shipping_name'];
                                $scope.timeenviocn9 = $scope.shippingmodel4.msg['USEXPLO']['shipping_time'];
                                console.log($scope.precioenviocn9);
                                console.log('warehouse SZXIAWAN',$scope.shippingmodel4);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400);   
                    //}
                }
                if( $scope.product.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                    //if($scope.product.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'] > 5){
                        console.log('CN-11');
                        var country = 'US';
                        $scope.shipcn11 = false;
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['B2BREXIAOWH']['warehouse'];
                        $scope.warehouse5 = $scope.product.msg[i]['warehouse_list']['B2BREXIAOWH']['warehouse'];
                        $scope.priceonecn = $scope.product.msg[i]['warehouse_list']['B2BREXIAOWH']['price'];

                        $scope.precioB2BREXIAOWH = $scope.product.msg[i]['warehouse_list']['B2BREXIAOWH']['price'];

                        $scope.stockone5 = $scope.product.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                        $scope.dataLoading = true;
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCost.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse5+'&country='+country ).then(function successCallback(response) {
                                $scope.dataLoading = false;
                                $scope.shipcn11 = true;
                                $scope.shippingmodel5 = response.data;
                                $scope.Placecn11 = 'China';
                                $scope.warehousename5 = 'CN-11 :'; 
                                $scope.stock5 = 'Stock :';
                                $scope.precioenviocn11 = $scope.shippingmodel5.msg['USEXPLO']['shipping_fee'];
                                $scope.nameenviocn11 = $scope.shippingmodel5.msg['USEXPLO']['shipping_name'];
                                $scope.timeenviocn11 = $scope.shippingmodel5.msg['USEXPLO']['shipping_time'];
                                console.log($scope.precioenviocn11);
                                console.log('warehouse B2BREXIAOWH',$scope.shippingmodel5);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400); 
                    //}   
                }
                if( $scope.product.msg[i]['warehouse_list']['FXLAWH'] ){
                    //if($scope.product.msg[i]['warehouse_list']['FXLAWH']['goods_number'] > 5){
                        console.log('US-1 ');
                        var country = 'US';
                        $scope.shipus1 = false;
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['FXLAWH']['warehouse'];
                        $scope.warehouse6 = $scope.product.msg[i]['warehouse_list']['FXLAWH']['warehouse'];
                        $scope.priceoneus = $scope.product.msg[i]['warehouse_list']['FXLAWH']['price'];

                        $scope.precioFXLAWH = $scope.product.msg[i]['warehouse_list']['FXLAWH']['price'];

                        $scope.stockone6 = $scope.product.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                        $scope.dataLoading = true;
                        console.log($scope.stockone6);
                        console.log($scope.product.msg[i]['original_img'][0]);
                        $scope.prodImg = $scope.product.msg[i]['original_img'][0];
                        $scope.prodColor = $scope.product.msg[i]['color'];
                        console.log($scope.stockone6);
                        $scope.zipcode1 = '90001';
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCostUS.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse6+'&country='+country+'&zipcode='+$scope.zipcode1 ).then(function successCallback(response) {
                                console.log('Shipping cost US-1 ');
                                $scope.dataLoading = false;
                                $scope.shipus1 = true;
                                $scope.shippingmodel6 = response.data;
                                $scope.Placeus1 = 'UNITED STATES';
                                $scope.warehousename6 = 'US-1 :';
                                $scope.stock6 = 'Stock :'; 
                                $scope.precioenvious1 = $scope.shippingmodel6.msg['USPSEXPWHW']['shipping_fee'];
                                $scope.nameenvious1 = $scope.shippingmodel6.msg['USPSEXPWHW']['shipping_name'];
                                $scope.timeenvious1 = $scope.shippingmodel6.msg['USPSEXPWHW']['shipping_time'];
                                console.log($scope.precioenvious1);
                                console.log('warehouse FXLAWH',$scope.shippingmodel6);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400);
                    //}
                        
                }
                if( $scope.product.msg[i]['warehouse_list']['FXLAWH2'] ){
                    //if($scope.product.msg[i]['warehouse_list']['FXLAWH2']['goods_number'] > 5){
                        console.log('US-2');
                        var country = 'US';
                        $scope.shipus2 = false;
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['FXLAWH2']['warehouse'];
                        $scope.warehouse7 = $scope.product.msg[i]['warehouse_list']['FXLAWH2']['warehouse'];
                        $scope.priceoneus = $scope.product.msg[i]['warehouse_list']['FXLAWH2']['price'];

                        $scope.precioFXLAWH2 = $scope.product.msg[i]['warehouse_list']['FXLAWH2']['price'];

                        $scope.stockone7 = $scope.product.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                        $scope.dataLoading = true;
                        $scope.zipcode2 = '90001';
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCostUS.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse7+'&country='+country+'&zipcode='+$scope.zipcode2  ).then(function successCallback(response) {
                                $scope.dataLoading = false;
                                $scope.shipus2 = true;
                                $scope.shippingmodel7 = response.data;
                                $scope.Placeus2 = 'UNITED STATES';
                                $scope.warehousename7 = 'US-2 :'; 
                                $scope.stock7 = 'Stock :';
                                $scope.precioenvious2 = $scope.shippingmodel7.msg['USPSEXPWHW']['shipping_fee'];
                                $scope.nameenvious2 = $scope.shippingmodel7.msg['USPSEXPWHW']['shipping_name'];
                                $scope.timeenvious2 = $scope.shippingmodel7.msg['USPSEXPWHW']['shipping_time'];
                                console.log($scope.precioenvious2);
                                console.log('warehouse FXLAWH2',$scope.shippingmodel7);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400);  
                    //}  
                }
                if( $scope.product.msg[i]['warehouse_list']['MXTJWH'] ){
                    //if($scope.product.msg[i]['warehouse_list']['MXTJWH']['goods_number'] > 5){
                        console.log('US-3');
                        var country = 'US';
                        $scope.shipus3 = false;
                        $scope.envwarehouse = 'MXTJWH'
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['MXTJWH']['warehouse'];
                        $scope.warehouse8 = $scope.product.msg[i]['warehouse_list']['MXTJWH']['warehouse'];
                        $scope.priceoneus = $scope.product.msg[i]['warehouse_list']['MXTJWH']['price'];

                        $scope.precioMXTJWH = $scope.product.msg[i]['warehouse_list']['MXTJWH']['price'];

                        $scope.stockone8 = $scope.product.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                        $scope.dataLoading = true;
                        $scope.zipcode3 = '90001';
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCostUS.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse8+'&country='+country+'&zipcode='+$scope.zipcode3  ).then(function successCallback(response) {
                                $scope.dataLoading = false;
                                $scope.shipus3 = true;
                                $scope.shippingmodel8 = response.data;
                                $scope.Placeus3 = 'UNITED STATES';
                                $scope.warehousename8 = 'US-3 :'; 
                                $scope.stock8 = 'Stock :';
                                $scope.precioenvious3 = $scope.shippingmodel8.msg['USPSEXPWHW']['shipping_fee'];
                                $scope.nameenvious3 = $scope.shippingmodel8.msg['USPSEXPWHW']['shipping_name'];
                                $scope.timeenvious3 = $scope.shippingmodel8.msg['USPSEXPWHW']['shipping_time'];
                                console.log($scope.precioenvious3);
                                console.log('warehouse MXTJWH',$scope.shippingmodel8);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400);
                    //}
                }
                if( $scope.product.msg[i]['warehouse_list']['FXJFKGC'] ){
                    //if($scope.product.msg[i]['warehouse_list']['FXJFKGC']['goods_number'] > 5){
                        console.log('US-4');
                        var country = 'US';
                        $scope.shipus4 = false;
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['FXJFKGC']['warehouse'];
                        $scope.warehouse9 = $scope.product.msg[i]['warehouse_list']['FXJFKGC']['warehouse'];
                        $scope.priceoneus = $scope.product.msg[i]['warehouse_list']['FXJFKGC']['price'];

                        $scope.precioFXJFKGC = $scope.product.msg[i]['warehouse_list']['FXJFKGC']['price'];

                        $scope.stockone9 = $scope.product.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                        $scope.dataLoading = true;
                        $scope.zipcode4 = '10001';
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCostUS.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse9+'&country='+country+'&zipcode='+$scope.zipcode4   ).then(function successCallback(response) {
                                $scope.dataLoading = false;
                                $scope.shipus4 = true;
                                $scope.shippingmodel9 = response.data;
                                $scope.Placeus4 = 'UNITED STATES';
                                $scope.warehousename9 = 'US-4 :'; 
                                $scope.stock9 = 'Stock :';
                                $scope.precioenvious4 = $scope.shippingmodel9.msg['USPSEXPWHW']['shipping_fee'];
                                $scope.nameenvious4 = $scope.shippingmodel9.msg['USPSEXPWHW']['shipping_name'];
                                $scope.timeenvious4 = $scope.shippingmodel9.msg['USPSEXPWHW']['shipping_time'];
                                console.log($scope.precioenvious4);
                                console.log('warehouse FXJFKGC',$scope.shippingmodel9);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400);   
                    //} 
                }
                if( $scope.product.msg[i]['warehouse_list']['USZYCB'] ){
                    //if($scope.product.msg[i]['warehouse_list']['USZYCB']['goods_number'] > 5){
                        console.log('US-5');
                        var country = 'US';
                        $scope.shipus5 = false;
                        $scope.warehousesolo = $scope.product.msg[i]['warehouse_list']['USZYCB']['warehouse'];
                        $scope.warehouse10 = $scope.product.msg[i]['warehouse_list']['USZYCB']['warehouse'];
                        $scope.priceoneus = $scope.product.msg[i]['warehouse_list']['USZYCB']['price'];

                        $scope.precioUSZYCB = $scope.product.msg[i]['warehouse_list']['USZYCB']['price'];

                        $scope.stockone10 = $scope.product.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                        $scope.dataLoading = true;
                        $scope.zipcode5 = '07039';
                        $timeout(function() {
                            $http.post(rute+'chinabrands/GetShippingCostUS.php?sku='+$scope.prodSKU+'&warehouse='+$scope.warehouse10+'&country='+country+'&zipcode='+$scope.zipcode5  ).then(function successCallback(response) {
                                $scope.dataLoading = false;
                                $scope.shipus5 = true;
                                $scope.shippingmodel10 = response.data;
                                $scope.Placeus5 = 'UNITED STATES';
                                $scope.warehousename10 = 'US-5 :'; 
                                $scope.stock10 = 'Stock :';
                                $scope.precioenvious5 = $scope.shippingmodel10.msg['USPSEXPWHW']['shipping_fee'];
                                $scope.nameenvious5 = $scope.shippingmodel10.msg['USPSEXPWHW']['shipping_name'];
                                $scope.timeenvious5 = $scope.shippingmodel10.msg['USPSEXPWHW']['shipping_time'];
                                console.log($scope.precioenvious5);
                                console.log('warehouse USZYCB',$scope.shippingmodel10);
                            }, function errorCallback(response) {
                                $scope.error = 'Information not found';
                                $scope.dataLoading = false;
                            });
                        }, 400);   
                    //}    
                }
                if($scope.product.msg[i]['warehouse_list']['YB'] == undefined && $scope.product.msg[i]['warehouse_list']['ZQ01'] == undefined && $scope.product.msg[i]['warehouse_list']['ZQDZ01'] == undefined && $scope.product.msg[i]['warehouse_list']['FCYWHQ'] == undefined && $scope.product.msg[i]['warehouse_list']['SZXIAWAN'] == undefined && $scope.product.msg[i]['warehouse_list']['B2BREXIAOWH'] == undefined && $scope.product.msg[i]['warehouse_list']['FXLAWH'] == undefined && $scope.product.msg[i]['warehouse_list']['FXLAWH2'] == undefined && $scope.product.msg[i]['warehouse_list']['MXTJWH'] == undefined && $scope.product.msg[i]['warehouse_list']['FXJFKGC'] == undefined && $scope.product.msg[i]['warehouse_list']['USZYCB'] == undefined){
                    
                    console.log('Out of Stock, please back');
                }
                var detectawarehouse = $scope.product.msg[i]['warehouse_list']['YB'];
                
                var detectasize = $scope.product.msg[i]['size'];
                $scope.seesize = false;
                if($scope.product.msg[i]['size']){
                    $scope.seesize = true;
                }


                console.log($scope.product.msg[i]['color'].length);
                for(var k=0; k <= $scope.product.msg[i]['color'].length; k++){
                    /*
                    $scope.detectacolor = $scope.product.msg[k]['color'];
                    $scope.enviarimg = $scope.product.msg[k]['original_img'][0];
                    console.log('este es el color -> ',$scope.detectacolor);
                    console.log('este es la imagen -> ',$scope.enviarimg);              
                    */
                }
                $timeout(function(){
                    var compararxtext = document.getElementsByClassName("compararxtext");
                    var idiconocolor = document.getElementsByClassName("idiconocolor");
                    for (var i = 0; i < compararxtext.length; i++) {
                        console.log('sale siempre null',idiconocolor[i].value);
                        if(typeof(idiconocolor[i].value) === undefined){
                            console.log('no se repitens');
                        }

                        if( idiconocolor[i].value == idiconocolor[i+1].value){
                            compararxtext[i+1].style.display = "none";
                            console.log('en el otro js es',compararxtext[i]);
                            console.log('id a evaluar',idiconocolor[i].value);
                        }else{
                            console.log('no se repitens');
                        }

                    }
                }, 50);


                
            }


        }


            
        
        $timeout(function(){
            $scope.goodsnumber = document.getElementById("goodsnumber").value;
            
            if($scope.goodsnumber <= 3){
                $scope.sendRuteStock = 'YB';
                console.log('Stock valido');
            }else if($scope.goodsnumber == null){
                $scope.sendRuteStock = 'YB';
                console.log('Stock NO valido');
            }
            
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
    if($scope.Rol == '1' || $scope.Rol == '2'){
        
        $scope.logged = false;
        $scope.unlogged = true;
        
    }else{
        
        $scope.logged = true;
        $scope.unlogged = false;
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
                    
                    $timeout(function(){
                        $scope.dataLoading = false;
                        location.reload();
                    }, 50);
                    
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
    if($scope.Rol == '1' || $scope.Rol == '2'){
        $scope.logged = false;
        $scope.unlogged = true;
    }else{
        $scope.logged = true;
        $scope.unlogged = false;
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
        console.log('user rol 1');
        $scope.seetoadmin = true;
    }else{
        console.log('user rol 2');
        $scope.seetoadmin = false;
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

    for(var i in $scope.SesionUser){
        $scope.Email = $scope.SesionUser[i]['email'];
        $scope.Rol = $scope.SesionUser[i]['rol'];
    }
    console.log($scope.Rol);
    if($scope.Rol == '1' || $scope.Rol == '2'){
        $scope.logged = false;
        $scope.unlogged = true;
    }else{
        $scope.logged = true;
        $scope.unlogged = false;
    }

    $scope.CloseSession = function(){

        $scope.dataLoading = true;
        $timeout(function(){
            localStorage.removeItem('todosuser');
            $http.post(rute+'api/?a=Logout').then(function successCallback(response) {
                $timeout(function(){
                    $scope.dataLoading = false;
                    location.reload();
                }, 50);     
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
    console.log($scope.ImportList);
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
        $scope.numPerPageProducts = 10; //es 40

        $scope.hacerPagineoProducts = function (arreglo) {
            //si no retorna ningun valor
            if (!arreglo || !arreglo.length) { return; }
            var principio = (($scope.currentPageProducts - 1) * $scope.numPerPageProducts); //0, 3
            var fin = principio + $scope.numPerPageProducts; //3, 6
            $scope.filtroProducts = arreglo.slice(principio, fin); // 
        };
            
        $scope.$watch('currentPageProducts',function(){
            $scope.hacerPagineoProducts($scope.dataProducts);
    
        }); 

        var miArray2 = [];
        var miArray = [];
        for (var i in $scope.products.msg) {
            var skuconhijos = $scope.products.msg[i]['sku'];
            if( $scope.products.msg[i]['status'] == 1){
                miArray = JSON.parse(JSON.stringify($scope.products.msg[i]));
                miArray2.push(miArray);
            }
        }
        $scope.dataProducts = miArray2;
        //total de productos
        $scope.totalProducts = $scope.dataProducts.length;
        $scope.hacerPagineoProducts($scope.dataProducts);

        console.log('lo que me muestra',$scope.filtroProducts);
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
        $scope.seetoadmin = true;
        $http.get(rute+'api/?a=obtenerImportList&email=' + $routeParams.email).then(function successCallback(response) { 
            $scope.UserImportList = response.data;
            //$scope.downloadImpList = $scope.UserImportList.ImportList;
            for (var i in $scope.UserImportList) {
                $scope.downloadImpList = $scope.UserImportList[i]['ImportList'];
            }
            var Lista1 = JSON.parse($scope.downloadImpList);
            var Lista2 = Lista1.split(",");

            $scope.Downloadimportlist = function(){
                var data = ['SKU', Lista2.join('\n')];
                var csv = '';
                data.forEach(function(row) {
                    csv += row;
                    csv += "\n";
                });
                console.log(csv);
                var hiddenElement = document.createElement('a');
                hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
                hiddenElement.target = '_blank';
                hiddenElement.download = 'UserImportList.csv';
                hiddenElement.click();
            };   
        }, function errorCallback(response) {
            console.log('no logrado');
        }); 

        $scope.retirar = function(id){
            if(confirm('Esta seguro de realizar esta accion?')){
                $scope.dataLoading = true;
                $http.get(rute+'api/?a=eliminarUserList&id='+ id).then(function(response){
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

    }else{
        $scope.seetoadmin = false;
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
/*
    $scope.Downloadstop = function() {
        $timeout(function(){
            location.reload();
        }, 100);
    }
*/

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
$scope.dataLoadingText = true;  
$scope.dataNoResults = false;   
$timeout(function(){
    $scope.dataLoading = true;
    $scope.dataLoadingText = true; 
    $scope.dataNoResults = false;
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
                        $scope.dataLoadingText = true; 
                        $scope.dataNoResults = false;
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
                            $scope.dataLoadingText = false; 


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
                                    //console.log(buscados.length);
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
                        }else if(miArray2otro.length = '0'){
                            $scope.dataLoading = false;
                            $scope.dataLoadingText = false; 
                            $scope.dataNoResults = false; 
                            $timeout(function(){
                                $scope.dataNoResults = true;
                            }, 500);
                            console.log('This subcategory currently does not have products. Please check back for updates.');
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

            
            $scope.products = response; 


            

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
 
//end time to delay
}, 1000);          




    }, function errorCallback(response) {
        console.log("error 505");    
    });


    






    



}]);













empleadoControllers.controller('SyncupController', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    categories.list(function(categories) {
        $scope.categories = categories;  
        for(var i in $scope.categories.msg){
            if($scope.categories.msg[i]['parent_id'] == 0){
                if(i == 0){
                    $scope.enviocategoria =  $scope.categories.msg[i]['cat_id'];
                    $scope.dataLoading = true;
                        $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria +'&page='+ 1).then(function successCallback(response) {    
                            $scope.dataLoading = true;
                            $scope.AllproductsOff = response.data;
                            var miArray2otro = [];
                            for(var i=1 ; i <= $scope.AllproductsOff.msg.total_pages; i++){
                                    $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria  +'&page='+ i).then(function successCallback(response) {
                                        $scope.AllproductsOtro = response.data;
                                        $scope.ResultadoOtro = $scope.AllproductsOtro.msg['page_result'];
                                        var ProductsSendphpOtro = 'myData='+JSON.stringify($scope.ResultadoOtro);
                                        $http({
                                            method : 'POST',
                                            url : rute+'chinabrands/GetProductCollention.php',
                                            data: ProductsSendphpOtro,
                                            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                                        }).success(function(response){
                                            $scope.productsotro = response;
                                            for (var i in $scope.productsotro.msg) {
                                                if( $scope.productsotro.msg[i]['status'] == 1 ){
                                                    if(($scope.productsotro.msg[i]['warehouse_list']['YB'] || $scope.productsotro.msg[i]['warehouse_list']['ZQ01'] || $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01'] || $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] || $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] || $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] || $scope.productsotro.msg[i]['warehouse_list']['USZYCB']   )   ){
                                                        if( $scope.productsotro.msg[i]['warehouse_list']['YB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['USZYCB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }
                                                    }    
                                                }
                                            }    
                                            if(miArray2otro.length >= '1'){
                                                $scope.dataProductsotro = miArray2otro;
                                                $scope.dataLoading = true;
                                            }else if(miArray2otro.length = '0'){
                                                console.log('This subcategory currently does not have products. Please check back for updates.');
                                            }
                                        }).error(function(error){
                                            $scope.dataLoading = true;
                                            console.log(error); 
                                        });
                                    }, function errorCallback(response) {
                                        console.log("error 505");    
                                    });
                            }  
                            $timeout(function(){
                                $scope.dataLoading = true;
                                //para eliminar y registrar
                                $http.get(rute+'api/?a=eliminarParaSicronizar&cat='+ $scope.enviocategoria ).then(function(response){
                                    console.log('all deleted');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                }, function errorCallback(response) {
                                    console.log('datos no eliminados');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                console.log('',dataSaveProductsPHP);
                                                
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                });
                                //end elimina y registra
                            }, 1000 * 60 * 10);
                            //}, 1000 * 60 * 10); 
                        }, function errorCallback(response) {
                            console.log("error 505");    
                        });
                }  
                //end category 0
            } 
        } 
    });
}]);

empleadoControllers.controller('SyncupController1', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    categories.list(function(categories) {
        $scope.categories = categories;  
        for(var i in $scope.categories.msg){
            if($scope.categories.msg[i]['parent_id'] == 0){
                if(i == 1){
                    $scope.enviocategoria =  $scope.categories.msg[i]['cat_id'];
                    $scope.dataLoading = true;
                        $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria +'&page='+ 1).then(function successCallback(response) {    
                            $scope.dataLoading = true;
                            $scope.AllproductsOff = response.data;
                            var miArray2otro = [];
                            for(var i=1 ; i <= $scope.AllproductsOff.msg.total_pages; i++){
                                    $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria  +'&page='+ i).then(function successCallback(response) {
                                        $scope.AllproductsOtro = response.data;
                                        $scope.ResultadoOtro = $scope.AllproductsOtro.msg['page_result'];
                                        var ProductsSendphpOtro = 'myData='+JSON.stringify($scope.ResultadoOtro);
                                        $http({
                                            method : 'POST',
                                            url : rute+'chinabrands/GetProductCollention.php',
                                            data: ProductsSendphpOtro,
                                            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                                        }).success(function(response){
                                            $scope.productsotro = response;
                                            for (var i in $scope.productsotro.msg) {
                                                if( $scope.productsotro.msg[i]['status'] == 1 ){
                                                    if(($scope.productsotro.msg[i]['warehouse_list']['YB'] || $scope.productsotro.msg[i]['warehouse_list']['ZQ01'] || $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01'] || $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] || $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] || $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] || $scope.productsotro.msg[i]['warehouse_list']['USZYCB']   )   ){
                                                        if( $scope.productsotro.msg[i]['warehouse_list']['YB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['USZYCB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }
                                                    }    
                                                }
                                            }    
                                            if(miArray2otro.length >= '1'){
                                                $scope.dataProductsotro = miArray2otro;
                                                $scope.dataLoading = true;
                                            }else if(miArray2otro.length = '0'){
                                                console.log('This subcategory currently does not have products. Please check back for updates.');
                                            }
                                        }).error(function(error){
                                            $scope.dataLoading = true;
                                            console.log(error); 
                                        });
                                    }, function errorCallback(response) {
                                        console.log("error 505");    
                                    });
                            }  
                            $timeout(function(){
                                $scope.dataLoading = true;
                                //para eliminar y registrar
                                $http.get(rute+'api/?a=eliminarParaSicronizar&cat='+ $scope.enviocategoria ).then(function(response){
                                    console.log('all deleted');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                }, function errorCallback(response) {
                                    console.log('datos no eliminados');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                console.log('',dataSaveProductsPHP);
                                                
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                });
                                //end elimina y registra
                            }, 1000 * 60 * 5);
                            //}, 1000 * 60 * 10); 
                        }, function errorCallback(response) {
                            console.log("error 505");    
                        });
                }  
                //end category 0
            } 
        } 
    });
}]);


empleadoControllers.controller('SyncupController2', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    categories.list(function(categories) {
        $scope.categories = categories;  
        for(var i in $scope.categories.msg){
            if($scope.categories.msg[i]['parent_id'] == 0){
                if(i == 10){
                    $scope.enviocategoria =  $scope.categories.msg[i]['cat_id'];
                    $scope.dataLoading = true;
                        $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria +'&page='+ 1).then(function successCallback(response) {    
                            $scope.dataLoading = true;
                            $scope.AllproductsOff = response.data;
                            var miArray2otro = [];
                            for(var i=1 ; i <= $scope.AllproductsOff.msg.total_pages; i++){
                                    $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria  +'&page='+ i).then(function successCallback(response) {
                                        $scope.AllproductsOtro = response.data;
                                        $scope.ResultadoOtro = $scope.AllproductsOtro.msg['page_result'];
                                        var ProductsSendphpOtro = 'myData='+JSON.stringify($scope.ResultadoOtro);
                                        $http({
                                            method : 'POST',
                                            url : rute+'chinabrands/GetProductCollention.php',
                                            data: ProductsSendphpOtro,
                                            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                                        }).success(function(response){
                                            $scope.productsotro = response;
                                            for (var i in $scope.productsotro.msg) {
                                                if( $scope.productsotro.msg[i]['status'] == 1 ){
                                                    if(($scope.productsotro.msg[i]['warehouse_list']['YB'] || $scope.productsotro.msg[i]['warehouse_list']['ZQ01'] || $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01'] || $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] || $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] || $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] || $scope.productsotro.msg[i]['warehouse_list']['USZYCB']   )   ){
                                                        if( $scope.productsotro.msg[i]['warehouse_list']['YB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['USZYCB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }
                                                    }    
                                                }
                                            }    
                                            if(miArray2otro.length >= '1'){
                                                $scope.dataProductsotro = miArray2otro;
                                                $scope.dataLoading = true;
                                            }else if(miArray2otro.length = '0'){
                                                console.log('This subcategory currently does not have products. Please check back for updates.');
                                            }
                                        }).error(function(error){
                                            $scope.dataLoading = true;
                                            console.log(error); 
                                        });
                                    }, function errorCallback(response) {
                                        console.log("error 505");    
                                    });
                            }  
                            $timeout(function(){
                                $scope.dataLoading = true;
                                //para eliminar y registrar
                                $http.get(rute+'api/?a=eliminarParaSicronizar&cat='+ $scope.enviocategoria ).then(function(response){
                                    console.log('all deleted');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                }, function errorCallback(response) {
                                    console.log('datos no eliminados');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                console.log('',dataSaveProductsPHP);
                                                
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                });
                                //end elimina y registra
                            }, 1000 * 60 * 2);
                            //}, 1000 * 60 * 10); 
                        }, function errorCallback(response) {
                            console.log("error 505");    
                        });
                }  
                //end category 0
            } 
        } 
    });
}]);


empleadoControllers.controller('SyncupController3', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    categories.list(function(categories) {
        $scope.categories = categories;  
        for(var i in $scope.categories.msg){
            if($scope.categories.msg[i]['parent_id'] == 0){
                if(i == 21){
                    $scope.enviocategoria =  $scope.categories.msg[i]['cat_id'];
                    $scope.dataLoading = true;
                        $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria +'&page='+ 1).then(function successCallback(response) {    
                            $scope.dataLoading = true;
                            $scope.AllproductsOff = response.data;
                            var miArray2otro = [];
                            for(var i=1 ; i <= $scope.AllproductsOff.msg.total_pages; i++){
                                    $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria  +'&page='+ i).then(function successCallback(response) {
                                        $scope.AllproductsOtro = response.data;
                                        $scope.ResultadoOtro = $scope.AllproductsOtro.msg['page_result'];
                                        var ProductsSendphpOtro = 'myData='+JSON.stringify($scope.ResultadoOtro);
                                        $http({
                                            method : 'POST',
                                            url : rute+'chinabrands/GetProductCollention.php',
                                            data: ProductsSendphpOtro,
                                            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                                        }).success(function(response){
                                            $scope.productsotro = response;
                                            for (var i in $scope.productsotro.msg) {
                                                if( $scope.productsotro.msg[i]['status'] == 1 ){
                                                    if(($scope.productsotro.msg[i]['warehouse_list']['YB'] || $scope.productsotro.msg[i]['warehouse_list']['ZQ01'] || $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01'] || $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] || $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] || $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] || $scope.productsotro.msg[i]['warehouse_list']['USZYCB']   )   ){
                                                        if( $scope.productsotro.msg[i]['warehouse_list']['YB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['USZYCB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }
                                                    }    
                                                }
                                            }    
                                            if(miArray2otro.length >= '1'){
                                                $scope.dataProductsotro = miArray2otro;
                                                $scope.dataLoading = true;
                                            }else if(miArray2otro.length = '0'){
                                                console.log('This subcategory currently does not have products. Please check back for updates.');
                                            }
                                        }).error(function(error){
                                            $scope.dataLoading = true;
                                            console.log(error); 
                                        });
                                    }, function errorCallback(response) {
                                        console.log("error 505");    
                                    });
                            }  
                            $timeout(function(){
                                $scope.dataLoading = true;
                                //para eliminar y registrar
                                $http.get(rute+'api/?a=eliminarParaSicronizar&cat='+ $scope.enviocategoria ).then(function(response){
                                    console.log('all deleted');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                }, function errorCallback(response) {
                                    console.log('datos no eliminados');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                console.log('',dataSaveProductsPHP);
                                                
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                });
                                //end elimina y registra
                            }, 1000 * 60 * 2);
                            //}, 1000 * 60 * 10); 
                        }, function errorCallback(response) {
                            console.log("error 505");    
                        });
                }  
                //end category 0
            } 
        } 
    });
}]);


empleadoControllers.controller('SyncupController4', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    categories.list(function(categories) {
        $scope.categories = categories;  
        for(var i in $scope.categories.msg){
            if($scope.categories.msg[i]['parent_id'] == 0){
                if(i == 22){
                    $scope.enviocategoria =  $scope.categories.msg[i]['cat_id'];
                    $scope.dataLoading = true;
                        $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria +'&page='+ 1).then(function successCallback(response) {    
                            $scope.dataLoading = true;
                            $scope.AllproductsOff = response.data;
                            var miArray2otro = [];
                            for(var i=1 ; i <= $scope.AllproductsOff.msg.total_pages; i++){
                                    $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria  +'&page='+ i).then(function successCallback(response) {
                                        $scope.AllproductsOtro = response.data;
                                        $scope.ResultadoOtro = $scope.AllproductsOtro.msg['page_result'];
                                        var ProductsSendphpOtro = 'myData='+JSON.stringify($scope.ResultadoOtro);
                                        $http({
                                            method : 'POST',
                                            url : rute+'chinabrands/GetProductCollention.php',
                                            data: ProductsSendphpOtro,
                                            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                                        }).success(function(response){
                                            $scope.productsotro = response;
                                            for (var i in $scope.productsotro.msg) {
                                                if( $scope.productsotro.msg[i]['status'] == 1 ){
                                                    if(($scope.productsotro.msg[i]['warehouse_list']['YB'] || $scope.productsotro.msg[i]['warehouse_list']['ZQ01'] || $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01'] || $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] || $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] || $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] || $scope.productsotro.msg[i]['warehouse_list']['USZYCB']   )   ){
                                                        if( $scope.productsotro.msg[i]['warehouse_list']['YB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['USZYCB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }
                                                    }    
                                                }
                                            }    
                                            if(miArray2otro.length >= '1'){
                                                $scope.dataProductsotro = miArray2otro;
                                                $scope.dataLoading = true;
                                            }else if(miArray2otro.length = '0'){
                                                console.log('This subcategory currently does not have products. Please check back for updates.');
                                            }
                                        }).error(function(error){
                                            $scope.dataLoading = true;
                                            console.log(error); 
                                        });
                                    }, function errorCallback(response) {
                                        console.log("error 505");    
                                    });
                            }  
                            $timeout(function(){
                                $scope.dataLoading = true;
                                //para eliminar y registrar
                                $http.get(rute+'api/?a=eliminarParaSicronizar&cat='+ $scope.enviocategoria ).then(function(response){
                                    console.log('all deleted');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                }, function errorCallback(response) {
                                    console.log('datos no eliminados');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                console.log('',dataSaveProductsPHP);
                                                
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                });
                                //end elimina y registra
                            }, 1000 * 60 * 2);
                            //}, 1000 * 60 * 10); 
                        }, function errorCallback(response) {
                            console.log("error 505");    
                        });
                }  
                //end category 0
            } 
        } 
    });
}]);


empleadoControllers.controller('SyncupController5', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    categories.list(function(categories) {
        $scope.categories = categories;  
        for(var i in $scope.categories.msg){
            if($scope.categories.msg[i]['parent_id'] == 0){
                if(i == 23){
                    $scope.enviocategoria =  $scope.categories.msg[i]['cat_id'];
                    $scope.dataLoading = true;
                        $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria +'&page='+ 1).then(function successCallback(response) {    
                            $scope.dataLoading = true;
                            $scope.AllproductsOff = response.data;
                            var miArray2otro = [];
                            for(var i=1 ; i <= $scope.AllproductsOff.msg.total_pages; i++){
                                    $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria  +'&page='+ i).then(function successCallback(response) {
                                        $scope.AllproductsOtro = response.data;
                                        $scope.ResultadoOtro = $scope.AllproductsOtro.msg['page_result'];
                                        var ProductsSendphpOtro = 'myData='+JSON.stringify($scope.ResultadoOtro);
                                        $http({
                                            method : 'POST',
                                            url : rute+'chinabrands/GetProductCollention.php',
                                            data: ProductsSendphpOtro,
                                            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                                        }).success(function(response){
                                            $scope.productsotro = response;
                                            for (var i in $scope.productsotro.msg) {
                                                if( $scope.productsotro.msg[i]['status'] == 1 ){
                                                    if(($scope.productsotro.msg[i]['warehouse_list']['YB'] || $scope.productsotro.msg[i]['warehouse_list']['ZQ01'] || $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01'] || $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] || $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] || $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] || $scope.productsotro.msg[i]['warehouse_list']['USZYCB']   )   ){
                                                        if( $scope.productsotro.msg[i]['warehouse_list']['YB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['USZYCB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }
                                                    }    
                                                }
                                            }    
                                            if(miArray2otro.length >= '1'){
                                                $scope.dataProductsotro = miArray2otro;
                                                $scope.dataLoading = true;
                                            }else if(miArray2otro.length = '0'){
                                                console.log('This subcategory currently does not have products. Please check back for updates.');
                                            }
                                        }).error(function(error){
                                            $scope.dataLoading = true;
                                            console.log(error); 
                                        });
                                    }, function errorCallback(response) {
                                        console.log("error 505");    
                                    });
                            }  
                            $timeout(function(){
                                $scope.dataLoading = true;
                                //para eliminar y registrar
                                $http.get(rute+'api/?a=eliminarParaSicronizar&cat='+ $scope.enviocategoria ).then(function(response){
                                    console.log('all deleted');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                }, function errorCallback(response) {
                                    console.log('datos no eliminados');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                console.log('',dataSaveProductsPHP);
                                                
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                });
                                //end elimina y registra
                            }, 1000 * 60 * 3);
                            //}, 1000 * 60 * 10); 
                        }, function errorCallback(response) {
                            console.log("error 505");    
                        });
                }  
                //end category 0
            } 
        } 
    });
}]);



empleadoControllers.controller('SyncupController6', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    categories.list(function(categories) {
        $scope.categories = categories;  
        for(var i in $scope.categories.msg){
            if($scope.categories.msg[i]['parent_id'] == 0){
                if(i == 56){
                    $scope.enviocategoria =  $scope.categories.msg[i]['cat_id'];
                    $scope.dataLoading = true;
                        $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria +'&page='+ 1).then(function successCallback(response) {    
                            $scope.dataLoading = true;
                            $scope.AllproductsOff = response.data;
                            var miArray2otro = [];
                            for(var i=1 ; i <= $scope.AllproductsOff.msg.total_pages; i++){
                                    $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria  +'&page='+ i).then(function successCallback(response) {
                                        $scope.AllproductsOtro = response.data;
                                        $scope.ResultadoOtro = $scope.AllproductsOtro.msg['page_result'];
                                        var ProductsSendphpOtro = 'myData='+JSON.stringify($scope.ResultadoOtro);
                                        $http({
                                            method : 'POST',
                                            url : rute+'chinabrands/GetProductCollention.php',
                                            data: ProductsSendphpOtro,
                                            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                                        }).success(function(response){
                                            $scope.productsotro = response;
                                            for (var i in $scope.productsotro.msg) {
                                                if( $scope.productsotro.msg[i]['status'] == 1 ){
                                                    if(($scope.productsotro.msg[i]['warehouse_list']['YB'] || $scope.productsotro.msg[i]['warehouse_list']['ZQ01'] || $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01'] || $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] || $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] || $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] || $scope.productsotro.msg[i]['warehouse_list']['USZYCB']   )   ){
                                                        if( $scope.productsotro.msg[i]['warehouse_list']['YB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['USZYCB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }
                                                    }    
                                                }
                                            }    
                                            if(miArray2otro.length >= '1'){
                                                $scope.dataProductsotro = miArray2otro;
                                                $scope.dataLoading = true;
                                            }else if(miArray2otro.length = '0'){
                                                console.log('This subcategory currently does not have products. Please check back for updates.');
                                            }
                                        }).error(function(error){
                                            $scope.dataLoading = true;
                                            console.log(error); 
                                        });
                                    }, function errorCallback(response) {
                                        console.log("error 505");    
                                    });
                            }  
                            $timeout(function(){
                                $scope.dataLoading = true;
                                //para eliminar y registrar
                                $http.get(rute+'api/?a=eliminarParaSicronizar&cat='+ $scope.enviocategoria ).then(function(response){
                                    console.log('all deleted');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                }, function errorCallback(response) {
                                    console.log('datos no eliminados');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                console.log('',dataSaveProductsPHP);
                                                
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                });
                                //end elimina y registra
                            }, 1000 * 60 * 4);
                            //}, 1000 * 60 * 10); 
                        }, function errorCallback(response) {
                            console.log("error 505");    
                        });
                }  
                //end category 0
            } 
        } 
    });
}]);


empleadoControllers.controller('SyncupController7', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    categories.list(function(categories) {
        $scope.categories = categories;  
        for(var i in $scope.categories.msg){
            if($scope.categories.msg[i]['parent_id'] == 0){
                if(i == 100){
                    $scope.enviocategoria =  $scope.categories.msg[i]['cat_id'];
                    $scope.dataLoading = true;
                        $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria +'&page='+ 1).then(function successCallback(response) {    
                            $scope.dataLoading = true;
                            $scope.AllproductsOff = response.data;
                            var miArray2otro = [];
                            for(var i=1 ; i <= $scope.AllproductsOff.msg.total_pages; i++){
                                    $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria  +'&page='+ i).then(function successCallback(response) {
                                        $scope.AllproductsOtro = response.data;
                                        $scope.ResultadoOtro = $scope.AllproductsOtro.msg['page_result'];
                                        var ProductsSendphpOtro = 'myData='+JSON.stringify($scope.ResultadoOtro);
                                        $http({
                                            method : 'POST',
                                            url : rute+'chinabrands/GetProductCollention.php',
                                            data: ProductsSendphpOtro,
                                            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                                        }).success(function(response){
                                            $scope.productsotro = response;
                                            for (var i in $scope.productsotro.msg) {
                                                if( $scope.productsotro.msg[i]['status'] == 1 ){
                                                    if(($scope.productsotro.msg[i]['warehouse_list']['YB'] || $scope.productsotro.msg[i]['warehouse_list']['ZQ01'] || $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01'] || $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] || $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] || $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] || $scope.productsotro.msg[i]['warehouse_list']['USZYCB']   )   ){
                                                        if( $scope.productsotro.msg[i]['warehouse_list']['YB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['USZYCB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }
                                                    }    
                                                }
                                            }    
                                            if(miArray2otro.length >= '1'){
                                                $scope.dataProductsotro = miArray2otro;
                                                $scope.dataLoading = true;
                                            }else if(miArray2otro.length = '0'){
                                                console.log('This subcategory currently does not have products. Please check back for updates.');
                                            }
                                        }).error(function(error){
                                            $scope.dataLoading = true;
                                            console.log(error); 
                                        });
                                    }, function errorCallback(response) {
                                        console.log("error 505");    
                                    });
                            }  
                            $timeout(function(){
                                $scope.dataLoading = true;
                                //para eliminar y registrar
                                $http.get(rute+'api/?a=eliminarParaSicronizar&cat='+ $scope.enviocategoria ).then(function(response){
                                    console.log('all deleted');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                }, function errorCallback(response) {
                                    console.log('datos no eliminados');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                console.log('',dataSaveProductsPHP);
                                                
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                });
                                //end elimina y registra
                            }, 1000 * 60 * 2);
                            //}, 1000 * 60 * 10); 
                        }, function errorCallback(response) {
                            console.log("error 505");    
                        });
                }  
                //end category 0
            } 
        } 
    });
}]);



empleadoControllers.controller('SyncupController8', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    categories.list(function(categories) {
        $scope.categories = categories;  
        for(var i in $scope.categories.msg){
            if($scope.categories.msg[i]['parent_id'] == 0){
                if(i == 160){
                    $scope.enviocategoria =  $scope.categories.msg[i]['cat_id'];
                    $scope.dataLoading = true;
                        $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria +'&page='+ 1).then(function successCallback(response) {    
                            $scope.dataLoading = true;
                            $scope.AllproductsOff = response.data;
                            var miArray2otro = [];
                            for(var i=1 ; i <= $scope.AllproductsOff.msg.total_pages; i++){
                                    $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria  +'&page='+ i).then(function successCallback(response) {
                                        $scope.AllproductsOtro = response.data;
                                        $scope.ResultadoOtro = $scope.AllproductsOtro.msg['page_result'];
                                        var ProductsSendphpOtro = 'myData='+JSON.stringify($scope.ResultadoOtro);
                                        $http({
                                            method : 'POST',
                                            url : rute+'chinabrands/GetProductCollention.php',
                                            data: ProductsSendphpOtro,
                                            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                                        }).success(function(response){
                                            $scope.productsotro = response;
                                            for (var i in $scope.productsotro.msg) {
                                                if( $scope.productsotro.msg[i]['status'] == 1 ){
                                                    if(($scope.productsotro.msg[i]['warehouse_list']['YB'] || $scope.productsotro.msg[i]['warehouse_list']['ZQ01'] || $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01'] || $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] || $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] || $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] || $scope.productsotro.msg[i]['warehouse_list']['USZYCB']   )   ){
                                                        if( $scope.productsotro.msg[i]['warehouse_list']['YB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['USZYCB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }
                                                    }    
                                                }
                                            }    
                                            if(miArray2otro.length >= '1'){
                                                $scope.dataProductsotro = miArray2otro;
                                                $scope.dataLoading = true;
                                            }else if(miArray2otro.length = '0'){
                                                console.log('This subcategory currently does not have products. Please check back for updates.');
                                            }
                                        }).error(function(error){
                                            $scope.dataLoading = true;
                                            console.log(error); 
                                        });
                                    }, function errorCallback(response) {
                                        console.log("error 505");    
                                    });
                            }  
                            $timeout(function(){
                                $scope.dataLoading = true;
                                //para eliminar y registrar
                                $http.get(rute+'api/?a=eliminarParaSicronizar&cat='+ $scope.enviocategoria ).then(function(response){
                                    console.log('all deleted');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                }, function errorCallback(response) {
                                    console.log('datos no eliminados');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                console.log('',dataSaveProductsPHP);
                                                
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                });
                                //end elimina y registra
                            }, 1000 * 60 * 3);
                            //}, 1000 * 60 * 10); 
                        }, function errorCallback(response) {
                            console.log("error 505");    
                        });
                }  
                //end category 0
            } 
        } 
    });
}]);


empleadoControllers.controller('SyncupController9', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    categories.list(function(categories) {
        $scope.categories = categories;  
        for(var i in $scope.categories.msg){
            if($scope.categories.msg[i]['parent_id'] == 0){
                if(i == 161){
                    $scope.enviocategoria =  $scope.categories.msg[i]['cat_id'];
                    $scope.dataLoading = true;
                        $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria +'&page='+ 1).then(function successCallback(response) {    
                            $scope.dataLoading = true;
                            $scope.AllproductsOff = response.data;
                            var miArray2otro = [];
                            for(var i=1 ; i <= $scope.AllproductsOff.msg.total_pages; i++){
                                    $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria  +'&page='+ i).then(function successCallback(response) {
                                        $scope.AllproductsOtro = response.data;
                                        $scope.ResultadoOtro = $scope.AllproductsOtro.msg['page_result'];
                                        var ProductsSendphpOtro = 'myData='+JSON.stringify($scope.ResultadoOtro);
                                        $http({
                                            method : 'POST',
                                            url : rute+'chinabrands/GetProductCollention.php',
                                            data: ProductsSendphpOtro,
                                            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                                        }).success(function(response){
                                            $scope.productsotro = response;
                                            for (var i in $scope.productsotro.msg) {
                                                if( $scope.productsotro.msg[i]['status'] == 1 ){
                                                    if(($scope.productsotro.msg[i]['warehouse_list']['YB'] || $scope.productsotro.msg[i]['warehouse_list']['ZQ01'] || $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01'] || $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] || $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] || $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] || $scope.productsotro.msg[i]['warehouse_list']['USZYCB']   )   ){
                                                        if( $scope.productsotro.msg[i]['warehouse_list']['YB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['USZYCB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }
                                                    }    
                                                }
                                            }    
                                            if(miArray2otro.length >= '1'){
                                                $scope.dataProductsotro = miArray2otro;
                                                $scope.dataLoading = true;
                                            }else if(miArray2otro.length = '0'){
                                                console.log('This subcategory currently does not have products. Please check back for updates.');
                                            }
                                        }).error(function(error){
                                            $scope.dataLoading = true;
                                            console.log(error); 
                                        });
                                    }, function errorCallback(response) {
                                        console.log("error 505");    
                                    });
                            }  
                            $timeout(function(){
                                $scope.dataLoading = true;
                                //para eliminar y registrar
                                $http.get(rute+'api/?a=eliminarParaSicronizar&cat='+ $scope.enviocategoria ).then(function(response){
                                    console.log('all deleted');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                }, function errorCallback(response) {
                                    console.log('datos no eliminados');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                console.log('',dataSaveProductsPHP);
                                                
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                });
                                //end elimina y registra
                            }, 1000 * 60 * 4);
                            //}, 1000 * 60 * 10); 
                        }, function errorCallback(response) {
                            console.log("error 505");    
                        });
                }  
                //end category 0
            } 
        } 
    });
}]);


empleadoControllers.controller('SyncupController10', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    categories.list(function(categories) {
        $scope.categories = categories;  
        for(var i in $scope.categories.msg){
            if($scope.categories.msg[i]['parent_id'] == 0){
                if(i == 163){
                    $scope.enviocategoria =  $scope.categories.msg[i]['cat_id'];
                    $scope.dataLoading = true;
                        $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria +'&page='+ 1).then(function successCallback(response) {    
                            $scope.dataLoading = true;
                            $scope.AllproductsOff = response.data;
                            var miArray2otro = [];
                            for(var i=1 ; i <= $scope.AllproductsOff.msg.total_pages; i++){
                                    $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria  +'&page='+ i).then(function successCallback(response) {
                                        $scope.AllproductsOtro = response.data;
                                        $scope.ResultadoOtro = $scope.AllproductsOtro.msg['page_result'];
                                        var ProductsSendphpOtro = 'myData='+JSON.stringify($scope.ResultadoOtro);
                                        $http({
                                            method : 'POST',
                                            url : rute+'chinabrands/GetProductCollention.php',
                                            data: ProductsSendphpOtro,
                                            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                                        }).success(function(response){
                                            $scope.productsotro = response;
                                            for (var i in $scope.productsotro.msg) {
                                                if( $scope.productsotro.msg[i]['status'] == 1 ){
                                                    if(($scope.productsotro.msg[i]['warehouse_list']['YB'] || $scope.productsotro.msg[i]['warehouse_list']['ZQ01'] || $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01'] || $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] || $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] || $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] || $scope.productsotro.msg[i]['warehouse_list']['USZYCB']   )   ){
                                                        if( $scope.productsotro.msg[i]['warehouse_list']['YB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['USZYCB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }
                                                    }    
                                                }
                                            }    
                                            if(miArray2otro.length >= '1'){
                                                $scope.dataProductsotro = miArray2otro;
                                                $scope.dataLoading = true;
                                            }else if(miArray2otro.length = '0'){
                                                console.log('This subcategory currently does not have products. Please check back for updates.');
                                            }
                                        }).error(function(error){
                                            $scope.dataLoading = true;
                                            console.log(error); 
                                        });
                                    }, function errorCallback(response) {
                                        console.log("error 505");    
                                    });
                            }  
                            $timeout(function(){
                                $scope.dataLoading = true;
                                //para eliminar y registrar
                                $http.get(rute+'api/?a=eliminarParaSicronizar&cat='+ $scope.enviocategoria ).then(function(response){
                                    console.log('all deleted');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                }, function errorCallback(response) {
                                    console.log('datos no eliminados');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                console.log('',dataSaveProductsPHP);
                                                
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                });
                                //end elimina y registra
                            }, 1000 * 60 * 3);
                            //}, 1000 * 60 * 10); 
                        }, function errorCallback(response) {
                            console.log("error 505");    
                        });
                }  
                //end category 0
            } 
        } 
    });
}]);


empleadoControllers.controller('SyncupController11', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    categories.list(function(categories) {
        $scope.categories = categories;  
        for(var i in $scope.categories.msg){
            if($scope.categories.msg[i]['parent_id'] == 0){
                if(i == 299){
                    $scope.enviocategoria =  $scope.categories.msg[i]['cat_id'];
                    $scope.dataLoading = true;
                        $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria +'&page='+ 1).then(function successCallback(response) {    
                            $scope.dataLoading = true;
                            $scope.AllproductsOff = response.data;
                            var miArray2otro = [];
                            for(var i=1 ; i <= $scope.AllproductsOff.msg.total_pages; i++){
                                    $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria  +'&page='+ i).then(function successCallback(response) {
                                        $scope.AllproductsOtro = response.data;
                                        $scope.ResultadoOtro = $scope.AllproductsOtro.msg['page_result'];
                                        var ProductsSendphpOtro = 'myData='+JSON.stringify($scope.ResultadoOtro);
                                        $http({
                                            method : 'POST',
                                            url : rute+'chinabrands/GetProductCollention.php',
                                            data: ProductsSendphpOtro,
                                            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                                        }).success(function(response){
                                            $scope.productsotro = response;
                                            for (var i in $scope.productsotro.msg) {
                                                if( $scope.productsotro.msg[i]['status'] == 1 ){
                                                    if(($scope.productsotro.msg[i]['warehouse_list']['YB'] || $scope.productsotro.msg[i]['warehouse_list']['ZQ01'] || $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01'] || $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] || $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] || $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] || $scope.productsotro.msg[i]['warehouse_list']['USZYCB']   )   ){
                                                        if( $scope.productsotro.msg[i]['warehouse_list']['YB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['USZYCB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }
                                                    }    
                                                }
                                            }    
                                            if(miArray2otro.length >= '1'){
                                                $scope.dataProductsotro = miArray2otro;
                                                $scope.dataLoading = true;
                                            }else if(miArray2otro.length = '0'){
                                                console.log('This subcategory currently does not have products. Please check back for updates.');
                                            }
                                        }).error(function(error){
                                            $scope.dataLoading = true;
                                            console.log(error); 
                                        });
                                    }, function errorCallback(response) {
                                        console.log("error 505");    
                                    });
                            }  
                            $timeout(function(){
                                $scope.dataLoading = true;
                                //para eliminar y registrar
                                $http.get(rute+'api/?a=eliminarParaSicronizar&cat='+ $scope.enviocategoria ).then(function(response){
                                    console.log('all deleted');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                }, function errorCallback(response) {
                                    console.log('datos no eliminados');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                console.log('',dataSaveProductsPHP);
                                                
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                });
                                //end elimina y registra
                            }, 1000 * 60 * 4);
                            //}, 1000 * 60 * 10); 
                        }, function errorCallback(response) {
                            console.log("error 505");    
                        });
                }  
                //end category 0
            } 
        } 
    });
}]);


empleadoControllers.controller('SyncupController12', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    categories.list(function(categories) {
        $scope.categories = categories;  
        for(var i in $scope.categories.msg){
            if($scope.categories.msg[i]['parent_id'] == 0){
                if(i == 302){
                    $scope.enviocategoria =  $scope.categories.msg[i]['cat_id'];
                    $scope.dataLoading = true;
                        $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria +'&page='+ 1).then(function successCallback(response) {    
                            $scope.dataLoading = true;
                            $scope.AllproductsOff = response.data;
                            var miArray2otro = [];
                            for(var i=1 ; i <= $scope.AllproductsOff.msg.total_pages; i++){
                                    $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria  +'&page='+ i).then(function successCallback(response) {
                                        $scope.AllproductsOtro = response.data;
                                        $scope.ResultadoOtro = $scope.AllproductsOtro.msg['page_result'];
                                        var ProductsSendphpOtro = 'myData='+JSON.stringify($scope.ResultadoOtro);
                                        $http({
                                            method : 'POST',
                                            url : rute+'chinabrands/GetProductCollention.php',
                                            data: ProductsSendphpOtro,
                                            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                                        }).success(function(response){
                                            $scope.productsotro = response;
                                            for (var i in $scope.productsotro.msg) {
                                                if( $scope.productsotro.msg[i]['status'] == 1 ){
                                                    if(($scope.productsotro.msg[i]['warehouse_list']['YB'] || $scope.productsotro.msg[i]['warehouse_list']['ZQ01'] || $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01'] || $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] || $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] || $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] || $scope.productsotro.msg[i]['warehouse_list']['USZYCB']   )   ){
                                                        if( $scope.productsotro.msg[i]['warehouse_list']['YB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['USZYCB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }
                                                    }    
                                                }
                                            }    
                                            if(miArray2otro.length >= '1'){
                                                $scope.dataProductsotro = miArray2otro;
                                                $scope.dataLoading = true;
                                            }else if(miArray2otro.length = '0'){
                                                console.log('This subcategory currently does not have products. Please check back for updates.');
                                            }
                                        }).error(function(error){
                                            $scope.dataLoading = true;
                                            console.log(error); 
                                        });
                                    }, function errorCallback(response) {
                                        console.log("error 505");    
                                    });
                            }  
                            $timeout(function(){
                                $scope.dataLoading = true;
                                //para eliminar y registrar
                                $http.get(rute+'api/?a=eliminarParaSicronizar&cat='+ $scope.enviocategoria ).then(function(response){
                                    console.log('all deleted');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                }, function errorCallback(response) {
                                    console.log('datos no eliminados');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                console.log('',dataSaveProductsPHP);
                                                
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                });
                                //end elimina y registra
                            }, 1000 * 60 * 4);
                            //}, 1000 * 60 * 10); 
                        }, function errorCallback(response) {
                            console.log("error 505");    
                        });
                }  
                //end category 0
            } 
        } 
    });
}]);



empleadoControllers.controller('SyncupController13', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    categories.list(function(categories) {
        $scope.categories = categories;  
        for(var i in $scope.categories.msg){
            if($scope.categories.msg[i]['parent_id'] == 0){
                if(i == 317){
                    $scope.enviocategoria =  $scope.categories.msg[i]['cat_id'];
                    $scope.dataLoading = true;
                        $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria +'&page='+ 1).then(function successCallback(response) {    
                            $scope.dataLoading = true;
                            $scope.AllproductsOff = response.data;
                            var miArray2otro = [];
                            for(var i=1 ; i <= $scope.AllproductsOff.msg.total_pages; i++){
                                    $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria  +'&page='+ i).then(function successCallback(response) {
                                        $scope.AllproductsOtro = response.data;
                                        $scope.ResultadoOtro = $scope.AllproductsOtro.msg['page_result'];
                                        var ProductsSendphpOtro = 'myData='+JSON.stringify($scope.ResultadoOtro);
                                        $http({
                                            method : 'POST',
                                            url : rute+'chinabrands/GetProductCollention.php',
                                            data: ProductsSendphpOtro,
                                            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                                        }).success(function(response){
                                            $scope.productsotro = response;
                                            for (var i in $scope.productsotro.msg) {
                                                if( $scope.productsotro.msg[i]['status'] == 1 ){
                                                    if(($scope.productsotro.msg[i]['warehouse_list']['YB'] || $scope.productsotro.msg[i]['warehouse_list']['ZQ01'] || $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01'] || $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] || $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] || $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] || $scope.productsotro.msg[i]['warehouse_list']['USZYCB']   )   ){
                                                        if( $scope.productsotro.msg[i]['warehouse_list']['YB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['USZYCB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }
                                                    }    
                                                }
                                            }    
                                            if(miArray2otro.length >= '1'){
                                                $scope.dataProductsotro = miArray2otro;
                                                $scope.dataLoading = true;
                                            }else if(miArray2otro.length = '0'){
                                                console.log('This subcategory currently does not have products. Please check back for updates.');
                                            }
                                        }).error(function(error){
                                            $scope.dataLoading = true;
                                            console.log(error); 
                                        });
                                    }, function errorCallback(response) {
                                        console.log("error 505");    
                                    });
                            }  
                            $timeout(function(){
                                $scope.dataLoading = true;
                                //para eliminar y registrar
                                $http.get(rute+'api/?a=eliminarParaSicronizar&cat='+ $scope.enviocategoria ).then(function(response){
                                    console.log('all deleted');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                }, function errorCallback(response) {
                                    console.log('datos no eliminados');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                console.log('',dataSaveProductsPHP);
                                                
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                });
                                //end elimina y registra
                            }, 1000 * 60 * 6);
                            //}, 1000 * 60 * 10); 
                        }, function errorCallback(response) {
                            console.log("error 505");    
                        });
                }  
                //end category 0
            } 
        } 
    });
}]);



empleadoControllers.controller('SyncupController14', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    categories.list(function(categories) {
        $scope.categories = categories;  
        for(var i in $scope.categories.msg){
            if($scope.categories.msg[i]['parent_id'] == 0){
                if(i == 451){
                    $scope.enviocategoria =  $scope.categories.msg[i]['cat_id'];
                    $scope.dataLoading = true;
                        $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria +'&page='+ 1).then(function successCallback(response) {    
                            $scope.dataLoading = true;
                            $scope.AllproductsOff = response.data;
                            var miArray2otro = [];
                            for(var i=1 ; i <= $scope.AllproductsOff.msg.total_pages; i++){
                                    $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria  +'&page='+ i).then(function successCallback(response) {
                                        $scope.AllproductsOtro = response.data;
                                        $scope.ResultadoOtro = $scope.AllproductsOtro.msg['page_result'];
                                        var ProductsSendphpOtro = 'myData='+JSON.stringify($scope.ResultadoOtro);
                                        $http({
                                            method : 'POST',
                                            url : rute+'chinabrands/GetProductCollention.php',
                                            data: ProductsSendphpOtro,
                                            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                                        }).success(function(response){
                                            $scope.productsotro = response;
                                            for (var i in $scope.productsotro.msg) {
                                                if( $scope.productsotro.msg[i]['status'] == 1 ){
                                                    if(($scope.productsotro.msg[i]['warehouse_list']['YB'] || $scope.productsotro.msg[i]['warehouse_list']['ZQ01'] || $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01'] || $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] || $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] || $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] || $scope.productsotro.msg[i]['warehouse_list']['USZYCB']   )   ){
                                                        if( $scope.productsotro.msg[i]['warehouse_list']['YB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['USZYCB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }
                                                    }    
                                                }
                                            }    
                                            if(miArray2otro.length >= '1'){
                                                $scope.dataProductsotro = miArray2otro;
                                                $scope.dataLoading = true;
                                            }else if(miArray2otro.length = '0'){
                                                console.log('This subcategory currently does not have products. Please check back for updates.');
                                            }
                                        }).error(function(error){
                                            $scope.dataLoading = true;
                                            console.log(error); 
                                        });
                                    }, function errorCallback(response) {
                                        console.log("error 505");    
                                    });
                            }  
                            $timeout(function(){
                                $scope.dataLoading = true;
                                //para eliminar y registrar
                                $http.get(rute+'api/?a=eliminarParaSicronizar&cat='+ $scope.enviocategoria ).then(function(response){
                                    console.log('all deleted');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                }, function errorCallback(response) {
                                    console.log('datos no eliminados');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                console.log('',dataSaveProductsPHP);
                                                
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                });
                                //end elimina y registra
                            }, 1000 * 60 * 4);
                            //}, 1000 * 60 * 10); 
                        }, function errorCallback(response) {
                            console.log("error 505");    
                        });
                }  
                //end category 0
            } 
        } 
    });
}]);



empleadoControllers.controller('SyncupController15', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    categories.list(function(categories) {
        $scope.categories = categories;  
        for(var i in $scope.categories.msg){
            if($scope.categories.msg[i]['parent_id'] == 0){
                if(i == 662){
                    $scope.enviocategoria =  $scope.categories.msg[i]['cat_id'];
                    $scope.dataLoading = true;
                        $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria +'&page='+ 1).then(function successCallback(response) {    
                            $scope.dataLoading = true;
                            $scope.AllproductsOff = response.data;
                            var miArray2otro = [];
                            for(var i=1 ; i <= $scope.AllproductsOff.msg.total_pages; i++){
                                    $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria  +'&page='+ i).then(function successCallback(response) {
                                        $scope.AllproductsOtro = response.data;
                                        $scope.ResultadoOtro = $scope.AllproductsOtro.msg['page_result'];
                                        var ProductsSendphpOtro = 'myData='+JSON.stringify($scope.ResultadoOtro);
                                        $http({
                                            method : 'POST',
                                            url : rute+'chinabrands/GetProductCollention.php',
                                            data: ProductsSendphpOtro,
                                            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                                        }).success(function(response){
                                            $scope.productsotro = response;
                                            for (var i in $scope.productsotro.msg) {
                                                if( $scope.productsotro.msg[i]['status'] == 1 ){
                                                    if(($scope.productsotro.msg[i]['warehouse_list']['YB'] || $scope.productsotro.msg[i]['warehouse_list']['ZQ01'] || $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01'] || $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] || $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] || $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] || $scope.productsotro.msg[i]['warehouse_list']['USZYCB']   )   ){
                                                        if( $scope.productsotro.msg[i]['warehouse_list']['YB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['USZYCB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }
                                                    }    
                                                }
                                            }    
                                            if(miArray2otro.length >= '1'){
                                                $scope.dataProductsotro = miArray2otro;
                                                $scope.dataLoading = true;
                                            }else if(miArray2otro.length = '0'){
                                                console.log('This subcategory currently does not have products. Please check back for updates.');
                                            }
                                        }).error(function(error){
                                            $scope.dataLoading = true;
                                            console.log(error); 
                                        });
                                    }, function errorCallback(response) {
                                        console.log("error 505");    
                                    });
                            }  
                            $timeout(function(){
                                $scope.dataLoading = true;
                                //para eliminar y registrar
                                $http.get(rute+'api/?a=eliminarParaSicronizar&cat='+ $scope.enviocategoria ).then(function(response){
                                    console.log('all deleted');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                }, function errorCallback(response) {
                                    console.log('datos no eliminados');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                console.log('',dataSaveProductsPHP);
                                                
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                });
                                //end elimina y registra
                            }, 1000 * 60 * 5);
                            //}, 1000 * 60 * 10); 
                        }, function errorCallback(response) {
                            console.log("error 505");    
                        });
                }  
                //end category 0
            } 
        } 
    });
}]);


empleadoControllers.controller('SyncupController16', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    categories.list(function(categories) {
        $scope.categories = categories;  
        for(var i in $scope.categories.msg){
            if($scope.categories.msg[i]['parent_id'] == 0){
                if(i == 726){
                    $scope.enviocategoria =  $scope.categories.msg[i]['cat_id'];
                    $scope.dataLoading = true;
                        $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria +'&page='+ 1).then(function successCallback(response) {    
                            $scope.dataLoading = true;
                            $scope.AllproductsOff = response.data;
                            var miArray2otro = [];
                            for(var i=1 ; i <= $scope.AllproductsOff.msg.total_pages; i++){
                                    $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria  +'&page='+ i).then(function successCallback(response) {
                                        $scope.AllproductsOtro = response.data;
                                        $scope.ResultadoOtro = $scope.AllproductsOtro.msg['page_result'];
                                        var ProductsSendphpOtro = 'myData='+JSON.stringify($scope.ResultadoOtro);
                                        $http({
                                            method : 'POST',
                                            url : rute+'chinabrands/GetProductCollention.php',
                                            data: ProductsSendphpOtro,
                                            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                                        }).success(function(response){
                                            $scope.productsotro = response;
                                            for (var i in $scope.productsotro.msg) {
                                                if( $scope.productsotro.msg[i]['status'] == 1 ){
                                                    if(($scope.productsotro.msg[i]['warehouse_list']['YB'] || $scope.productsotro.msg[i]['warehouse_list']['ZQ01'] || $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01'] || $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] || $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] || $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] || $scope.productsotro.msg[i]['warehouse_list']['USZYCB']   )   ){
                                                        if( $scope.productsotro.msg[i]['warehouse_list']['YB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['USZYCB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }
                                                    }    
                                                }
                                            }    
                                            if(miArray2otro.length >= '1'){
                                                $scope.dataProductsotro = miArray2otro;
                                                $scope.dataLoading = true;
                                            }else if(miArray2otro.length = '0'){
                                                console.log('This subcategory currently does not have products. Please check back for updates.');
                                            }
                                        }).error(function(error){
                                            $scope.dataLoading = true;
                                            console.log(error); 
                                        });
                                    }, function errorCallback(response) {
                                        console.log("error 505");    
                                    });
                            }  
                            $timeout(function(){
                                $scope.dataLoading = true;
                                //para eliminar y registrar
                                $http.get(rute+'api/?a=eliminarParaSicronizar&cat='+ $scope.enviocategoria ).then(function(response){
                                    console.log('all deleted');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                }, function errorCallback(response) {
                                    console.log('datos no eliminados');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                console.log('',dataSaveProductsPHP);
                                                
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                });
                                //end elimina y registra
                            }, 1000 * 60 * 3);
                            //}, 1000 * 60 * 10); 
                        }, function errorCallback(response) {
                            console.log("error 505");    
                        });
                }  
                //end category 0
            } 
        } 
    });
}]);



empleadoControllers.controller('SyncupController17', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    categories.list(function(categories) {
        $scope.categories = categories;  
        for(var i in $scope.categories.msg){
            if($scope.categories.msg[i]['parent_id'] == 0){
                if(i == 1392){
                    $scope.enviocategoria =  $scope.categories.msg[i]['cat_id'];
                    $scope.dataLoading = true;
                        $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria +'&page='+ 1).then(function successCallback(response) {    
                            $scope.dataLoading = true;
                            $scope.AllproductsOff = response.data;
                            var miArray2otro = [];
                            for(var i=1 ; i <= $scope.AllproductsOff.msg.total_pages; i++){
                                    $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria  +'&page='+ i).then(function successCallback(response) {
                                        $scope.AllproductsOtro = response.data;
                                        $scope.ResultadoOtro = $scope.AllproductsOtro.msg['page_result'];
                                        var ProductsSendphpOtro = 'myData='+JSON.stringify($scope.ResultadoOtro);
                                        $http({
                                            method : 'POST',
                                            url : rute+'chinabrands/GetProductCollention.php',
                                            data: ProductsSendphpOtro,
                                            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                                        }).success(function(response){
                                            $scope.productsotro = response;
                                            for (var i in $scope.productsotro.msg) {
                                                if( $scope.productsotro.msg[i]['status'] == 1 ){
                                                    if(($scope.productsotro.msg[i]['warehouse_list']['YB'] || $scope.productsotro.msg[i]['warehouse_list']['ZQ01'] || $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01'] || $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] || $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] || $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] || $scope.productsotro.msg[i]['warehouse_list']['USZYCB']   )   ){
                                                        if( $scope.productsotro.msg[i]['warehouse_list']['YB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['USZYCB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }
                                                    }    
                                                }
                                            }    
                                            if(miArray2otro.length >= '1'){
                                                $scope.dataProductsotro = miArray2otro;
                                                $scope.dataLoading = true;
                                            }else if(miArray2otro.length = '0'){
                                                console.log('This subcategory currently does not have products. Please check back for updates.');
                                            }
                                        }).error(function(error){
                                            $scope.dataLoading = true;
                                            console.log(error); 
                                        });
                                    }, function errorCallback(response) {
                                        console.log("error 505");    
                                    });
                            }  
                            $timeout(function(){
                                $scope.dataLoading = true;
                                //para eliminar y registrar
                                $http.get(rute+'api/?a=eliminarParaSicronizar&cat='+ $scope.enviocategoria ).then(function(response){
                                    console.log('all deleted');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                }, function errorCallback(response) {
                                    console.log('datos no eliminados');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                console.log('',dataSaveProductsPHP);
                                                
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                });
                                //end elimina y registra
                            }, 1000 * 60 * 2);
                            //}, 1000 * 60 * 10); 
                        }, function errorCallback(response) {
                            console.log("error 505");    
                        });
                }  
                //end category 0
            } 
        } 
    });
}]);



empleadoControllers.controller('SyncupController18', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    categories.list(function(categories) {
        $scope.categories = categories;  
        for(var i in $scope.categories.msg){
            if($scope.categories.msg[i]['parent_id'] == 0){
                if(i == 1489){
                    $scope.enviocategoria =  $scope.categories.msg[i]['cat_id'];
                    $scope.dataLoading = true;
                        $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria +'&page='+ 1).then(function successCallback(response) {    
                            $scope.dataLoading = true;
                            $scope.AllproductsOff = response.data;
                            var miArray2otro = [];
                            for(var i=1 ; i <= $scope.AllproductsOff.msg.total_pages; i++){
                                    $http.post(rute+'chinabrands/GetSearchInterface2.php?category='+$scope.enviocategoria  +'&page='+ i).then(function successCallback(response) {
                                        $scope.AllproductsOtro = response.data;
                                        $scope.ResultadoOtro = $scope.AllproductsOtro.msg['page_result'];
                                        var ProductsSendphpOtro = 'myData='+JSON.stringify($scope.ResultadoOtro);
                                        $http({
                                            method : 'POST',
                                            url : rute+'chinabrands/GetProductCollention.php',
                                            data: ProductsSendphpOtro,
                                            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                                        }).success(function(response){
                                            $scope.productsotro = response;
                                            for (var i in $scope.productsotro.msg) {
                                                if( $scope.productsotro.msg[i]['status'] == 1 ){
                                                    if(($scope.productsotro.msg[i]['warehouse_list']['YB'] || $scope.productsotro.msg[i]['warehouse_list']['ZQ01'] || $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01'] || $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] || $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] || $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ) || ($scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] || $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] || $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] || $scope.productsotro.msg[i]['warehouse_list']['USZYCB']   )   ){
                                                        if( $scope.productsotro.msg[i]['warehouse_list']['YB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['YB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']  ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['ZQDZ01']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FCYWHQ']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['SZXIAWAN']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['B2BREXIAOWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXLAWH2']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['MXTJWH'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['MXTJWH']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['FXJFKGC']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }else if( $scope.productsotro.msg[i]['warehouse_list']['USZYCB'] ){
                                                            $scope.stockvar = $scope.productsotro.msg[i]['warehouse_list']['USZYCB']['goods_number'];
                                                            if($scope.stockvar > 3){
                                                                var miArrayotro = JSON.parse(JSON.stringify($scope.productsotro.msg[i]));
                                                                miArray2otro.push(miArrayotro);
                                                            }
                                                        }
                                                    }    
                                                }
                                            }    
                                            if(miArray2otro.length >= '1'){
                                                $scope.dataProductsotro = miArray2otro;
                                                $scope.dataLoading = true;
                                            }else if(miArray2otro.length = '0'){
                                                console.log('This subcategory currently does not have products. Please check back for updates.');
                                            }
                                        }).error(function(error){
                                            $scope.dataLoading = true;
                                            console.log(error); 
                                        });
                                    }, function errorCallback(response) {
                                        console.log("error 505");    
                                    });
                            }  
                            $timeout(function(){
                                $scope.dataLoading = true;
                                //para eliminar y registrar
                                $http.get(rute+'api/?a=eliminarParaSicronizar&cat='+ $scope.enviocategoria ).then(function(response){
                                    console.log('all deleted');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                }, function errorCallback(response) {
                                    console.log('datos no eliminados');
                                    $timeout(function(){
                                            for(var i in $scope.dataProductsotro){
                                                var modelsend = {
                                                    Mysku : $scope.dataProductsotro[i]['sku'],
                                                    Mycategory : $scope.enviocategoria ,
                                                    Myencrypted_sku : $scope.dataProductsotro[i]['encrypted_sku'],
                                                    Mytitle : $scope.dataProductsotro[i]['title'],
                                                    Mycolor : $scope.dataProductsotro[i]['color'],
                                                    Myoriginal_img : $scope.dataProductsotro[i]['original_img'][0],
                                                    Mycat_id : $scope.dataProductsotro[i]['cat_id'],
                                                    Myparent_id : $scope.dataProductsotro[i]['parent_id'],
                                                    Mysize : $scope.dataProductsotro[i]['size'],
                                                    Mywarehouse : JSON.stringify($scope.dataProductsotro[i]['warehouse_list']),
                                                }
                                                var dataSaveProductsPHP = JSON.stringify(modelsend);
                                                console.log('',dataSaveProductsPHP);
                                                
                                                $http.post(rute+'api/?a=registrarProductosPHP',dataSaveProductsPHP).then(function successCallback(response) {   
                                                    $scope.dataSKU = response.data;
                                                    $scope.dataLoading = false;
                                                    console.log($scope.dataSKU);
                                                    console.log('logrado');
                                                }, function errorCallback(response) {
                                                    console.log('no logrado');
                                                });   
                                            }
                                    }, 2000);    
                                });
                                //end elimina y registra
                            }, 1000 * 60 * 2);
                            //}, 1000 * 60 * 10); 
                        }, function errorCallback(response) {
                            console.log("error 505");    
                        });
                }  
                //end category 0
            } 
        } 
    });
}]);


empleadoControllers.controller('ProductsController', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams','$location', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams,$location) {
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
    $scope.dataLoading = true;
    $scope.dataLoadingText = true;
    $http.post(rute+'api/?a=listProducts').then(function successCallback(response) {   
        $scope.dataLoading = false;
        $scope.dataLoadingText = false;
        $scope.filtroProducts = [];
        $scope.currentPageProducts = 1;
        $scope.numPerPageProducts = 40; //es 40
        $scope.maxSize = 8;

        

        $scope.hacerPagineoProducts = function (arreglo) {
            //si no retorna ningun valor
            if (!arreglo || !arreglo.length) { return; }
            var principio = (($scope.currentPageProducts - 1) * $scope.numPerPageProducts); //0, 3
            var fin = principio + $scope.numPerPageProducts; //3, 6
            $scope.filtroProducts = arreglo.slice(principio, fin); // 
            console.log('pagineo');
        };

        $scope.buscarProducts = function (busquedaprod) {
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewtitle+prod.Viewsku;
                return (textobusqueda.toLowerCase().indexOf(busquedaprod.toLowerCase()) !== -1); // matches, contains
            });


            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                //ng-if="dataResults" para pagineo no funciona
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);

            $scope.$watch('currentPageProducts',function(){
                $scope.hacerPagineoProducts(buscados);
            });

        };

        $scope.searchtxt = function(busquedaprod){
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewtitle+prod.Viewsku;
                return (textobusqueda.toLowerCase().indexOf(busquedaprod.toLowerCase()) !== -1); // matches, contains
            });
            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);
            $scope.$watch('currentPageProducts',function(){
                $scope.hacerPagineoProducts(buscados);
            });
        }

        $scope.searchshipchina = function(){
            console.log('searchship FOR CHINA');
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewwarehouse.YB+prod.Viewwarehouse.ZQ01+prod.Viewwarehouse.ZQDZ01+prod.Viewwarehouse.FCYWHQ+prod.Viewwarehouse.SZXIAWAN+prod.Viewwarehouse.B2BREXIAOWH;
                return textobusqueda;
            });
            console.log(buscados);
            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);
            $scope.$watch('currentPageProducts',function(){
                $scope.hacerPagineoProducts(buscados);
            });
        }
        $scope.searchshipus = function(){
            console.log('searchship FOR US');
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewwarehouse.FXLAWH+prod.Viewwarehouse.FXLAWH2+prod.Viewwarehouse.MXTJWH+prod.Viewwarehouse.FXJFKGC+prod.Viewwarehouse.USZYCB;
                return textobusqueda;
            });
            console.log(buscados);
            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);
            $scope.$watch('currentPageProducts',function(){
                $scope.hacerPagineoProducts(buscados);
            });
        }
        $scope.searchallp = function(){
            console.log('searchship all');
            location.reload();
        }
        var subcat = [];
        var subsubcat = [];
        categories.list(function(categories) {
            $scope.categories = categories;  
            //console.log($scope.categories);
            $scope.filterCategory = function(cat){
                $location.path('/Results/allProducts/'+cat);
                /*
                subcat = [];
                subsubcat = [];
                $scope.categorieview2 = "";
                for(var c in $scope.categories.msg){
                    if($scope.categories.msg[c]['cat_id'] == cat){
                        $scope.categorieview = $scope.categories.msg[c]['cat_name'];
                        $scope.categorieviewID = $scope.categories.msg[c]['cat_id'];
                    } 
                    if($scope.categories.msg[c]['parent_id'] == cat){
                        $scope.datasubcategory= true;
                        $scope.datasubsubcategory= false;
                        subcat.push($scope.categories.msg[c]);
                        $scope.subcategories1 = subcat;
                    } 
                    if(cat == "allcategories"){
                        location.reload();
                        break;
                    } 
                }
                console.log('search category all');
                var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                    var textobusqueda = prod.Viewcategory;
                    return (textobusqueda.toLowerCase().indexOf(cat.toLowerCase()) !== -1); // matches, contains
                });
                console.log(buscados);
                if(buscados == ''){
                    $scope.dataNoResults = true;
                    $scope.dataResults = false;
                }else{
                    $scope.dataResults = true;
                    $scope.dataNoResults = false;
                    $scope.totalProducts = buscados.length;
                }
                $scope.hacerPagineoProducts(buscados);
*/

            };
            $scope.filtersubCategory = function(cat){
                subsubcat = [];
                console.log('search subcategory all',cat);
                for(var c in $scope.categories.msg){
                    if($scope.categories.msg[c]['cat_id'] == cat){
                        $scope.categorieview2 = $scope.categories.msg[c]['cat_name'];
                        $scope.categorieview2ID = $scope.categories.msg[c]['cat_id'];
                        console.log($scope.categorieview2);
                    } 
                    if($scope.categories.msg[c]['parent_id'] == cat && $scope.categories.msg[c]['level'] == 3 ){
                        console.log($scope.categories.msg[c]);
                        $scope.datasubcategory= false;
                        $scope.datasubsubcategory= true;
                        subsubcat.push($scope.categories.msg[c]);
                        $scope.subcategories2 = subsubcat;
                    } 
                }
                var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                    var textobusqueda = prod.Viewparent_id;
                    return (textobusqueda.toLowerCase().indexOf(cat.toLowerCase()) !== -1); // matches, contains
                });
                console.log(buscados);
                if(buscados == ''){
                    $scope.dataNoResults = true;
                    $scope.dataResults = false;
                }else{
                    $scope.dataResults = true;
                    $scope.dataNoResults = false;
                    $scope.totalProducts = buscados.length;
                }
                $scope.hacerPagineoProducts(buscados);

                $scope.$watch('currentPageProducts',function(){
                    $scope.hacerPagineoProducts(buscados);
                });
                
            };
        });

        $scope.$watch('currentPageProducts',function(){
            $scope.hacerPagineoProducts($scope.ListAllProducts2);
        });


        $scope.ListAllProducts = response.data;
        console.log($scope.ListAllProducts );
        var modelview2=[];
        for(var i in $scope.ListAllProducts){
            var modelview = {
                Viewcategory : $scope.ListAllProducts[i].category,
                Viewsku : $scope.ListAllProducts[i].sku,
                Viewencrypted_sku : $scope.ListAllProducts[i].encrypted_sku,
                Viewtitle : $scope.ListAllProducts[i].title,
                Viewcolor : $scope.ListAllProducts[i].color,
                Vieworiginal_img : $scope.ListAllProducts[i].original_img,
                Viewcat_id : $scope.ListAllProducts[i].cat_id,
                Viewparent_id : $scope.ListAllProducts[i].parent_id,
                Viewsize : $scope.ListAllProducts[i].size,
                Viewwarehouse : JSON.parse($scope.ListAllProducts[i].warehouse),
            };
            modelview2.push(modelview);
        }
        $scope.ListAllProducts2 = modelview2;
        $scope.totalProducts = $scope.ListAllProducts2.length;
        $scope.hacerPagineoProducts($scope.ListAllProducts2);
        console.log('la data nueva',$scope.filtroProducts);
        $scope.dataResults = true;

        for(var i in $scope.filtroProducts ){

            if( $scope.filtroProducts[i]['Viewwarehouse']['YB'] ){
                console.log('pobre',$scope.filtroProducts[i]['Viewwarehouse']['YB']['warehouse'] );
                $scope.sendwarehouseall = $scope.filtroProducts[i]['Viewwarehouse']['YB']['warehouse'] ;
            }
            if( $scope.filtroProducts[i]['Viewwarehouse']['ZQ01']  ){
                $scope.sendwarehouseall = $scope.filtroProducts[i]['Viewwarehouse']['ZQ01']['warehouse'] ;
            }    
            if( $scope.filtroProducts[i]['Viewwarehouse']['ZQDZ01']  ){
                $scope.sendwarehouseall = $scope.filtroProducts[i]['Viewwarehouse']['ZQDZ01']['warehouse'] ;
            }
            if( $scope.filtroProducts[i]['Viewwarehouse']['FCYWHQ'] ){
                $scope.sendwarehouseall = $scope.filtroProducts[i]['Viewwarehouse']['FCYWHQ']['warehouse'] ;
            }
            if( $scope.filtroProducts[i]['Viewwarehouse']['SZXIAWAN'] ){
                $scope.sendwarehouseall = $scope.filtroProducts[i]['Viewwarehouse']['SZXIAWAN']['warehouse'] ;
            }
            if( $scope.filtroProducts[i]['Viewwarehouse']['B2BREXIAOWH'] ){
                $scope.sendwarehouseall = $scope.filtroProducts[i]['Viewwarehouse']['B2BREXIAOWH']['warehouse'] ;
            }
            if( $scope.filtroProducts[i]['Viewwarehouse']['FXLAWH'] ){
                $scope.sendwarehouseall = $scope.filtroProducts[i]['Viewwarehouse']['FXLAWH']['warehouse'] ;
            }
            if( $scope.filtroProducts[i]['Viewwarehouse']['FXLAWH2'] ){
                $scope.sendwarehouseall = $scope.filtroProducts[i]['Viewwarehouse']['FXLAWH2']['warehouse'] ;
            }
            if( $scope.filtroProducts[i]['Viewwarehouse']['MXTJWH'] ){
                $scope.sendwarehouseall = $scope.filtroProducts[i]['Viewwarehouse']['MXTJWH']['warehouse'] ;
            }
            if( $scope.filtroProducts[i]['Viewwarehouse']['FXJFKGC'] ){
                $scope.sendwarehouseall = $scope.filtroProducts[i]['Viewwarehouse']['FXJFKGC']['warehouse'] ;
            }
            if( $scope.filtroProducts[i]['Viewwarehouse']['USZYCB'] ){
                $scope.sendwarehouseall = $scope.filtroProducts[i]['Viewwarehouse']['USZYCB']['warehouse'] ; 
            }

        }


    }, function errorCallback(response) {
        console.log('no logrado');
    });

}]);




empleadoControllers.controller('ProductsControllerCategory', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams','$location', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams,$location) {
    
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
    $scope.dataLoading = true;
    $scope.dataLoadingText = true;




    $http.post(rute+'api/?a=listProductsCat&category='+ $routeParams.category).then(function successCallback(response) {  
        $scope.dataLoading = false;
        $scope.dataLoadingText = false;
        $scope.filtroProducts = [];
        $scope.currentPageProducts = 1;
        $scope.numPerPageProducts = 40; //es 40
        $scope.maxSize = 8;
        $scope.hacerPagineoProducts = function (arreglo) {
            //si no retorna ningun valor
            if (!arreglo || !arreglo.length) { return; }
            var principio = (($scope.currentPageProducts - 1) * $scope.numPerPageProducts); //0, 3
            var fin = principio + $scope.numPerPageProducts; //3, 6
            $scope.filtroProducts = arreglo.slice(principio, fin); // 
            console.log('pagineo');
        };

        $scope.buscarProducts = function (busquedaprod) {
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewtitle+prod.Viewsku;
                return (textobusqueda.toLowerCase().indexOf(busquedaprod.toLowerCase()) !== -1); // matches, contains
            });


            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                //ng-if="dataResults" para pagineo no funciona
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);

            $scope.$watch('currentPageProducts',function(){
                $scope.hacerPagineoProducts(buscados);
            });

        };

        $scope.searchtxt = function(busquedaprod){
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewtitle+prod.Viewsku;
                return (textobusqueda.toLowerCase().indexOf(busquedaprod.toLowerCase()) !== -1); // matches, contains
            });
            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);
            $scope.$watch('currentPageProducts',function(){
                $scope.hacerPagineoProducts(buscados);
            });
        }

        $scope.searchshipchina = function(){
            console.log('searchship FOR CHINA');
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewwarehouse.YB+prod.Viewwarehouse.ZQ01+prod.Viewwarehouse.ZQDZ01+prod.Viewwarehouse.FCYWHQ+prod.Viewwarehouse.SZXIAWAN+prod.Viewwarehouse.B2BREXIAOWH;
                return textobusqueda;
            });
            console.log(buscados);
            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);
            $scope.$watch('currentPageProducts',function(){
                $scope.hacerPagineoProducts(buscados);
            });
        }
        $scope.searchshipus = function(){
            console.log('searchship FOR US');
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewwarehouse.FXLAWH+prod.Viewwarehouse.FXLAWH2+prod.Viewwarehouse.MXTJWH+prod.Viewwarehouse.FXJFKGC+prod.Viewwarehouse.USZYCB;
                return textobusqueda;
            });
            console.log(buscados);
            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);
            $scope.$watch('currentPageProducts',function(){
                $scope.hacerPagineoProducts(buscados);
            });
        }
        $scope.searchallp = function(){
            console.log('searchship all');
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewwarehouse.FXLAWH+prod.Viewwarehouse.FXLAWH2+prod.Viewwarehouse.MXTJWH+prod.Viewwarehouse.FXJFKGC+prod.Viewwarehouse.USZYCB+prod.Viewwarehouse.YB+prod.Viewwarehouse.ZQ01+prod.Viewwarehouse.ZQDZ01+prod.Viewwarehouse.FCYWHQ+prod.Viewwarehouse.SZXIAWAN+prod.Viewwarehouse.B2BREXIAOWH;
                return textobusqueda;
            });
            console.log(buscados);
            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);
        }

        var subcat = [];
        var subsubcat = [];
        categories.list(function(categories) {
            $scope.categories = categories;  



            for(var c in $scope.categories.msg){
                if($scope.categories.msg[c]['cat_id'] == $routeParams.category){
                    $scope.categorieview = $scope.categories.msg[c]['cat_name'];
                    $scope.categorieviewID = $scope.categories.msg[c]['cat_id'];
                } 
                if($scope.categories.msg[c]['parent_id'] == $routeParams.category){
                    $scope.datasubcategory= true;
                    $scope.datasubsubcategory= false;
                    $scope.datasubsubsubcategory = false;
                    subcat.push($scope.categories.msg[c]);
                    $scope.subcategories1 = subcat;
                } 
                if($routeParams.category == "allcategories"){
                    $location.path('/Results/allProducts');
                    break;
                } 
            }




            $scope.filterCategory = function(cat){
                $location.path('/Results/allProducts/'+cat);
/*
                subcat = [];
                subsubcat = [];
                $scope.categorieview2 = "";
                for(var c in $scope.categories.msg){
                    if($scope.categories.msg[c]['cat_id'] == cat){
                        $scope.categorieview = $scope.categories.msg[c]['cat_name'];
                        $scope.categorieviewID = $scope.categories.msg[c]['cat_id'];
                    } 
                    if($scope.categories.msg[c]['parent_id'] == cat){
                        $scope.datasubcategory= true;
                        $scope.datasubsubcategory= false;
                        subcat.push($scope.categories.msg[c]);
                        $scope.subcategories1 = subcat;
                    } 
                    if(cat == "allcategories"){
                        location.reload();
                        break;
                    } 
                }
                console.log('search category all');
                var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                    var textobusqueda = prod.Viewcategory;
                    return (textobusqueda.toLowerCase().indexOf(cat.toLowerCase()) !== -1); // matches, contains
                });
                console.log(buscados);
                if(buscados == ''){
                    $scope.dataNoResults = true;
                    $scope.dataResults = false;
                }else{
                    $scope.dataResults = true;
                    $scope.dataNoResults = false;
                    $scope.totalProducts = buscados.length;
                }
                $scope.hacerPagineoProducts(buscados);
*/

            };
            $scope.filtersubCategory = function(cat){
                subsubcat = [];
                console.log('search subcategory all',cat);
                for(var c in $scope.categories.msg){
                    if($scope.categories.msg[c]['cat_id'] == cat){
                        $scope.categorieview2 = $scope.categories.msg[c]['cat_name'];
                        $scope.categorieview2ID = $scope.categories.msg[c]['cat_id'];
                        console.log($scope.categorieview2);
                    } 
                    if($scope.categories.msg[c]['parent_id'] == cat && $scope.categories.msg[c]['level'] == 3 ){
                        console.log($scope.categories.msg[c]);
                        $scope.datasubcategory= false;
                        $scope.datasubsubcategory= true;
                        $scope.datasubsubsubcategory = false;
                        subsubcat.push($scope.categories.msg[c]);
                        $scope.subcategories2 = subsubcat;
                    } 
                }
                var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                    var textobusqueda = prod.Viewparent_id;
                    return (textobusqueda.toLowerCase().indexOf(cat.toLowerCase()) !== -1); // matches, contains
                });
                console.log(buscados);
                if(buscados == ''){
                    $scope.dataNoResults = true;
                    $scope.dataResults = false;
                }else{
                    $scope.dataResults = true;
                    $scope.dataNoResults = false;
                    $scope.totalProducts = buscados.length;
                }
                $scope.hacerPagineoProducts(buscados);

                $scope.$watch('currentPageProducts',function(){
                    $scope.hacerPagineoProducts(buscados);
                });
                
            };
        });

        $scope.$watch('currentPageProducts',function(){
            $scope.hacerPagineoProducts($scope.ListAllProducts2);
        });


        $scope.ListAllProducts = response.data;
        var modelview2=[];
        for(var i in $scope.ListAllProducts){
            var modelview = {
                Viewcategory : $scope.ListAllProducts[i].category,
                Viewsku : $scope.ListAllProducts[i].sku,
                Viewencrypted_sku : $scope.ListAllProducts[i].encrypted_sku,
                Viewtitle : $scope.ListAllProducts[i].title,
                Viewcolor : $scope.ListAllProducts[i].color,
                Vieworiginal_img : $scope.ListAllProducts[i].original_img,
                Viewcat_id : $scope.ListAllProducts[i].cat_id,
                Viewparent_id : $scope.ListAllProducts[i].parent_id,
                Viewsize : $scope.ListAllProducts[i].size,
                Viewwarehouse : JSON.parse($scope.ListAllProducts[i].warehouse),
            };
            modelview2.push(modelview);
        }
        $scope.ListAllProducts2 = modelview2;
        $scope.totalProducts = $scope.ListAllProducts2.length;
        $scope.hacerPagineoProducts($scope.ListAllProducts2);
        console.log('la data nueva',$scope.filtroProducts);
        $scope.dataResults = true;
    }, function errorCallback(response) {
        console.log('no logrado');
    });



}]);



empleadoControllers.controller('ProductsControllersubCategory', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams','$location', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams,$location) {
    
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
    $scope.dataLoading = true;
    $scope.dataLoadingText = true;


    $http.post(rute+'api/?a=listProductssubCat&category='+ $routeParams.category+'&subcategory='+ $routeParams.subcategory).then(function successCallback(response) {  
  
        $scope.dataLoading = false;
        $scope.dataLoadingText = false;
        $scope.filtroProducts = [];
        $scope.currentPageProducts = 1;
        $scope.numPerPageProducts = 40; //es 40
        $scope.maxSize = 8;
        $scope.hacerPagineoProducts = function (arreglo) {
            //si no retorna ningun valor
            if (!arreglo || !arreglo.length) { return; }
            var principio = (($scope.currentPageProducts - 1) * $scope.numPerPageProducts); //0, 3
            var fin = principio + $scope.numPerPageProducts; //3, 6
            $scope.filtroProducts = arreglo.slice(principio, fin); // 
            console.log('pagineo');
        };

        $scope.buscarProducts = function (busquedaprod) {
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewtitle+prod.Viewsku;
                return (textobusqueda.toLowerCase().indexOf(busquedaprod.toLowerCase()) !== -1); // matches, contains
            });


            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                //ng-if="dataResults" para pagineo no funciona
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);

            $scope.$watch('currentPageProducts',function(){
                $scope.hacerPagineoProducts(buscados);
            });

        };

        $scope.searchtxt = function(busquedaprod){
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewtitle+prod.Viewsku;
                return (textobusqueda.toLowerCase().indexOf(busquedaprod.toLowerCase()) !== -1); // matches, contains
            });
            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);
            $scope.$watch('currentPageProducts',function(){
                $scope.hacerPagineoProducts(buscados);
            });
        }

        $scope.searchshipchina = function(){
            console.log('searchship FOR CHINA');
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewwarehouse.YB+prod.Viewwarehouse.ZQ01+prod.Viewwarehouse.ZQDZ01+prod.Viewwarehouse.FCYWHQ+prod.Viewwarehouse.SZXIAWAN+prod.Viewwarehouse.B2BREXIAOWH;
                return textobusqueda;
            });
            console.log(buscados);
            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);
            $scope.$watch('currentPageProducts',function(){
                $scope.hacerPagineoProducts(buscados);
            });
        }
        $scope.searchshipus = function(){
            console.log('searchship FOR US');
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewwarehouse.FXLAWH+prod.Viewwarehouse.FXLAWH2+prod.Viewwarehouse.MXTJWH+prod.Viewwarehouse.FXJFKGC+prod.Viewwarehouse.USZYCB;
                return textobusqueda;
            });
            console.log(buscados);
            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);
            $scope.$watch('currentPageProducts',function(){
                $scope.hacerPagineoProducts(buscados);
            });
        }
        $scope.searchallp = function(){
            console.log('searchship all');
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewwarehouse.FXLAWH+prod.Viewwarehouse.FXLAWH2+prod.Viewwarehouse.MXTJWH+prod.Viewwarehouse.FXJFKGC+prod.Viewwarehouse.USZYCB+prod.Viewwarehouse.YB+prod.Viewwarehouse.ZQ01+prod.Viewwarehouse.ZQDZ01+prod.Viewwarehouse.FCYWHQ+prod.Viewwarehouse.SZXIAWAN+prod.Viewwarehouse.B2BREXIAOWH;
                return textobusqueda;
            });
            console.log(buscados);
            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);
        }

        var RutaCompleta = window.location.hash;
        var RutaCategory = RutaCompleta.split("/");
        var Category = RutaCategory[4];
        var CategorySend = Category.toString();
        $scope.NameSubcategory = CategorySend;
        console.log('la ruta es',CategorySend);


        var subcat = [];
        var subsubcat = [];
        categories.list(function(categories) {
            $scope.categories = categories;  



            for(var c in $scope.categories.msg){
                if($scope.categories.msg[c]['cat_id'] == $routeParams.category){
                    $scope.categorieview = $scope.categories.msg[c]['cat_name'];
                    $scope.categorieviewID = $scope.categories.msg[c]['cat_id'];
                } 
                if($scope.categories.msg[c]['cat_id'] == $routeParams.subcategory){
                    $scope.categorieview2separate = ">";
                    $scope.categorieview2 = $scope.categories.msg[c]['cat_name'];
                    $scope.categorieview2ID = $scope.categories.msg[c]['cat_id'];
                    console.log($scope.categorieview2);
                } 

                /*
                if($scope.categories.msg[c]['parent_id'] == $routeParams.subcategory){
                    $scope.datasubcategory= true;
                    $scope.datasubsubcategory= false;
                    subcat.push($scope.categories.msg[c]);
                    $scope.subcategories1 = subcat;
                } 
*/
               

                if($scope.categories.msg[c]['parent_id'] == $routeParams.subcategory && $scope.categories.msg[c]['level'] == 3 ){
                    //console.log($scope.categories.msg[c]);
                    $scope.datasubcategory= false;
                    //cambiar a true para mostrar 
                    $scope.datasubsubcategory= true;
                    $scope.datasubsubsubcategory = false;
                    subsubcat.push($scope.categories.msg[c]);
                    $scope.subcategories2 = subsubcat;
                } 


                if($routeParams.category == "allcategories"){
                    $location.path('/Results/allProducts');
                    break;
                } 
            }

        });

        $scope.filterCategory = function(cat){
            $location.path('/Results/allProducts/'+cat);   
        };    
        $scope.$watch('currentPageProducts',function(){
            $scope.hacerPagineoProducts($scope.ListAllProducts2);
        });


        $scope.ListAllProducts = response.data;
        var modelview2=[];
        for(var i in $scope.ListAllProducts){
            var modelview = {
                Viewcategory : $scope.ListAllProducts[i].category,
                Viewsku : $scope.ListAllProducts[i].sku,
                Viewencrypted_sku : $scope.ListAllProducts[i].encrypted_sku,
                Viewtitle : $scope.ListAllProducts[i].title,
                Viewcolor : $scope.ListAllProducts[i].color,
                Vieworiginal_img : $scope.ListAllProducts[i].original_img,
                Viewcat_id : $scope.ListAllProducts[i].cat_id,
                Viewparent_id : $scope.ListAllProducts[i].parent_id,
                Viewsize : $scope.ListAllProducts[i].size,
                Viewwarehouse : JSON.parse($scope.ListAllProducts[i].warehouse),
            };
            modelview2.push(modelview);
        }
        $scope.ListAllProducts2 = modelview2;
        $scope.totalProducts = $scope.ListAllProducts2.length;
        $scope.hacerPagineoProducts($scope.ListAllProducts2);
        console.log('la data nueva',$scope.filtroProducts);
        $scope.dataResults = true;
        if($scope.filtroProducts == ""){
            $scope.dataNoResults = true;
            $scope.dataResults = false;
        }else{
            $scope.dataResults = true;
            $scope.dataNoResults = false;
        }

    }, function errorCallback(response) {
        console.log('no logrado');
    });


}]);









empleadoControllers.controller('ProductsControllersubsubCategory', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams','$location', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams,$location) {
    
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
    $scope.dataLoading = true;
    $scope.dataLoadingText = true;


    $http.post(rute+'api/?a=listProductssubsubCat&category='+ $routeParams.category+'&subcategory='+ $routeParams.subcategory +'&subsubcategory='+ $routeParams.subsubcategory ).then(function successCallback(response) {  
  
        $scope.dataLoading = false;
        $scope.dataLoadingText = false;
        $scope.filtroProducts = [];
        $scope.currentPageProducts = 1;
        $scope.numPerPageProducts = 40; //es 40
        $scope.maxSize = 8;
        $scope.hacerPagineoProducts = function (arreglo) {
            //si no retorna ningun valor
            if (!arreglo || !arreglo.length) { return; }
            var principio = (($scope.currentPageProducts - 1) * $scope.numPerPageProducts); //0, 3
            var fin = principio + $scope.numPerPageProducts; //3, 6
            $scope.filtroProducts = arreglo.slice(principio, fin); // 
            console.log('pagineo');
        };

        $scope.buscarProducts = function (busquedaprod) {
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewtitle+prod.Viewsku;
                return (textobusqueda.toLowerCase().indexOf(busquedaprod.toLowerCase()) !== -1); // matches, contains
            });


            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                //ng-if="dataResults" para pagineo no funciona
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);

            $scope.$watch('currentPageProducts',function(){
                $scope.hacerPagineoProducts(buscados);
            });

        };

        $scope.searchtxt = function(busquedaprod){
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewtitle+prod.Viewsku;
                return (textobusqueda.toLowerCase().indexOf(busquedaprod.toLowerCase()) !== -1); // matches, contains
            });
            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);
            $scope.$watch('currentPageProducts',function(){
                $scope.hacerPagineoProducts(buscados);
            });
        }

        $scope.searchshipchina = function(){
            console.log('searchship FOR CHINA');
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewwarehouse.YB+prod.Viewwarehouse.ZQ01+prod.Viewwarehouse.ZQDZ01+prod.Viewwarehouse.FCYWHQ+prod.Viewwarehouse.SZXIAWAN+prod.Viewwarehouse.B2BREXIAOWH;
                return textobusqueda;
            });
            console.log(buscados);
            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);
            $scope.$watch('currentPageProducts',function(){
                $scope.hacerPagineoProducts(buscados);
            });
        }
        $scope.searchshipus = function(){
            console.log('searchship FOR US');
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewwarehouse.FXLAWH+prod.Viewwarehouse.FXLAWH2+prod.Viewwarehouse.MXTJWH+prod.Viewwarehouse.FXJFKGC+prod.Viewwarehouse.USZYCB;
                return textobusqueda;
            });
            console.log(buscados);
            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);
            $scope.$watch('currentPageProducts',function(){
                $scope.hacerPagineoProducts(buscados);
            });
        }
        $scope.searchallp = function(){
            console.log('searchship all');
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewwarehouse.FXLAWH+prod.Viewwarehouse.FXLAWH2+prod.Viewwarehouse.MXTJWH+prod.Viewwarehouse.FXJFKGC+prod.Viewwarehouse.USZYCB+prod.Viewwarehouse.YB+prod.Viewwarehouse.ZQ01+prod.Viewwarehouse.ZQDZ01+prod.Viewwarehouse.FCYWHQ+prod.Viewwarehouse.SZXIAWAN+prod.Viewwarehouse.B2BREXIAOWH;
                return textobusqueda;
            });
            console.log(buscados);
            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);
        }

        var RutaCompleta = window.location.hash;
        var RutaCategory = RutaCompleta.split("/");
        var Category = RutaCategory[4];
        var CategorySend = Category.toString();
        $scope.NameSubcategory = CategorySend;
        console.log('la ruta es',CategorySend);

        var Category2 = RutaCategory[5];
        var CategorySend2 = Category2.toString();
        $scope.NameSubcategory2 = CategorySend2;
        console.log('la ruta es',CategorySend2);


        var subcat = [];
        var subsubcat = [];
        categories.list(function(categories) {
            $scope.categories = categories;

            for(var c in $scope.categories.msg){

                if($scope.categories.msg[c]['cat_id'] == $routeParams.category){
                    $scope.categorieview = $scope.categories.msg[c]['cat_name'];
                    $scope.categorieviewID = $scope.categories.msg[c]['cat_id'];
                } 
                if($scope.categories.msg[c]['cat_id'] == $routeParams.subcategory){
                    $scope.categorieview2separate = ">";
                    $scope.categorieview2 = $scope.categories.msg[c]['cat_name'];
                    $scope.categorieview2ID = $scope.categories.msg[c]['cat_id'];
                    console.log($scope.categorieview2);
                } 

                if($scope.categories.msg[c]['cat_id'] == $routeParams.subsubcategory){
                    $scope.categorieview3separate = ">";
                    $scope.categorieview3 = $scope.categories.msg[c]['cat_name'];
                    $scope.categorieview3ID = $scope.categories.msg[c]['cat_id'];
                    console.log($scope.categorieview3);
                } 

                /*
                if($scope.categories.msg[c]['parent_id'] == $routeParams.subcategory){
                    $scope.datasubcategory= true;
                    $scope.datasubsubcategory= false;
                    subcat.push($scope.categories.msg[c]);
                    $scope.subcategories1 = subcat;
                } 
*/
               
                if($scope.categories.msg[c]['parent_id'] == $routeParams.subsubcategory && $scope.categories.msg[c]['level'] == 4 ){
                    console.log($scope.categories.msg[c]);
                    $scope.datasubcategory= false;
                    $scope.datasubsubcategory= false;
                    //para que aparezca cambiar a true
                    $scope.datasubsubsubcategory = true;
                    
                    subsubcat.push($scope.categories.msg[c]);
                    $scope.subcategories2 = subsubcat;

                } 

                if($scope.categories.msg[c]['level'] == 4 ){
                    //console.log($scope.categories.msg[c]);

                } 


                if($routeParams.category == "allcategories"){
                    $location.path('/Results/allProducts');
                    break;
                } 
            }

        });

        $scope.filterCategory = function(cat){
            $location.path('/Results/allProducts/'+cat);   
        };    
        $scope.$watch('currentPageProducts',function(){
            $scope.hacerPagineoProducts($scope.ListAllProducts2);
        });


        $scope.ListAllProducts = response.data;
        var modelview2=[];
        for(var i in $scope.ListAllProducts){
            var modelview = {
                Viewcategory : $scope.ListAllProducts[i].category,
                Viewsku : $scope.ListAllProducts[i].sku,
                Viewencrypted_sku : $scope.ListAllProducts[i].encrypted_sku,
                Viewtitle : $scope.ListAllProducts[i].title,
                Viewcolor : $scope.ListAllProducts[i].color,
                Vieworiginal_img : $scope.ListAllProducts[i].original_img,
                Viewcat_id : $scope.ListAllProducts[i].cat_id,
                Viewparent_id : $scope.ListAllProducts[i].parent_id,
                Viewsize : $scope.ListAllProducts[i].size,
                Viewwarehouse : JSON.parse($scope.ListAllProducts[i].warehouse),
            };
            modelview2.push(modelview);
        }
        $scope.ListAllProducts2 = modelview2;
        $scope.totalProducts = $scope.ListAllProducts2.length;
        $scope.hacerPagineoProducts($scope.ListAllProducts2);
        console.log('la data nueva',$scope.filtroProducts);
        $scope.dataResults = true;
        if($scope.filtroProducts == ""){
            $scope.dataNoResults = true;
            $scope.dataResults = false;
        }else{
            $scope.dataResults = true;
            $scope.dataNoResults = false;
        }

    }, function errorCallback(response) {
        console.log('no logrado');
    });


}]);



empleadoControllers.controller('ProductsControllersubsubsubCategory', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams','$location', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams,$location) {
    
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
    $scope.dataLoading = true;
    $scope.dataLoadingText = true;


    $http.post(rute+'api/?a=listProductssubsubCat&category='+ $routeParams.category+'&subcategory='+ $routeParams.subcategory +'&subsubcategory='+ $routeParams.subsubcategory +'&subsubsubcategory='+ $routeParams.subsubsubcategory ).then(function successCallback(response) {  
  
        $scope.dataLoading = false;
        $scope.dataLoadingText = false;
        $scope.filtroProducts = [];
        $scope.currentPageProducts = 1;
        $scope.numPerPageProducts = 40; //es 40
        $scope.maxSize = 8;
        $scope.hacerPagineoProducts = function (arreglo) {
            //si no retorna ningun valor
            if (!arreglo || !arreglo.length) { return; }
            var principio = (($scope.currentPageProducts - 1) * $scope.numPerPageProducts); //0, 3
            var fin = principio + $scope.numPerPageProducts; //3, 6
            $scope.filtroProducts = arreglo.slice(principio, fin); // 
            console.log('pagineo');
        };

        $scope.buscarProducts = function (busquedaprod) {
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewtitle+prod.Viewsku;
                return (textobusqueda.toLowerCase().indexOf(busquedaprod.toLowerCase()) !== -1); // matches, contains
            });


            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                //ng-if="dataResults" para pagineo no funciona
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);

            $scope.$watch('currentPageProducts',function(){
                $scope.hacerPagineoProducts(buscados);
            });

        };

        $scope.searchtxt = function(busquedaprod){
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewtitle+prod.Viewsku;
                return (textobusqueda.toLowerCase().indexOf(busquedaprod.toLowerCase()) !== -1); // matches, contains
            });
            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);
            $scope.$watch('currentPageProducts',function(){
                $scope.hacerPagineoProducts(buscados);
            });
        }

        $scope.searchshipchina = function(){
            console.log('searchship FOR CHINA');
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewwarehouse.YB+prod.Viewwarehouse.ZQ01+prod.Viewwarehouse.ZQDZ01+prod.Viewwarehouse.FCYWHQ+prod.Viewwarehouse.SZXIAWAN+prod.Viewwarehouse.B2BREXIAOWH;
                return textobusqueda;
            });
            console.log(buscados);
            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);
            $scope.$watch('currentPageProducts',function(){
                $scope.hacerPagineoProducts(buscados);
            });
        }
        $scope.searchshipus = function(){
            console.log('searchship FOR US');
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewwarehouse.FXLAWH+prod.Viewwarehouse.FXLAWH2+prod.Viewwarehouse.MXTJWH+prod.Viewwarehouse.FXJFKGC+prod.Viewwarehouse.USZYCB;
                return textobusqueda;
            });
            console.log(buscados);
            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);
            $scope.$watch('currentPageProducts',function(){
                $scope.hacerPagineoProducts(buscados);
            });
        }
        $scope.searchallp = function(){
            console.log('searchship all');
            var buscados = $filter('filter') ($scope.ListAllProducts2, function (prod) {
                var textobusqueda = prod.Viewwarehouse.FXLAWH+prod.Viewwarehouse.FXLAWH2+prod.Viewwarehouse.MXTJWH+prod.Viewwarehouse.FXJFKGC+prod.Viewwarehouse.USZYCB+prod.Viewwarehouse.YB+prod.Viewwarehouse.ZQ01+prod.Viewwarehouse.ZQDZ01+prod.Viewwarehouse.FCYWHQ+prod.Viewwarehouse.SZXIAWAN+prod.Viewwarehouse.B2BREXIAOWH;
                return textobusqueda;
            });
            console.log(buscados);
            if(buscados == ''){
                $scope.dataNoResults = true;
                $scope.dataResults = false;
            }else{
                $scope.dataResults = true;
                $scope.dataNoResults = false;
                $scope.totalProducts = buscados.length;
            }
            $scope.hacerPagineoProducts(buscados);
        }

        var RutaCompleta = window.location.hash;
        var RutaCategory = RutaCompleta.split("/");
        var Category = RutaCategory[4];
        var CategorySend = Category.toString();
        $scope.NameSubcategory = CategorySend;
        console.log('la ruta es',CategorySend);

        var Category2 = RutaCategory[5];
        var CategorySend2 = Category2.toString();
        $scope.NameSubcategory2 = CategorySend2;
        console.log('la ruta es',CategorySend2);


        var subcat = [];
        var subsubcat = [];
        categories.list(function(categories) {
            $scope.categories = categories;

            for(var c in $scope.categories.msg){

                if($scope.categories.msg[c]['cat_id'] == $routeParams.category){
                    $scope.categorieview = $scope.categories.msg[c]['cat_name'];
                    $scope.categorieviewID = $scope.categories.msg[c]['cat_id'];
                } 
                if($scope.categories.msg[c]['cat_id'] == $routeParams.subcategory){
                    $scope.categorieview2separate = ">";
                    $scope.categorieview2 = $scope.categories.msg[c]['cat_name'];
                    $scope.categorieview2ID = $scope.categories.msg[c]['cat_id'];
                    console.log($scope.categorieview2);
                } 

                if($scope.categories.msg[c]['cat_id'] == $routeParams.subsubcategory){
                    $scope.categorieview3separate = ">";
                    $scope.categorieview3 = $scope.categories.msg[c]['cat_name'];
                    $scope.categorieview3ID = $scope.categories.msg[c]['cat_id'];
                    console.log($scope.categorieview3);
                } 

                if($scope.categories.msg[c]['cat_id'] == $routeParams.subsubsubcategory){
                    $scope.categorieview4separate = ">";
                    $scope.categorieview4 = $scope.categories.msg[c]['cat_name'];
                    $scope.categorieview4ID = $scope.categories.msg[c]['cat_id'];
                    console.log($scope.categorieview4);
                } 

                /*
                if($scope.categories.msg[c]['parent_id'] == $routeParams.subcategory){
                    $scope.datasubcategory= true;
                    $scope.datasubsubcategory= false;
                    subcat.push($scope.categories.msg[c]);
                    $scope.subcategories1 = subcat;
                } 
*/
               
                if($scope.categories.msg[c]['parent_id'] == $routeParams.subsubsubcategory && $scope.categories.msg[c]['level'] == 5 ){
                    console.log($scope.categories.msg[c]);
                    $scope.datasubcategory= false;
                    $scope.datasubsubcategory= false;
                    $scope.datasubsubsubcategory = true;
                    
                    subsubcat.push($scope.categories.msg[c]);
                    $scope.subcategories2 = subsubcat;

                } 

                if($scope.categories.msg[c]['level'] == 4 ){
                    //console.log($scope.categories.msg[c]);

                } 


                if($routeParams.category == "allcategories"){
                    $location.path('/Results/allProducts');
                    break;
                } 
            }

        });

        $scope.filterCategory = function(cat){
            $location.path('/Results/allProducts/'+cat);   
        };    
        $scope.$watch('currentPageProducts',function(){
            $scope.hacerPagineoProducts($scope.ListAllProducts2);
        });


        $scope.ListAllProducts = response.data;
        var modelview2=[];
        for(var i in $scope.ListAllProducts){
            var modelview = {
                Viewcategory : $scope.ListAllProducts[i].category,
                Viewsku : $scope.ListAllProducts[i].sku,
                Viewencrypted_sku : $scope.ListAllProducts[i].encrypted_sku,
                Viewtitle : $scope.ListAllProducts[i].title,
                Viewcolor : $scope.ListAllProducts[i].color,
                Vieworiginal_img : $scope.ListAllProducts[i].original_img,
                Viewcat_id : $scope.ListAllProducts[i].cat_id,
                Viewparent_id : $scope.ListAllProducts[i].parent_id,
                Viewsize : $scope.ListAllProducts[i].size,
                Viewwarehouse : JSON.parse($scope.ListAllProducts[i].warehouse),
            };
            modelview2.push(modelview);
        }
        $scope.ListAllProducts2 = modelview2;
        $scope.totalProducts = $scope.ListAllProducts2.length;
        $scope.hacerPagineoProducts($scope.ListAllProducts2);
        console.log('la data nueva',$scope.filtroProducts);
        $scope.dataResults = true;
        if($scope.filtroProducts == ""){
            $scope.dataNoResults = true;
            $scope.dataResults = false;
        }else{
            $scope.dataResults = true;
            $scope.dataNoResults = false;
        }

    }, function errorCallback(response) {
        console.log('no logrado');
    });


}]);









empleadoControllers.controller('cifradorcesarController', ['$scope','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    $http.post(rute+'api/?a=cifradorcesar').then(function successCallback(response) {   
        $scope.cifradorcesar = response.data;
        
        console.log(' cifradorcesar respuesta',$scope.cifradorcesar);
    }, function errorCallback(response) {
        console.log('no logrado');
    });

}]);
