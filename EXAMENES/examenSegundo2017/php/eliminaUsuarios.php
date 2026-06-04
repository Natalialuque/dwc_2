<?php

/// Obtenemos el json enviado
$data = file_get_contents('php://input');
// Los convertimos en un array
$data = json_decode($data);

echo "Eliminado " . $data->nombre;
?>