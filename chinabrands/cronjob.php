<?php
//https://www.youtube.com/watch?v=ZsxQenUjt5U

$msg = "This is a test for send mail, use cronjob";

//si las lineas hacen mas de 70 caracteres
$msg = wordwrap($msg,70);
mail("programador20@apolomultimedia.com",$msg);


?>