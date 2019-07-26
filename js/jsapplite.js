function myFunctionin() {
  var skufilter = document.getElementsByClassName("valuesku");
  for (var i = 0; i < skufilter.length; i++) {
      if(skufilter[i].value.substr(7, 8) == "01"){
        document.getElementsByClassName("showsku")[i].style.display = "block";
      }else{
        document.getElementsByClassName("showsku")[i].style.display = "none";
      }
  }
}

function myComboFilter() {
  var valorselect = document.getElementById("opidselect");
  var valparentid = document.getElementsByClassName("valuesparentid");
  for (var i = 0; i < valparentid.length; i++) {
    if(valparentid[i].value == valorselect.value){
      document.getElementsByClassName("showsku")[i].style.display = "block";
    }else{
      document.getElementsByClassName("showsku")[i].style.display = "none";
    }
  }
}

function FilterValorCombo(){
  var valorselect = document.getElementById("opidselect");
  var valparentid = document.getElementsByClassName("valuesparentid");
  for (var i = 0; i < valparentid.length; i++) {
    if(valparentid[i].value == valorselect.value){
      document.getElementsByClassName("showsku")[i].style.display = "block";
    }else{
      document.getElementsByClassName("showsku")[i].style.display = "none";
    }
  }
}

/*
var buttonfilter = document.getElementById("filtercoll");
window.addEventListener("load", function(event){
    function collectionfilter(){
      document.getElementById("filtercoll").click();
    }
    setTimeout(function() {
      collectionfilter();
    }, 10000);
});
*/

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

//codigo letras hover
var colortext = document.getElementsByClassName("colorhide");
  //color imagenes mouse over
  function mycolorhover1(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[0].style.display = "block";
    }
  }
  function mycolorhover2(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[1].style.display = "block";
    }
  }
  function mycolorhover3(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[2].style.display = "block";
    }
  }
  function mycolorhover4(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[3].style.display = "block";
    }
  }
  function mycolorhover5(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[4].style.display = "block";
    }
  }
  function mycolorhover6(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[5].style.display = "block";
    }
  }
  function mycolorhover7(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[6].style.display = "block";
    }
  }
  function mycolorhover8(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[7].style.display = "block";
    }
  }
  function mycolorhover9(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[8].style.display = "block";
    }
  }
  function mycolorhover10(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[9].style.display = "block";
    }
  }
  function mycolorhover11(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[10].style.display = "block";
    }
  }
  function mycolorhover12(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[11].style.display = "block";
    }
  }

  //color imagenes mouse out
  function mycolorout1(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[0].style.display = "none";
    }
  }
  function mycolorout2(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[1].style.display = "none";
    }
  }
  function mycolorout3(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[2].style.display = "none";
    }
  }
  function mycolorout4(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[3].style.display = "none";
    }
  }
  function mycolorout5(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[4].style.display = "none";
    }
  }
  function mycolorout6(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[5].style.display = "none";
    }
  }
  function mycolorout7(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[6].style.display = "none";
    }
  }
  function mycolorout8(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[7].style.display = "none";
    }
  }
  function mycolorout9(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[8].style.display = "none";
    }
  }
  function mycolorout10(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[9].style.display = "none";
    }
  }
  function mycolorout11(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[10].style.display = "none";
    }
  }
  function mycolorout12(){
    for (var i = 0; i < colortext.length; i++) {
      document.getElementsByClassName("colorhide")[11].style.display = "none";
    }
  }

//CAMBIAR LA IMAGEN PRINCIPAL AL DAR CLICK EN LAS PEQUEÑAS
 
