
<?php
$goods_sn = json_decode($_POST['myData']);
$post_data = array(
'token' => '37ec81c7c15c59b7525b09225cb1ba4d',
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