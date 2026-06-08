<?php

$datos = [
    "empresa" => "Navisson",
    "ciudad" => "Málaga",
    "empleados" => [
        [
            "nombre" => "Antonio",
            "edad" => 32,
            "puesto" => "Desarrollador"
        ],
        [
            "nombre" => "Lucía",
            "edad" => 28,
            "puesto" => "Diseñadora UX"
        ],
        [
            "nombre" => "Manuel",
            "edad" => 41,
            "puesto" => "Project Manager"
        ]
    ]
];

echo json_encode($datos);
?>


