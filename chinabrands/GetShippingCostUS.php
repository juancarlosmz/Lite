<?php
    

    include 'connbd.php';
    $sql = "SELECT tokenserial FROM tokentable where compare=1";
    $result = $connection->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $eltoken =  $row["tokenserial"];
        }
    } else {
        echo "0 results";
    }
    //api
    if(isset($_GET['sku']) ) {
        $sku = $_GET['sku'];
    }
    if(isset($_GET['warehouse']) ) {
        $warehouse = $_GET['warehouse'];
    }
    if(isset($_GET['country']) ) {
        $country = $_GET['country'];
    }
    if(isset($_GET['zipcode']) ) {
        $zipcode = $_GET['zipcode'];
    }
    $goods = array(
        array(
            'sku' => $sku,
            'quantity' => '1',
        ),
    );
    $post_data = array(
        'token' => $eltoken,
        'country' => $country,
        'warehouse' => $warehouse,
        'goods' => json_encode($goods),
        'shipping' => 'USPSEXPWHW',
        'zip_code' => $zipcode,
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
    $connection->close();

    

?>