<?php
// Cargamos Vendor
require __DIR__ . '/vendor/autoload.php';
$pdo = new PDO('mysql:host=localhost;dbname=IHM_DB;charset=utf8', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
$fluent = new FluentPDO($pdo);
$action = isset($_GET['a']) ? $_GET['a'] : null;
//

//
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

        print_r(json_encode(registro($fluent, $data)));
        break;
    case 'registrarImportList'
        header('Content-Type: application/json');
        $data = json_decode(utf8_encode(file_get_contents("php://input")), true);
        print_r(json_encode($data));
        //print_r(json_encode(registroImportList($fluent, $data)));
        break;
    case 'eliminar':
        header('Content-Type: application/json');
        print_r(json_encode(eliminar($fluent, $_GET['id'])));
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
 


   