<?php
header("Content-Type: application/json; charset=UTF-8");

// Simulamos una base de datos muy simple
$usuarios = [
    "natalia" => "1234",
    "pepe"    => "abcd",
    "maria"   => "pass"
];

// Comprobamos si llegan los parámetros
if (!isset($_POST["usuario"]) || !isset($_POST["password"])) {
    echo json_encode([
        "ok" => false,
        "mensaje" => "Faltan parámetros"
    ]);
    exit;
}

$usuario = $_POST["usuario"];
$password = $_POST["password"];

// Validamos usuario y contraseña
if (array_key_exists($usuario, $usuarios) && $usuarios[$usuario] === $password) {
    echo json_encode([
        "ok" => true,
        "mensaje" => "Login correcto",
        "fecha" => date("Y-m-d H:i:s")
    ]);
} else {
    echo json_encode([
        "ok" => false,
        "mensaje" => "Usuario o contraseña incorrectos",
        "fecha" => date("Y-m-d H:i:s")
    ]);
}
?>
