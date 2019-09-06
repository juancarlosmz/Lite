<?php
    include 'connbd.php';
    $sql = "SELECT tokenserial FROM tokentable where compare=1";
    $result = $connection->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $eltoken =  $row["tokenserial"];
            echo 'El token: '.$eltoken;
        }
    } else {
        echo "0 results";
    }
    $connection->close();
?>