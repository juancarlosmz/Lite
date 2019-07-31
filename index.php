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
            <div class="container contmenuhed2"> 
              <div class="row colorrow">
                <div id="cajaicomenutop" class="col-md-6 col-sm-6 col-xs-6 ">
                  <a href="#/">
                    <i class="glyphicon glyphicon-home"></i>
                  </a>    
                </div>
                <div id="cajaicomenutop2" class="col-md-5 col-sm-5 col-xs-5 ">
                  <a onclick="myFunctioiconohide();">
                    <i id="iconoleftright" class="glyphicon glyphicon glyphicon-indent-right"></i>
                  </a>
                </div>
              </div>
            </div>



              
              <div class="container contmenuhed2">
                  <ul class="menuleft">
                    <div class="row">
                      <div class="col-md-4 col-sm-4 col-xs-4 cajaicomenu">
                        <li><a href=""><i class="glyphicon glyphicon-dashboard">&nbsp; </i>   
                      </div>
                      <div class="col-md-8 col-sm-8 col-xs-8 cajaicomenu2">
                        <span class="hidetextmenu">Dashboard</span></a></li>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-4 col-sm-4 col-xs-4 cajaicomenu">
                        <li><a href="#/"><i class="glyphicon glyphicon-home">&nbsp; </i>   
                      </div>
                      <div class="col-md-8 col-sm-8 col-xs-8 cajaicomenu2">
                        <span class="hidetextmenu">Home</span></a></li>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-4 col-sm-4 col-xs-4 cajaicomenu">
                        <li><a href=""><i class="glyphicon glyphicon-search">&nbsp; </i>   
                      </div>
                      <div class="col-md-8 col-sm-8 col-xs-8 cajaicomenu2">
                        <span class="hidetextmenu">Search Products</span></a></li>
                      </div>
                    </div>

                    <div style="display:none;"  class="row">
                      <div class="col-md-4 col-sm-4 col-xs-4 cajaicomenu">
                        <li><a id="onClickL" href="#/login2"><i class="glyphicon glyphicon-user">&nbsp; </i>   
                      </div>
                      <div class="col-md-8 col-sm-8 col-xs-8 cajaicomenu2">
                        <span class="hidetextmenu">Login</span></a></li>
                      </div>
                    </div>
                    
                    <div class="row">
                      <div class="col-md-4 col-sm-4 col-xs-4 cajaicomenu">
                        <li><a id="onClickL" href="#/login"><i class="glyphicon glyphicon-user">&nbsp; </i>   
                      </div>
                      <div class="col-md-8 col-sm-8 col-xs-8 cajaicomenu2">
                        <span class="hidetextmenu">Login</span></a></li>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-4 col-sm-4 col-xs-4 cajaicomenu">
                        <li><a id="onClickL" href="#/register"><i class="glyphicon glyphicon-user">&nbsp; </i>   
                      </div>
                      <div class="col-md-8 col-sm-8 col-xs-8 cajaicomenu2">
                        <span class="hidetextmenu">Register</span></a></li>
                      </div>
                    </div>


                    <div class="row">
                      <div class="col-md-4 col-sm-4 col-xs-4 cajaicomenu">
                        <li><a href="#/FQA"><i class="glyphicon glyphicon-question-sign">&nbsp; </i>   
                      </div>
                      <div class="col-md-8 col-sm-8 col-xs-8 cajaicomenu2">
                        <span class="hidetextmenu">FAQ</span></a></li>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-4 col-sm-4 col-xs-4 cajaicomenu">
                        <li><a href=""><i class="glyphicon glyphicon-question-sign">&nbsp; </i>   
                      </div>
                      <div class="col-md-8 col-sm-8 col-xs-8 cajaicomenu2" ng-controller="HomeControllerUser">
                        <span class="hidetextmenu">{{user.firstName}}</span></a></li>
                      </div>
                    </div>

                  </ul>
                </div>
            </div>
          </section>
      </div>
      <div id="contright" class="col-md-10 col-sm-10 col-xs-10">
          <section id="secright">
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
    <script src="//code.angularjs.org/1.5.9/angular-cookies.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ngStorage/0.3.10/ngStorage.min.js"></script>
    
    <script src="//code.jquery.com/jquery-3.1.1.min.js"></script>

    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.10.0/ui-bootstrap-tpls.min.js"></script>
<!-- -->
    <script src="app.js"></script>
    <script src="controllers.js"></script>
    <script src="services/products.js"></script>
    <script src="services/login.js"></script>
    <script src="services/validate.js"></script>
    <script src="services/usersesion.js"></script>
    <script src="js/jsapplite.js"></script>


</body>
</html>
