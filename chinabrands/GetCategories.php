<?php
$post_data = array(
'token' => '8f3b3d7df515f0534620a99fbadf7785',
);
$api_url = "https://cnapi.chinabrands.com/v2/category/index";
$curl = curl_init($api_url);
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
$result = curl_exec($curl); 
echo $result;
curl_close($curl);

?>