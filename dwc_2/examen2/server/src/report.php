<?php
// Permitir acceso y definir formato JSON
header('Content-Type: application/json');

// Leer el flujo de entrada (input stream) para obtener el JSON de Fetch
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "No se recibieron datos"]);
    exit;
}

// Simulación de procesamiento y guardado en BD
$id_incidencia = rand(1000, 9999);
$usuario = $data['user'] ?? 'Anónimo';

$respuesta = [
    "status" => "ok",
    "id" => $id_incidencia,
    "message" => "Incidencia registrada correctamente por el usuario: $usuario",
    "timestamp" => date('c'),
    "echo_data" => $data
];

echo json_encode($respuesta);
?>