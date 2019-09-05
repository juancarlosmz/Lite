<?php

$todayis = date('Y-m-d\TH:i:sP');

$lastdateis = date("Y-m-d\TH:i:sP",strtotime($todayis."- 3 month"));


echo $todayis;
echo '</br>';
echo $lastdateis;


?>