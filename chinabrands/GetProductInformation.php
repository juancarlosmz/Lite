<?php

//$goods_sn = '165460401'; //字符串
//$goods_sn = array('165460401','182079101'); //数组

if(isset($_GET['id']) ) {
    $goods_sn = $_GET['id'];



    $post_data = array(
    'token' => '7ab35dad268d426303a3317c84711276',
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
}
?>