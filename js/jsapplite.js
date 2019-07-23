function myFunctionin() {
  var skufilter = document.getElementsByClassName("valuesku");
  for (var i = 0; i < skufilter.length; i++) {
      if(skufilter[i].value.substr(7, 8) == "01"){
        //console.log(skufilter[i].value);
        document.getElementsByClassName("showsku")[i].style.display = "block";
      }else{
        //console.log('nada');
        document.getElementsByClassName("showsku")[i].style.display = "none";
      }
  }
}

var buttonfilter = document.getElementById("filtercoll");

window.addEventListener("load", function(event){
    function collectionfilter(){
      document.getElementById("filtercoll").click();
    }
    setTimeout(function() {
      collectionfilter();
    }, 10000);
});


function myFunctioninfo(){
  var todalainfo = document.getElementById("inputinfo").value;
  document.getElementById("infoprod").innerHTML= todalainfo;
}

var clic = 1;
function myFunctioiconohide(){
  var menushide = document.getElementsByClassName("hidetextmenu");
  var menushort = document.getElementById("contleft");
  var menushort2 = document.getElementById("contright");
  var menuwidth = document.getElementById("secleft");
  var menuicoleftright = document.getElementById("iconoleftright");
  if(clic == 1){
    for (var i = 0; i < menushide.length; i++) {
      document.getElementsByClassName("hidetextmenu")[i].style.display = "none";
    }
    menushort.className = "col-md-1 col-sm-1 col-xs-1";
    menushort2.className = "col-md-11 col-sm-11 col-xs-11";
    menuicoleftright.className = "glyphicon glyphicon glyphicon-indent-left";
    menuwidth.style.width = "8.4%";
    clic = clic +1 ;
  }else{
    for (var i = 0; i < menushide.length; i++) {
      document.getElementsByClassName("hidetextmenu")[i].style.display = "block";
    }
    menushort.className = "col-md-2 col-sm-2 col-xs-2";
    menushort2.className = "col-md-10 col-sm-10 col-xs-10";
    menuicoleftright.className = "glyphicon glyphicon glyphicon-indent-right";
    menuwidth.style.width = "16.6%";
    clic = 1;
  }
  
  
}
