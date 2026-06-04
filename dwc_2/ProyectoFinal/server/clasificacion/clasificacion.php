<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$token_api = '33af44a92a5d43d4a70d41cabac97a37';
$url = 'https://api.football-data.org/v4/competitions/PD/standings';
$nombre_archivo = 'clasificacion.json';

$opciones = [
    "http" => [
        "header" => "X-Auth-Token: " . $token_api . "\r\n",
        "method" => "GET"
    ]
];

$contexto = stream_context_create($opciones);
$respuesta = file_get_contents($url, false, $contexto);

if ($respuesta === FALSE) {
    http_response_code(500);
    echo json_encode(["error" => "Error al conectar con la API externa"]);
    exit;
}

$datos = json_decode($respuesta, true);

$contenido_a_guardar = $respuesta;
$mensaje = "Datos reales actualizados correctamente.";

$resultado_guardado = file_put_contents($nombre_archivo, $contenido_a_guardar);

if ($resultado_guardado === false) {
    http_response_code(500);
    echo json_encode(["error" => "No se pudo escribir en el archivo"]);
} else {
    echo json_encode([
        "exito" => true,
        "mensaje" => $mensaje,
        "bytes" => $resultado_guardado
    ]);
}