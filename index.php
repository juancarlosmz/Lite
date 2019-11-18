<!DOCTYPE html>
<html lang="es" ng-app="appLite" >
  <head>
      <!-- <base href="/lite/">  -->
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
     <!--  <meta http-equiv="X-UA-Compatible" content="IE=edge" />-->
      <title>Woosource Product Catalog</title>
      <link rel="stylesheet" href="css/style.css">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">   
      <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.8/angular-material.min.css">
  <!-- Scripts-->
      <script src="https://code.angularjs.org/1.5.9/angular.min.js"></script>
      <script src="https://code.angularjs.org/1.5.9/angular-route.min.js"></script>
      <script src="https://code.angularjs.org/1.5.9/angular-animate.min.js"></script>
      <script src="https://code.angularjs.org/1.5.9/angular-aria.min.js"></script>
      <script src="//code.angularjs.org/1.5.9/angular-cookies.min.js"></script>
      <script src="https://code.angularjs.org/1.5.9/angular-messages.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/ngStorage/0.3.10/ngStorage.min.js"></script>

      
  <!-- librerias bootstrap -->   
      <script src="//code.jquery.com/jquery-3.1.1.min.js"></script>
      <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.10.0/ui-bootstrap-tpls.min.js"></script>
  <!-- -->
      <script src="app.js"></script>
      <script src="controllers.js"></script>
  <!--services -->
      <script src="services/products.js"></script>
      <script src="services/login.js"></script>
      <script src="services/validate.js"></script>
  <!--js -->
      <script src="js/jsapplite.js"></script>
  <!--libs -->

  </head>
  <body data-ng-init='load()'>

    <div class="sidenav">
        <div ng-controller="treeController" >
          <nav class="navbar navbar-default" role="navigation">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>

              <button id="menuTempid" type="button" style="display:none;" onclick="menuTemp();">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>

              <div class="logo">
                <a  href="/lite/#/" ><img src="img/logo.jpg" ></a> 
              </div>
            </div>

          <div class="collapse navbar-collapse" ng-class="!navCollapsed && 'in'">
            
            <ul class="nav navbar-nav">
              <li dropdown class="open">
                <a style="display:none;" href="#/" dropdown-toggle>
                  <i class="glyphicon glyphicon-home"></i>
                  <b class='caret'></b>
                </a>
                <tree tree='tree'></tree>
              </li>
            </ul>
            </div>
          </nav>
        </div>
    </div>

    <div class="main container">

      <div class="ng-view containerP20"></div>

    </div>




  </body>
</html>
