var empleadoControllers = angular.module('empleadoControllers', []);
var rute = 'http://localhost:50/Lite/';
'use strict';
empleadoControllers.controller('HomeController', ['$scope','products','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$location', function($scope,products,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$location) {
    

    $scope.buscarProducts = function (busquedaprod) {
        var buscados = $filter('filter') ($scope.dataProducts, function (prod) {
            return (prod.sku.toLowerCase().indexOf(busquedaprod.toLowerCase()) !== -1); // matches, contains
        });
        $scope.totalProducts = buscados.length;
        //$scope.hacerPagineoProducts(buscados);
    };


    //pintar toda la info de los productos
    $scope.searchhome = function(){
        $location.path('/Search');
    }

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

    //tutorial
    //https://codepen.io/pibby/pen/DLtaK?editors=1010
    //implementando mi codigo ya funcional
    $scope.appTitlesku = "My SKU's List:";
	$scope.savedsku = localStorage.getItem('todossku');
	$scope.todossku = (localStorage.getItem('todossku')!==null) ? JSON.parse($scope.savedsku) : [ ];
	localStorage.setItem('todossku', JSON.stringify($scope.todossku));


    $scope.alert = [];


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
                localStorage.setItem('todossku', JSON.stringify($scope.todossku));
                /*alert*/
                
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
        console.log($scope.todossku);
    };
    
    //carrusel de productos

    $scope.myInterval = 190000;

    $scope.inicializarProducts = function () {
        $http.post(rute+"chinabrands/GetBestSellProducts.php").then(function successCallback(response) {
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
            var first = [],
            second, third;
            var many = 1;

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




        }, function errorCallback(response) {
            console.log("error 505");    
        });
        //galleria 2
        $http.post(rute+"chinabrands/GetHighPotential.php").then(function successCallback(response) {
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



empleadoControllers.controller('Productview', ['$scope','product','stock', function($scope,product,stock) {
    product.list(function(product) {
            $scope.product = product;
    });

    stock.list(function(stock) {
            $scope.stock = stock;
    });

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

empleadoControllers.controller('treeController', function($scope) {
    
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
        name: "Manage Products",
        link: "#/",
        icono: "glyphicon glyphicon-tag",
        idoc2: "ocultarico"
    }, {
        name: "Search Products",
        link: "#/Search",
        icono: "glyphicon glyphicon-minus",
        idoc: "ocultarico",
        idoc2: "ocultarico"
    }, {
        name: "Products Import List",
        link: "#/Import-List",
        icono: "glyphicon glyphicon-list-alt",
        idoc: "ocultarico"
    },{
        name: "Login",
        link: "#/login",
        icono: "glyphicon glyphicon-user",
        idoc2: "ocultarico"
    }];
  });




empleadoControllers.controller('AllProductsController', ['$scope','products','categories','$localStorage','$sessionStorage','$timeout','$filter','$http','$routeParams', function($scope,products,categories,$localStorage,$sessionStorage,$timeout,$filter,$http,$routeParams) {
    $http.post(rute+"chinabrands/GetSearchInterface.php").then(function successCallback(response) {
        $scope.Allproducts = response.data;
        $scope.Resultado = $scope.Allproducts.msg['page_result'];
        
        /*
        var pagination = [];
        for (var i = 1; i < $scope.Allproducts.msg.total_pages; i++) {
            pagination.push(i);
            
        }
        $scope.pagination = pagination;
        */

    }, function errorCallback(response) {
        console.log("Error HTTP 505 ");    
    });

    categories.list(function(categories) {
        $scope.categories = categories;  
    });


    //cambio de pagina y productos
    $http.post(rute+'chinabrands/GetSearchInterface.php?page='+ $routeParams.page).then(function successCallback(response) {
        $scope.Allproducts = response.data;
        $scope.Resultado = $scope.Allproducts.msg['page_result'];
        var totalpagination = $scope.Allproducts.msg.total_pages;

        /*
        var pagination = [];
        for (var i = 1; i <= $scope.Allproducts.msg.total_pages; i++) {
            pagination.push(i);
            
        }
        $scope.pagination = pagination;
*/


        /*iNICIANDO LA PAGINACION */

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
                // insert the prev       
                $(_constructor.element).prepend(this.template({
                    text: _constructor.gotoPrevText,
                    pageNumber: 'prev',
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
                $(this._constructor.element).append(this.template({
                    text: this._constructor.gotoNextText,
                    pageNumber: 'next',
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
                let template = `<form>${_constructor.jumpToText}<input type="number" min="1" /><button type="submit"></button></form>`
            
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

            // render again if the page is not visible
            if (_constructor.currentPage < _constructor.start || _constructor.currentPage > _constructor.end) {
                $(_constructor.element).empty()
                this.displayPagination()
            }

        },
        template: function(args) {
            // args.pageNumber is required
            if (args.classNames) {
                return '<li class="' + args.classNames + '" data-pagination="' + args.pageNumber + '"><a href="#/Result/' + args.pageNumber + ' "  >' + (args.text == null ? args.pageNumber : args.text) + '</a></li>'
            } else {
                return '<li data-pagination="' + args.pageNumber + '"><a  href="#/Result/' + args.pageNumber + ' "  >' + (args.text == null ? args.pageNumber : args.text) + '</a></li>'
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
        gotoPrevText: '<img src="https://prep-community.musictribe.com/html/assets/pagination_arrow-prev.png" /> Prev',
        gotoNextText: 'Next <img src="https://prep-community.musictribe.com/html/assets/pagination_arrow-next.png" />',
        gotoLastText: '<img src="https://prep-community.musictribe.com/html/assets/pagination_arrow-last.png" />',
        ellipsis: true,
        element: '#pagination2'
        });
        /*end pagination*/

    }, function errorCallback(response) {
        console.log("error 505");    
    });



    $http.post(rute+'chinabrands/GetSearchInterface.php?category='+ $routeParams.category).then(function successCallback(response) {
        $scope.Allproducts = response.data;
        $scope.Resultado = $scope.Allproducts.msg['page_result'];
        console.log( $scope.Resultado);


    }, function errorCallback(response) {
        console.log("error 505");    
    });




}]);





