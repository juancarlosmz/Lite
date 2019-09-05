<?php

    session_start(); 
    if(isset($_GET['sku']) ) {
        $sku = $_GET['sku'];
    }
    if(isset($_GET['warehouse']) ) {
        $warehouse = $_GET['warehouse'];
    }
    if(isset($_GET['country']) ) {
        $country = $_GET['country'];
    }
    $goods = array(
        array(
            'sku' => $sku,
            'quantity' => '1',
        ),
    );
    $post_data = array(
        //'token' => 'b519738173bec5630f0f1cdf15a77e87',
        'token' => $_SESSION['eltoken'], 
        'country' => $country,
        'warehouse' => $warehouse,
        'goods' => json_encode($goods),
        'platform_id' => 1
    );
    $api_url="https://cnapi.chinabrands.com/v2/shipping/cost";
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