function myFchangeimg1(){ 
  var elmnt = document.getElementById("clonimg1");
  var cln = elmnt.cloneNode(true);
  var cajaprincipal = document.getElementById("cambioimg2");
  var imgprincipal = document.getElementById("cambioimg");
  cajaprincipal.replaceChild(cln,imgprincipal);
  document.getElementById("clonimg1").setAttribute("id", "cambioimg");
  
}
function myFchangeimg2(){
  var elmnt = document.getElementById("clonimg2");
  var cln = elmnt.cloneNode(true);
  var cajaprincipal = document.getElementById("cambioimg2");
  //la imagen a cambiar   
  var imgprincipal = document.getElementById("cambioimg");
  cajaprincipal.replaceChild(cln,imgprincipal);
  document.getElementById("clonimg2").setAttribute("id", "cambioimg");
  
}
function myFchangeimg3(){
  var elmnt = document.getElementById("clonimg3");
  var cln = elmnt.cloneNode(true);
  var cajaprincipal = document.getElementById("cambioimg2");
  //la imagen a cambiar   
  var imgprincipal = document.getElementById("cambioimg");
  cajaprincipal.replaceChild(cln,imgprincipal);
  document.getElementById("clonimg3").setAttribute("id", "cambioimg");
  
}
function myFchangeimg4(){
  var elmnt = document.getElementById("clonimg4");
  var cln = elmnt.cloneNode(true);
  var cajaprincipal = document.getElementById("cambioimg2");
  //la imagen a cambiar   
  var imgprincipal = document.getElementById("cambioimg");
  cajaprincipal.replaceChild(cln,imgprincipal);
  document.getElementById("clonimg4").setAttribute("id", "cambioimg");
  
}
function myFchangeimg5(){
  var elmnt = document.getElementById("clonimg5");
  var cln = elmnt.cloneNode(true);
  var cajaprincipal = document.getElementById("cambioimg2");
  //la imagen a cambiar   
  var imgprincipal = document.getElementById("cambioimg");
  cajaprincipal.replaceChild(cln,imgprincipal);
  document.getElementById("clonimg5").setAttribute("id", "cambioimg");
  
}
function myFchangeimg6(){
  var elmnt = document.getElementById("clonimg6");
  var cln = elmnt.cloneNode(true);
  var cajaprincipal = document.getElementById("cambioimg2");
  //la imagen a cambiar   
  var imgprincipal = document.getElementById("cambioimg");
  cajaprincipal.replaceChild(cln,imgprincipal);
  document.getElementById("clonimg6").setAttribute("id", "cambioimg");
  
}
function myFchangeimg7(){
  var elmnt = document.getElementById("clonimg7");
  var cln = elmnt.cloneNode(true);
  var cajaprincipal = document.getElementById("cambioimg2");
  //la imagen a cambiar   
  var imgprincipal = document.getElementById("cambioimg");
  cajaprincipal.replaceChild(cln,imgprincipal);
  document.getElementById("clonimg7").setAttribute("id", "cambioimg");
  
}
function myFchangeimg8(){
  var elmnt = document.getElementById("clonimg8");
  var cln = elmnt.cloneNode(true);
  var cajaprincipal = document.getElementById("cambioimg2");
  //la imagen a cambiar   
  var imgprincipal = document.getElementById("cambioimg");
  cajaprincipal.replaceChild(cln,imgprincipal);
  document.getElementById("clonimg8").setAttribute("id", "cambioimg");
  
}
function myFchangeimg9(){
  var elmnt = document.getElementById("clonimg9");
  var cln = elmnt.cloneNode(true);
  var cajaprincipal = document.getElementById("cambioimg2");
  //la imagen a cambiar   
  var imgprincipal = document.getElementById("cambioimg");
  cajaprincipal.replaceChild(cln,imgprincipal);
  document.getElementById("clonimg9").setAttribute("id", "cambioimg");
  
}
function myFchangeimg10(){
  var elmnt = document.getElementById("clonimg10");
  var cln = elmnt.cloneNode(true);
  var cajaprincipal = document.getElementById("cambioimg2");
  //la imagen a cambiar   
  var imgprincipal = document.getElementById("cambioimg");
  cajaprincipal.replaceChild(cln,imgprincipal);
  document.getElementById("clonimg10").setAttribute("id", "cambioimg");
  
}
function myFchangeimg11(){
  var elmnt = document.getElementById("clonimg11");
  var cln = elmnt.cloneNode(true);
  var cajaprincipal = document.getElementById("cambioimg2");
  //la imagen a cambiar   
  var imgprincipal = document.getElementById("cambioimg");
  cajaprincipal.replaceChild(cln,imgprincipal);
  document.getElementById("clonimg11").setAttribute("id", "cambioimg");
  
}
function myFchangeimg12(){
  var elmnt = document.getElementById("clonimg12");
  var cln = elmnt.cloneNode(true);
  var cajaprincipal = document.getElementById("cambioimg2");
  //la imagen a cambiar   
  var imgprincipal = document.getElementById("cambioimg");
  cajaprincipal.replaceChild(cln,imgprincipal);
  document.getElementById("clonimg12").setAttribute("id", "cambioimg");
  
}
function myFchangeimg13(){
  var elmnt = document.getElementById("clonimg13");
  var cln = elmnt.cloneNode(true);
  var cajaprincipal = document.getElementById("cambioimg2");
  //la imagen a cambiar   
  var imgprincipal = document.getElementById("cambioimg");
  cajaprincipal.replaceChild(cln,imgprincipal);
  document.getElementById("clonimg13").setAttribute("id", "cambioimg");
  
}
function myFchangeimg14(){
  var elmnt = document.getElementById("clonimg14");
  var cln = elmnt.cloneNode(true);
  var cajaprincipal = document.getElementById("cambioimg2");
  //la imagen a cambiar   
  var imgprincipal = document.getElementById("cambioimg");
  cajaprincipal.replaceChild(cln,imgprincipal);
  document.getElementById("clonimg14").setAttribute("id", "cambioimg");
  
}
function myFchangeimg15(){
  var elmnt = document.getElementById("clonimg15");
  var cln = elmnt.cloneNode(true);
  var cajaprincipal = document.getElementById("cambioimg2");
  //la imagen a cambiar   
  var imgprincipal = document.getElementById("cambioimg");
  cajaprincipal.replaceChild(cln,imgprincipal);
  document.getElementById("clonimg15").setAttribute("id", "cambioimg");
  
}
function myFchangeimg16(){
  var elmnt = document.getElementById("clonimg16");
  var cln = elmnt.cloneNode(true);
  var cajaprincipal = document.getElementById("cambioimg2");
  //la imagen a cambiar   
  var imgprincipal = document.getElementById("cambioimg");
  cajaprincipal.replaceChild(cln,imgprincipal);
  document.getElementById("clonimg16").setAttribute("id", "cambioimg");
}









