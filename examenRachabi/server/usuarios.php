<?php
// Habilitar CORS si el frontend está en otro dominio
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Array de usuarios simulados
$usuarios = [
    ["login" => "admin", "password" => "1234", "rol" => "admin", "fecha_registro" => "2023-01-10"],
    ["login" => "usuario1", "password" => "abcd", "rol" => "user", "fecha_registro" => "2024-02-15"],
    ["login" => "usuario2", "password" => "5678", "rol" => "user", "fecha_registro" => "2022-11-20"]
];

// Obtener los datos del POST
$data = json_decode(file_get_contents("php://input"), true);

$login = $data['login'] ?? '';
$password = $data['password'] ?? '';

// Buscar el usuario en el array
foreach ($usuarios as $usuario) {
    if ($usuario["login"] === $login && $usuario["password"] === $password) {
        echo json_encode([
            "status" => "success",
            "rol" => $usuario["rol"],
            "fecha_registro" => $usuario["fecha_registro"]
        ]);
        exit;
    }
}

// Si no se encuentra el usuario
echo json_encode(["status" => "error", "message" => "Credenciales incorrectas"]);
exit;
?>