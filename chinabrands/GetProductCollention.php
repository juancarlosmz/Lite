<?php

//$goods_sn = '165460401'; //字符串
//$goods_sn = array('165460401','182079101'); //数组
$goods_sn = '165460401,182079101,289646001,239432101,PB0110101,
448280101,450522101,182075701,132565301,447506501'; //以英文逗号分隔
$post_data = array(
'token' => '7eeb116ea0472d5d129263049da34eee',
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