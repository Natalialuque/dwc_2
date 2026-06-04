<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$token_api = '33af44a92a5d43d4a70d41cabac97a37';
$nombre_archivo = 'ligasClasificaciones.json';

$ligas = [
    "LaLiga"         => "PD",
    "PremierLeague"  => "PL",
    "SerieA"         => "SA",
    "Ligue1"         => "FL1",
    "Bundesliga"     => "BL1"
];

$opciones = [
    "http" => [
        "header" => "X-Auth-Token: " . $token_api . "\r\n",
        "method" => "GET"
    ]
];

$contexto = stream_context_create($opciones);
$clasificaciones = [];

foreach ($ligas as $nombre => $codigo) {
    $url = 'https://api.football-data.org/v4/competitions/' . $codigo . '/standings';
    $respuesta = file_get_contents($url, false, $contexto);

    if ($respuesta === FALSE) {
        http_response_code(500);
        echo json_encode(["error" => "Error al conectar con la API para la liga: " . $nombre]);
        exit;
    }

    $datos = json_decode($respuesta, true);
    $clasificaciones[$nombre] = $datos['standings'][0]['table'] ?? [];
}

$resultado_guardado = file_put_contents($nombre_archivo, json_encode($clasificaciones));

if ($resultado_guardado === false) {
    http_response_code(500);
    echo json_encode(["error" => "No se pudo escribir en el archivo"]);
} else {
    echo json_encode([
        "exito"   => true,
        "mensaje" => "Clasificaciones actualizadas correctamente.",
        "bytes"   => $resultado_guardado
    ]);
}