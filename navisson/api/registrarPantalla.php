<?php
// Indicamos que la respuesta del servidor sera JSON
header("Content-Type: application/json; charset=utf-8");

// Leemos el cuerpo completo que llega por fetch POST
$entrada = file_get_contents("php://input");
// Convertimos el JSON recibido en un array asociativo de PHP
$pantalla = json_decode($entrada, true);

// Comprobamos que haya datos y que venga la referencia de la pantalla
if (!$pantalla || !isset($pantalla["referencia"])) {
    // Si faltan datos devolvemos error 400 de petición incorrecta
    http_response_code(400);
    // Enviamos una respuesta JSON explicando el fallo
    echo json_encode([
        "ok" => false,
        "mensaje" => "Datos de pantalla no validos"
    ]);
    // Paramos el script para no guardar nada mal
    exit;
}

// Ruta del archivo donde se guardan las altas recibidas
$rutaArchivo = __DIR__ . "/../json/altas-pantallas.json";
// Array donde cargaremos las altas anteriores
$altas = [];

// Si el archivo existe, intentamos leer su contenido
if (file_exists($rutaArchivo)) {
    // Leemos el JSON guardado anteriormente
    $contenido = file_get_contents($rutaArchivo);
    // Convertimos ese JSON en array de PHP
    $altas = json_decode($contenido, true);

    // Si el contenido esta roto o no es un array, empezamos desde cero
    if (!is_array($altas)) {
        $altas = [];
    }
}

// Añadimos una nueva alta con fecha y datos de la pantalla
$altas[] = [
    "fechaAlta" => date("Y-m-d H:i:s"),
    "pantalla" => $pantalla
];

// Guardamos todas las altas otra vez en formato JSON bonito
file_put_contents($rutaArchivo, json_encode($altas, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// Respondemos al fetch indicando que todo ha ido bien
echo json_encode([
    "ok" => true,
    "mensaje" => "Pantalla registrada en servidor",
    "totalAltas" => count($altas)
]);
