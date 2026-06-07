<?php

$datos = [
    [
        "producto" => [
            "id" => 101,
            "nombre" => "Ratón inalámbrico",
            "precio" => 19.99
        ]
    ],
    [
        "producto" => [
            "id" => 102,
            "nombre" => "Teclado mecánico",
            "precio" => 59.90
        ]
    ],
    [
        "producto" => [
            "id" => 103,
            "nombre" => "Monitor 24 pulgadas",
            "precio" => 129.00
        ]
    ]
];

echo json_encode($datos);
?>
