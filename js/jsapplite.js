/*
document.getElementById("onClickL").onclick = function() {myonClickLFunction()};

function myonClickLFunction() {
  document.getElementById("contleft").style.display = "none";
}

var URLactual = window.location;
if(URLactual == "http://localhost:50/Lite/#/"){
  document.getElementById("contleft").style.display = "block";
}else if(URLactual == "http://localhost:50/Lite/#/login"){
  document.getElementById("contleft").style.display = "none";
}
*/

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
/*
window.onload = function(){ 
    console.log("window.onload"); 
}
*/

