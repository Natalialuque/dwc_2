<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$datos = json_decode(file_get_contents("php://input"), true);

if (!$datos || !isset($datos["shortName"])) {
    http_response_code(400);
    echo json_encode(["error" => "Datos no válidos"]);
    exit;
}

$archivo = 'equipos.json';

if (!file_exists($archivo)) {
    http_response_code(500);
    echo json_encode(["error" => "Archivo equipos.json no encontrado"]);
    exit;
}

$contenido = json_decode(file_get_contents($archivo), true);

if (!$contenido || !isset($contenido["teams"])) {
    http_response_code(500);
    echo json_encode(["error" => "Formato de equipos.json inválido"]);
    exit;
}

// calcular el siguiente id disponible
$maxId = 0;
foreach ($contenido["teams"] as $equipo) {
    if (isset($equipo["id"]) && $equipo["id"] > $maxId) $maxId = $equipo["id"];
}

$tla = strtoupper(substr(preg_replace('/[^A-Za-z]/', '', $datos["shortName"]), 0, 3));

$nuevoEquipo = [
    "id"          => $maxId + 1,
    "name"        => $datos["shortName"],
    "shortName"   => $datos["shortName"],
    "tla"         => $tla,
    "crest"       => $datos["crest"],
    "address"     => "",
    "website"     => $datos["website"] ?? "",
    "founded"     => isset($datos["founded"]) ? intval($datos["founded"]) : null,
    "clubColors"  => "",
    "venue"       => $datos["venue"] ?? "",
    "lastUpdated" => gmdate("Y-m-d\TH:i:s\Z")
];

$contenido["teams"][] = $nuevoEquipo;
$contenido["count"]   = count($contenido["teams"]);

$resultado = file_put_contents($archivo, json_encode($contenido, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

if ($resultado === false) {
    http_response_code(500);
    echo json_encode(["error" => "No se pudo escribir en el archivo"]);
} else {
    echo json_encode(["exito" => true, "equipo" => $nuevoEquipo]);
}
