<?php

//Tables & Accessories Falta pagina 4 a 12
//$goods_sn = $_POST['arreglo'];
//$goods_sn = explode(',', $goods_sn);


$goods_sn = '413444001,274234801,398390001,396523501,311213301,376184501,277404702,455449301,445598304,366356901,377504702,205235202,274423501,455403901,455132801,455401801,454932101,455282301,437490201,454899901,454777301,436003201,445894201,454731902,293829502,454731501,454652001,454651702,453853101,453853301,453816401,453782601,453813001,453345604,453316301,453340602,453315901,437421101,406703703,255292601,453307201,453307501,453682201,453307104,453306501,307562101,453168801,255292502,259604601,252415601,453310201,363012001,235299401,237791301,237791401,453135701,308336601,449742301,451203801,445604702,452614801,452615201,447125801,447125601,447125101,447125301,447125401,447125501,452232101,450009601,449932401,450897501,451787001,283942903,451655801,437613402,447741102,273019402,450913514,375907101,440855602,440855501,450340701,450191401,450193001,450193701,450194301,450195001,450072801,EU0106501,448553801,448698801,450256301,377977801,445838101,446295001';
//,449744901,449748601,265616302,277405101,449613501,358654801,449632201,449636101,449632801,449438702,449415601,285621201,334244701,449161701,442796801,285621201,334244701,449161701,442796801,278719001,448690201,448757001,448881501,449048701,449057001,448675401,448574101
$post_data = array(
'token' => '66449af2197e88c1b50a4bb1439734d0',
'goods_sn' => json_encode($goods_sn)
);
$api_url="https://cnapi.chinabrands.com/v2/product/index";
$curl = curl_init($api_url);
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
$result = curl_exec($curl); //返回结果
echo $result;
curl_close($curl);

?>