<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$token_api = '33af44a92a5d43d4a70d41cabac97a37';
$url = 'https://api.football-data.org/v4/matches';
$nombre_archivo = 'partidos.json';

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

// si no hay partidos se inventan
if (empty($datos['matches'])) {
    $partidos_falsos = [
        "matches" => [
            [
                "id" => 501,
                "utcDate" => date('Y-m-d') . "T21:00:00Z",
                "status" => "TIMED",
                "competition" => [
                    "name" => "UEFA Champions League",
                    "emblem" => "https://crests.football-data.org/CL.png"
                ],
                "homeTeam" => [
                    "shortName" => "Real Madrid",
                    "crest" => "https://crests.football-data.org/86.svg"
                ],
                "awayTeam" => [
                    "shortName" => "Man City",
                    "crest" => "https://crests.football-data.org/65.svg"
                ]
            ],
            [
                "id" => 502,
                "utcDate" => date('Y-m-d') . "T21:00:00Z",
                "status" => "TIMED",
                "competition" => [
                    "name" => "UEFA Champions League",
                    "emblem" => "https://crests.football-data.org/CL.png"
                ],
                "homeTeam" => [
                    "shortName" => "Arsenal FC",
                    "crest" => "https://crests.football-data.org/57.svg"
                ],
                "awayTeam" => [
                    "shortName" => "Bayern München",
                    "crest" => "https://crests.football-data.org/5.svg"
                ]
            ],
            [
                "id" => 503,
                "utcDate" => date('Y-m-d') . "T18:45:00Z",
                "status" => "TIMED",
                "competition" => [
                    "name" => "Serie A",
                    "emblem" => "https://crests.football-data.org/SA.png"
                ],
                "homeTeam" => [
                    "shortName" => "Inter Milan",
                    "crest" => "https://crests.football-data.org/108.svg"
                ],
                "awayTeam" => [
                    "shortName" => "AC Milan",
                    "crest" => "https://crests.football-data.org/98.svg"
                ]
            ],
            [
                "id" => 504,
                "utcDate" => date('Y-m-d') . "T20:45:00Z",
                "status" => "TIMED",
                "competition" => [
                    "name" => "Premier League",
                    "emblem" => "https://crests.football-data.org/PL.png"
                ],
                "homeTeam" => [
                    "shortName" => "Liverpool FC",
                    "crest" => "https://crests.football-data.org/64.svg"
                ],
                "awayTeam" => [
                    "shortName" => "Chelsea FC",
                    "crest" => "https://crests.football-data.org/61.svg"
                ]
            ],
            [
                "id" => 505,
                "utcDate" => date('Y-m-d') . "T21:30:00Z",
                "status" => "TIMED",
                "competition" => [
                    "name" => "La Liga",
                    "emblem" => "https://crests.football-data.org/LL.png"
                ],
                "homeTeam" => [
                    "shortName" => "FC Barcelona",
                    "crest" => "https://crests.football-data.org/81.svg"
                ],
                "awayTeam" => [
                    "shortName" => "Atlético Madrid",
                    "crest" => "https://crests.football-data.org/78.svg"
                ]
            ]
        ]
    ];

    // convertir partidos a json
    $contenido_a_guardar = json_encode($partidos_falsos);
    $mensaje = "No había partidos reales; se guardaron partidos de prueba.";
} else {
    // Si hay partidos reales se guardan los partidos de hoy
    $contenido_a_guardar = $respuesta;
    $mensaje = "Datos reales actualizados correctamente.";
}

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
