var empleadoControllers = angular.module('empleadoControllers', []);

empleadoControllers.controller('EmpleadoListadoCtrl', ['$scope','$http', function($scope,$http){
    empleados();
    
    function empleados(){
        $http.get('http://localhost:50/Lite/api/?a=listar').then(function(response){
            $scope.model = response.data;
        });
    }

    $scope.retirar = function(id){
        if(confirm('Esta seguro de realizar esta accion?')){

            $http.get('http://localhost:50/Lite/api/?a=eliminar&id='+ id).then(function(response){
                empleados();
            });
        }
    }
    $scope.registrar = function(){
        var model = {
            Nombre: $scope.Nombre,
            Apellido: $scope.Apellido,
            email: $scope.email,
            contra: $scope.contra,
            sexo: $scope.sexo,
            fnacimiento: $scope.fnacimiento
        };
        $http.post('http://localhost:50/Lite/api/?a=registrar',model).then(function(response){
            empleados();
            $scope.Nombre = null,
            $scope.Apellido = null,
            $scope.email = null,
            $scope.contra = null,
            $scope.sexo = null,
            $scope.fnacimiento = null

        });
    }
}]);

empleadoControllers.controller('EmpleadoVerCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {   
        
        $http.get('http://localhost:50/Lite/api/?a=obtener&id=' + $routeParams.id).then(function(response){
            $scope.model = response.data;
        });  
}]);

empleadoControllers.controller('EmpleadoLogin', ['$scope','$http', function ($scope,$http) {
    
    $scope.closeMsg = function(){
        $scope.alertMsg = false;
    };
      
    $scope.login_form = true;
      
    $scope.showRegister = function(){
        $scope.login_form = false;
        $scope.register_form = true;
        $scope.alertMsg = false;
    };
      
    $scope.showLogin = function(){
        $scope.register_form = false;
        $scope.login_form = true;
        $scope.alertMsg = false;
    };
      
    $scope.submitRegister = function(){
        $http({
         method:"POST",
         url:"register.php",
         data:$scope.registerData
        }).success(function(data){
         $scope.alertMsg = true;
         if(data.error != '')
         {
          $scope.alertClass = 'alert-danger';
          $scope.alertMessage = data.error;
         }
         else
         {
          $scope.alertClass = 'alert-success';
          $scope.alertMessage = data.message;
          $scope.registerData = {};
         }
        });
    };
      
    $scope.submitLogin = function(){
        var emailjs = $scope.loginData.email;
        var contrajs = $scope.loginData.password;

        $http({
         method:"POST",
         url:"api/?a=startlogin",
         data:$scope.loginData
        }).then(function successCallback(response) {
            
          console.log($scope.loginData);
          console.log(emailjs);
          console.log(contrajs);
          $scope.alertMsg = true;
          $scope.alertClass = 'alert-danger';
          $scope.alertMessage = 'usuario no registrado';
        }, function errorCallback(response) {
            location.reload();
        });


 

    };

/*
    $scope.startlogin = function(){
   
        memail = $scope.email;
        mcontra = $scope.contra;
        console.log("email "+memail+" contra "+ mcontra);

        $http.post('http://localhost:50/IHM_SITE/api/?a=startlogin&email='+memail+"&contra="+mcontra).then(function(response){
            console.log("usuario ingresado");
        });


        var encodedString =
        "email=" + encodeURIComponent($scope.email) +
        "and contra=" + encodeURIComponent($scope.contra);
        console.log(encodedString);
        var user = { 
            email : $scope.email , 
            contra : $scope.contra 
        };
        console.log({ 
            email : $scope.email , 
            contra : $scope.contra 
        });
        
        $http.post('http://localhost:50/Lite/api/?a=startlogin',user).then(function(response){
            console.log("error fatal");
            console.log("accesos correcto");

        }); 

    }
*/
}]);


empleadoControllers.controller('AllProducts', ['$scope','$http','products', function($scope,$http,products) {
    //return $http.get('http://localhost:50/IHM_SITE/php/Products.php')
/*
        $http.get('https://s3.amazonaws.com/codecademy-content/courses/ltp4/photos-api/photos.json')
            .then(function(response) {
               $scope.products = response.data;
        });
      */     
  }]);

  empleadoControllers.controller('HomeController', ['$scope','products', function($scope,products) {
  
    products.list(function(products) {
        $scope.products = products;
      });
      
  }]);

  empleadoControllers.controller('Productview', ['$scope','product','stock', function($scope,product,stock) {
    product.list(function(product) {
            $scope.product = product;
    });

    stock.list(function(stock) {
            $scope.stock = stock;
    });

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

  }]);
  

