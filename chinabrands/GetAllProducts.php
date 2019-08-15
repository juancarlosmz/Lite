<?php

    $post_data = array(
    'token' => '027aea7889c0491607588e6eb0d0a869',
    'type' => 0,
    'per_page' => 50,
    'page_number' => 1,
    );
    $api_url="https://cnapi.chinabrands.com/v2/user/inventory";
    $curl = curl_init($api_url);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
    $result = curl_exec($curl); //返回结果
    //$todos = json_decode($result,true);
    curl_close($curl);
    //print_r($todos);
    echo $result;
?>