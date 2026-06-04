<?php

$usuarios=array(
array("nombre"=>"Antonio",
"apellidos"=>"Pérez Lorca",
"direc"=>"Calle Comedias, nº 34. 3ºC. Granada. CP:15300",
"email"=>"antoniopl@gmail.com"
),
array("nombre"=>"Lucía",
"apellidos"=>"Corpas Nogales",
"direc"=>"Avenida Los Aviadores, nº 234. 4ºA. Sevilla. CP:11000",
"email"=>"luciacn@hotmail.com"
),
array("nombre"=>"Manuel",
"apellidos"=>"Valdés Rubio",
"direc"=>"Calle Vísperas, nº 4. 1ºB. Fuengirola (Málaga). CP:15632",
"email"=>"sanchezroj@orange.com"
),
array("nombre"=>"Estefanía",
"apellidos"=>"Sánchez Rojano",
"direc"=>"Calle Bosque verde, nº 56. 8ºR. Dos Hermanas (Sevilla). CP:33400",
"email"=>"sanchezroj@orange.com"
)
);

echo json_encode($usuarios);
?>