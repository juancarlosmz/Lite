
<?php
    $post_data = array(
        'token' => '37ec81c7c15c59b7525b09225cb1ba4d',
        'type' => 0,
        'per_page' => 100,
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
    curl_close($curl);
    echo $result;
?>