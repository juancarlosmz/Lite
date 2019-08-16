
<?php
$page = '1';
if(isset($_GET['page']) ) {
    $page = $_GET['page'];
}  

    $post_data = array(
        'token' => 'a8811442f0ab22c3676ad8a2aa0776ae',
        'cat_id' => '1',
        'sale_date_start' => '2000-03-12T11:00:00+08:00',
        'sale_date_end' => '2019-08-15T11:00:00+08:00',
        'page_number' => $page,
    );
    $api_url = "https://gloapi.chinabrands.com/v2/product/search-sku";
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