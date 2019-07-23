<?php
// Cargamos Vendor
require __DIR__ . '/vendor/autoload.php';
$pdo = new PDO('mysql:host=localhost;dbname=IHM_DB;charset=utf8', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
$fluent = new FluentPDO($pdo);
$action = isset($_GET['a']) ? $_GET['a'] : null;
switch($action) {
    case 'listar':
        header('Content-Type: application/json');
        print_r(json_encode(listar($fluent)));
        break;
    case 'obtener':
        header('Content-Type: application/json');
        print_r(json_encode(obtener($fluent, $_GET['id'])));
        break;
    case 'registrar':
        header('Content-Type: application/json');
        $data = json_decode(utf8_encode(file_get_contents("php://input")), true);
        print_r(json_encode(registrar($fluent, $data)));
        break;
    case 'eliminar':
        header('Content-Type: application/json');
        print_r(json_encode(eliminar($fluent, $_GET['id'])));
        break;
    case 'startlogin':
        session_start();
        $form_data = json_decode(file_get_contents("php://input"));
        print_r(json_encode(startlogin($fluent, $form_data->data->email,$form_data->data->password)));
/*
        $form_data = json_decode(file_get_contents("php://input"));
        $validation_error = '';
        if(empty($form_data->email)){
            $error[] = 'Email is Required';
        }else{
            if(!filter_var($form_data->email, FILTER_VALIDATE_EMAIL)){
                $error[] = 'Invalid Email Format';
            }else{
                $data[':email'] = $form_data->email;
            }
        }
        if(empty($form_data->password)){
            $error[] = 'Password is Required';
        }
        if(empty($error)){
            $query = "
            SELECT * FROM user 
            WHERE email = :email
            ";
            $statement = $connect->prepare($query);
            if($statement->execute($data)){
                $result = $statement->fetchAll();
                if($statement->rowCount() > 0){
                    foreach($result as $row){
                        if(password_verify($form_data->password, $row["password"])){
                            $_SESSION["name"] = $row["name"];
                        }else{
                            $validation_error = 'Wrong Password';
                        }
                    }
                }else{
                    $validation_error = 'Wrong Email';
                }
            }
        }else{
            $validation_error = implode(", ", $error);
        }
        $output = array(
        'error' => $validation_error
        );
        echo json_encode($output);
*/        
        break;
}
function listar($fluent){
    return $fluent
         ->from('user')
         ->select('user.nombre, user.apellido, user.email, user.sexo, user.fnacimiento')
         ->orderBy("id DESC")
         ->fetchAll();
}
function obtener($fluent, $id){
    return $fluent->from('user', $id)
                  ->select('user.*, user.Nombre as User')
                  ->fetch();
}
function eliminar($fluent, $id){
    $fluent->deleteFrom('user', $id)
             ->execute();   
    return true;
}
function registrar($fluent, $data){
    /*$data['FechaRegistro'] = date('Y-m-d');*/
    $fluent->insertInto('user', $data)
           ->execute();    
    return true;
}

function startlogin($fluent,$email,$contra){
    $fluent->from('user')
           ->select('user.*') 
           ->where('email = ? and contra = ?',$email,$contra)
           ->fetch();
    return true;  
}


//TESTS
/*
$test = $fluent->from('user', 3)
->select('user.*, user.Nombre as User')
->fetch();
print_r(json_encode($test));
*/
/*
    $query2 = $fluent->from('user')
            ->select('email,contra')
            ->where('email = ? and contra = ?','jj@gmail.com','jj')
            ->fetch();   
        print_r(json_encode($query2));
*/

?>

<?php  

     if(!isset($_POST) || empty($_POST)) { 
      
     ?> 

<html>
<form method="post" action="">
    <input type="text" name="email" action="">  
    <input type="password" name="contra">
    <button type="submit">Log in</button>
</form>
</html>
    
   <?php  

        } else { 
        $example = file_get_contents("php://input");  
        $rest = explode("&",$example);  
        $email = explode("email=",$rest[0]); 
        $contra = explode("contra=",$rest[1]);
        echo rawurldecode($email[1])."<br>";
        echo rawurldecode($contra[1])."<br>";
        
        $query2 = $fluent->from('user')
            ->select('email,contra')
            ->where('email = ? and contra = ?',rawurldecode($email[1]),rawurldecode($contra[1]))
            ->fetch();   
        print_r(json_encode($query2));     

    }  
   
   ?>


   