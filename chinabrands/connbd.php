<?php
    //creando nueva coneccion
    $HostName = "localhost"; 
    $UserName = "root"; 
    $Password = ""; 
    $dbname="IHM_DB";     
    // Create connection 
    $connection = new mysqli($HostName, $UserName, $Password, $dbname);      
    // Check connection 
    if ($connection->connect_error){
        die("Connection failed: " . $connection->connect_error);
    }

?>