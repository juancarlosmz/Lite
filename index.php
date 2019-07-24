<!doctype html>
<html lang="es" ng-app="appLite" >
<head>
    <meta charset="utf-8">
    <title>Lite</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">   
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.8/angular-material.min.css">
</head>
<body data-ng-init='load()'>


    <div class="row">
      <div id="contleft" class="col-md-2 col-sm-2 col-xs-2">
          <section id="secleft">
            <div class="header">
              <div class="container contmenuhed">
                <a class="icohome" href="#/">
                  <i class="glyphicon glyphicon-home"></i>
                </a> 
                <a class="icomenuhome" onclick="myFunctioiconohide();">
                  <i id="iconoleftright" class="glyphicon glyphicon glyphicon-indent-right"></i>
                </a>
              </div>
              <div class="container contmenuhed2">
                  <ul class="menuleft">
                    <li><a href=""><i class="glyphicon glyphicon-dashboard">&nbsp; </i>   <span class="hidetextmenu">Dashboard</span></a></li>
                    <li><a href="#/"><i class="glyphicon glyphicon-home">&nbsp; </i>   <span class="hidetextmenu">Home</span></a></li>
                    <li><a href=""><i class="glyphicon glyphicon-search">&nbsp; </i>   <span class="hidetextmenu">Search Products</span></a></li>
                    <li><a id="onClickL" href="#/login"><i class="glyphicon glyphicon-user">&nbsp; </i>  <span class="hidetextmenu">Login</span></a></li>
                    <li><a href=""><i class="glyphicon glyphicon-user">&nbsp; </i>   <span class="hidetextmenu">Register</span></a></li>
                    <li><a href=""><i class="glyphicon glyphicon-user">&nbsp; </i>   <span class="hidetextmenu">FAQ</span></a></li>
                  </ul>
                </div>
            </div>
          </section>
      </div>
      <div id="contright" class="col-md-10 col-sm-10 col-xs-10">
          <section class="secright">
              <div class="header contlogohed">
                  
                  <div class="container logow">
                    
                    <div class="logo">
                      <a href="#/" ><img src="img/logo.jpg" ></a> 
                    </div>
                  </div>
              </div>

              <div class="ng-class">
              <div class="container">
                  <div class="row">
                      <div class="col-xs-12">
                          <!-- Content body -->
                          <div class="ng-view"></div>
                      </div>
                  </div>
              </div>
              </div>
          </section>
      </div>
    </div>



    <script src="https://code.angularjs.org/1.5.9/angular.min.js"></script>
    <script src="https://code.angularjs.org/1.5.9/angular-route.min.js"></script>
    <script src="https://code.angularjs.org/1.5.9/angular-animate.min.js"></script>
    <script src="https://code.angularjs.org/1.5.9/angular-aria.min.js"></script>

    
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.10.0/ui-bootstrap-tpls.min.js"></script>

    <script src="app.js"></script>
    <script src="controllers.js"></script>
    <script src="services/products.js"></script>
    <script src="js/jsapplite.js"></script>
</body>
</html>
