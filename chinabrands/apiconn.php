<?php

$client_secret = '288f003a5d67419873552a872e8a3248';
$data = array(
    'email' => 'mulintemple@yahoo.com',
    'password' => 'mu2019@China',
    'client_id' => '1432875825'
);


$json_data = json_encode($data);
$signature_string = md5($json_data.$client_secret);//datos de firma 
$post_data = 'signature='.$signature_string.'&data='.urlencode($json_data);
$api_url = "https://cnapi.chinabrands.com/v2/user/login";
$curl = curl_init($api_url);
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
$result = curl_exec($curl); //resultado de retorno
echo $result;
curl_close($curl);
?>