<?php

if(isset($_GET['id']) ) {
    $goods_sn = $_GET['id'];

    $post_data = array(
        'token' => '66449af2197e88c1b50a4bb1439734d0',
        'goods_sn' => json_encode($goods_sn),
        'warehouse' => 'YB'
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
}
?>