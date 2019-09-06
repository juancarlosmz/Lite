
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
    $post_data = array(
        'token' => $eltoken,
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
    echo $result;
    curl_close($curl); 
    $connection->close(); 
?>