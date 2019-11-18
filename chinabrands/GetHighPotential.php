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

    $sql2 = "SELECT * FROM highpotential";
    $result2 = $connection->query($sql2);
    if ($result2->num_rows > 0) {
        while($row = $result2->fetch_assoc()) {
            $losskus =  $row["skus"];
        }
    } else {
        echo "0 results";
    }
    //api
    //$goods_sn = '455449301 ,454731501 ,453853101 ,453315901 ,453816401 ,453782601 ,454652001 ,186648801   ,451655801 ,219807001  ,451787001,282680901,450522101,454739801  '; //以英文逗号分隔
    $goods_sn = $losskus;
    $post_data = array(
        'token' => $eltoken,
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
    $connection->close();
?>