<?php

if(isset($_GET['id']) ) {
    $goods_sn = $_GET['id'];
}

if(isset($_GET['wh']) ) {
    $wh = $_GET['wh'];
}


    $post_data = array(
        'token' => 'bd8d50639ef24bd4810b19e96ca54994',
        'goods_sn' => json_encode($goods_sn),
        'warehouse' => $wh,
    );
    $api_url="https://gloapi.chinabrands.com/v2/product/stock";
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