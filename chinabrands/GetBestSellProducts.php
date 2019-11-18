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

    $sql2 = "SELECT * FROM bestselling";
    $result2 = $connection->query($sql2);
    if ($result2->num_rows > 0) {
        while($row = $result2->fetch_assoc()) {
            $losskus =  $row["skus"];
        }
    } else {
        echo "0 results";
    }

    //api
    //$goods_sn = '448280101 ,452550401 ,457680301   ,270482201,285556702 ,217027701 ,212232401  ,270364901,405247701,226998001,449161701,437677201,189036101,437511401   ';
    $goods_sn = $losskus;
            $post_data = array(
            'token' => $eltoken,
            //'token' => $_SESSION['eltoken'], 
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