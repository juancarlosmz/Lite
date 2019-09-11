<?php
// Cargamos Vendor
require __DIR__ . '/vendor/autoload.php';
$pdo = new PDO('mysql:host=localhost;dbname=IHM_DB;charset=utf8', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
$fluent = new FluentPDO($pdo);
$action = isset($_GET['a']) ? $_GET['a'] : null;
//

//mi segunda coneccion xd
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
//
switch($action) {
    case 'conexiontoken':
        header('Content-Type: application/json');
        print_r(json_encode(conntoken($fluent)));
        break;
    case 'listar':
        header('Content-Type: application/json');
        print_r(json_encode(listar($fluent)));
        break;
    case 'obtener':
        header('Content-Type: application/json');
        print_r(json_encode(obtener($fluent, $_GET['id'])));
        break;
    case 'obtenerImportList':
        header('Content-Type: application/json');
        //print_r(json_encode($_GET['email']));
        print_r(json_encode(obtenerImportList($fluent, $_GET['email'])));
        break;
    case 'registrar':
        header('Content-Type: application/json');
        $data = json_decode(utf8_encode(file_get_contents("php://input")), true);
        print_r(json_encode(registro($fluent, $data)));
        break;
    case 'registrarImportList':
        header('Content-Type: application/json');
        $data = json_decode(utf8_encode(file_get_contents("php://input")), true);
        //print_r(json_encode($data));
        print_r(json_encode(registroImportList($fluent, $data)));
        break;
    case 'registrarAllSKUs':
        
        header('Content-Type: application/json');
        $data = json_decode(utf8_encode(file_get_contents("php://input")), true);
        $allsku = $data['ImportList'];
        $valores = [];
        for ($i = 1, $l = count($allsku); $i < $l; $i++){
            $valores[] = "('" . NULL . "', '" . $allsku[$i] . "' , '' , '" . 1 . "' , '')";
        }
        $sql = "INSERT INTO AllSKUs (id, sku, warehouse, idcategoria,status)
        VALUES ".implode(', ', $valores)."";
        if ($connection->multi_query($sql) === TRUE){
            print_r(json_encode('New records created successfully'));
        }else{
            print_r(json_encode('Error:'. $sql . "<br>" . $connection->error));
        }
        $connection->close();
        break; 
    case 'registrarProductosPHP':    
        header('Content-Type: application/json');
        $data = json_decode(utf8_encode(file_get_contents("php://input")), true);
        $allsku = $data['Mysku'];
        $allencrypted_sku = $data['Myencrypted_sku'];
        $alltitle = $data['Mytitle'];
        $allcolor = $data['Mycolor'];
        $alloriginal_img = $data['Myoriginal_img'];
        $allcat_id = $data['Mycat_id'];
        $allparent_id = $data['Myparent_id'];
        $allsize = $data['Mysize'];

        //$valores = "('" . $allsku . "', '" . $allencrypted_sku . "' , '" . $alltitle . "' , '" . $allcolor . "' , '" . $alloriginal_img ."' , '". $allcat_id . "' , '" . $allparent_id . "' , '". $allsize ."' )";
        $valores = '("' . $allsku . '", "' . $allencrypted_sku . '" , "' . $alltitle . '" , "' . $allcolor . '" , "' . $alloriginal_img .'" , "'. $allcat_id . '" , "' . $allparent_id . '" , "'. $allsize .'" )';

        $sql = "INSERT INTO product (sku, encrypted_sku, title, color,original_img,cat_id,parent_id,size)
        VALUES $valores";
        if ($connection->multi_query($sql) === TRUE){
            print_r(json_encode('New records created successfully'));
        }else{
            print_r(json_encode('Error:'. $sql . "<br>" . $connection->error));
        }
        $connection->close();

        //print_r(json_encode($valores));
        //print_r(json_encode($allsku.' | '.$allencrypted_sku.' | '.$alltitle.' | '.$allcolor.' | '.$alloriginal_img.' | '.$allcat_id.' | '.$allparent_id.' | '.$allsize));
        
        break;
    case 'listarAllSKUs':
        header('Content-Type: application/json');
        print_r(json_encode(listarSKUs($fluent)));
        break;       
    case 'eliminar':
        header('Content-Type: application/json');
        print_r(json_encode(eliminar($fluent, $_GET['id'])));
        break;  
    case 'eliminarUserList':
        header('Content-Type: application/json');
        print_r(json_encode(eliminarUList($fluent, $_GET['id'])));
        break;     
    case 'User':
        header('Content-Type: application/json');
        print_r(json_encode(obtenerUser($fluent, $_GET['email'])));
        break;  
    case 'Login':
        header('Content-Type: application/json');
        $data = json_decode(utf8_encode(file_get_contents("php://input")), true);
        
        $em = $data['email'];
        $pass = $data['password'];
        if(SesionLogin($fluent,$em,$pass)){
            session_start();
            //$_SESSION['id'] = uniqid('ang_');
            //print_r(json_encode($_SESSION['id'] ));
            print_r(json_encode(SesionLogin($fluent,$em,$pass)));
        }else{
            print_r(json_encode(false));
        }
        break;
    case 'valemail':
        header('Content-Type: application/json');
        $data = json_decode(utf8_encode(file_get_contents("php://input")), true);
        $em = $data['email'];
        if(ValueEmail($fluent,$em)){
            print_r(json_encode(true));
        }else{
            print_r(json_encode(false));
        }
        break;    
    case 'Logout':
        session_id('id');
        session_start();
        session_destroy();
        session_commit();
        break;     
}



function SesionLogin($fluent, $email,$contra){
    return $fluent->from('user')
           ->select('user.*') 
           ->where('email = ? and contra = ?',$email,$contra)
           ->fetch();
}
function ValueEmail($fluent, $email){
    return $fluent
           ->from('user')
           ->select('user.nombre') 
           ->where('email = ?',$email)
           ->fetch();
}

function listar($fluent){
    return $fluent
         ->from('user')
         ->select('user.nombre, user.apellido, user.email')
         ->where('rol = 2')
         ->orderBy("id DESC")
         ->fetchAll();
}
function listarSKUs($fluent){
    return $fluent
         ->from('AllSKUs')
         ->fetchAll();
}

function obtener($fluent, $id){
    return $fluent->from('user', $id)
                  ->select('user.*, user.Nombre as User')
                  ->fetch();
}
function obtenerImportList($fluent, $email){
    return $fluent->from('ImportList')
           ->select('ImportList.*') 
           ->where('email = ? and status = 1',$email)
           ->fetchAll();
}
function eliminar($fluent, $id){
    $fluent->deleteFrom('user', $id)
             ->execute();   
    return true;
}
function eliminarUList($fluent, $id){
    $values = array('status' => '0');
    $fluent ->update('ImportList')
            ->set($values)
            ->where('id = ?',$id)
            ->execute();   
    return true;
}

function registro($fluent, $data){
    $data['rol'] = 2;
    $fluent->insertInto('user', $data)
           ->execute();    
    return true;
}
function registroImportList($fluent, $data){
    $data['status'] = 1;
    $data['fecha'] = date('Y-m-d');
    $fluent->insertInto('ImportList', $data)
           ->execute();    
    return true;
}

function registroAllSKUs($fluent, $data){
    $fluent->insertInto('AllSKUs', $data)
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

function loginlist($fluent){
    return $fluent
         ->from('user')
         ->fetchAll(); 
}
function obtenerUser($fluent, $email){
    return $fluent->from('user')
         ->select('user.*, user.Nombre as User')
         ->where('email = ?',$email)
         ->fetch();
}

   ?>
 


   