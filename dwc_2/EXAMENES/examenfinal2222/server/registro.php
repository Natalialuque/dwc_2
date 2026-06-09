<?php 
/// Obtenemos el json enviado
$data = file_get_contents('php://input');
// Los convertimos en un array
$data = json_decode($data);

$salida = "Recibido CORRECTAMENTE nuevo usuario: " . $data->nombre; 
$salida = $salida . ". Apellidos: " . $data->apellidos;
$salida = $salida . ". Email: " . $data->email;
$salida = $salida . ". Login: " . $data->login;
$salida = $salida . ", en el Servidor";


echo $salida;
?>