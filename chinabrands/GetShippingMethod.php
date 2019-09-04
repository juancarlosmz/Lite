<?php

    $post_data = array(
        'token' => '1d6a4f8f6846153a8d06d49eec6591e9',
    );
    $api_url="https://cnapi.chinabrands.com/v2/shipping/index";
    $curl = curl_init($api_url);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
    $result = curl_exec($curl); //返回结果
    curl_close($curl);
    echo $result;

?>