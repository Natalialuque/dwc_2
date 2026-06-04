<?php
header("Content-Type: application/xml; charset=UTF-8");

// ESTE EJEMPLO ES UN PHP QUE CONTIENE XML

// Array de usuarios simulados
$usuarios = [
    ["login" => "admin", "password" => "1234", "rol" => "admin", "fecha_registro" => "2023-01-10"],
    ["login" => "usuario1", "password" => "abcd", "rol" => "user", "fecha_registro" => "2024-02-15"],
    ["login" => "usuario2", "password" => "5678", "rol" => "user", "fecha_registro" => "2022-11-20"]
];

// Obtener el XML enviado por el cliente
$xmlstr = file_get_contents("php://input");
$data = new SimpleXMLElement($xmlstr);

$login = (string)$data->login;
$password = (string)$data->password;

// Buscar usuario
foreach ($usuarios as $usuario) {
    if ($usuario["login"] === $login && $usuario["password"] === $password) {

        echo "<respuesta>
                <status>success</status>
                <rol>{$usuario['rol']}</rol>
                <fecha_registro>{$usuario['fecha_registro']}</fecha_registro>
              </respuesta>";
        exit;
    }
}

// Si no coincide
echo "<respuesta>
        <status>error</status>
        <message>Credenciales incorrectas</message>
      </respuesta>";
exit;
?>
