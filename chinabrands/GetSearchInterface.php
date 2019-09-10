
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
    $page = '1'; 
    $category = '';  
    $todayis = date('Y-m-d\TH:i:sP');
    $lastdateis = date("Y-m-d\TH:i:sP",strtotime($todayis."- 12 month"));
    if(isset($_GET['category']) ) {
        $category = $_GET['category'];
    }
    if(isset($_GET['page']) ) {
        $page = $_GET['page'];
    }  
    $post_data = array(
        'token' => $eltoken ,
        'cat_id' => $category,
        'sale_date_start' => $lastdateis,//'2019-05-01T11:00:00+08:00',
        'sale_date_end' => $todayis,//'2019-08-15T11:00:00+08:00',
        'page_number' => $page,
        'per_page' => '100',
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
    $connection->close();


    

   
?>