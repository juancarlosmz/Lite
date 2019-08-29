<?php
    $post_data = array(
    'token' => '08883598669a0f1a24e80ce5d62925db',
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