<?php

//$goods_sn = '165460401'; //字符串
//$goods_sn = array('165460401','182079101'); //数组
$goods_sn = '436370801,251167301,185319001,270482201,436013501,174074501,168875901,270364901,405247701,226998001,449161701';
$post_data = array(
'token' => '1417dd81329c215ab7d4a8478e989587',
'goods_sn' => json_encode($goods_sn)
);
$api_url="https://gloapi.chinabrands.com/v2/product/index";
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