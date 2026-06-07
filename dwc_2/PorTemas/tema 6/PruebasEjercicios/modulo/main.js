
// Importamos el default y las funciones con nombre
import saludar, { sumar, multiplicar } from './operaciones.js';

// Obtenemos elementos del DOM
const btn = document.getElementById("boton");
const salida = document.getElementById("resultado");

// Evento del botón
btn.onclick = function () {

    // Usamos la función default
    const mensaje = saludar("Natalia");

    // Usamos las funciones importadas con nombre
    const suma = sumar(5, 3);
    const producto = multiplicar(4, 2);

    // Mostramos los resultados
    salida.innerHTML =
        `${mensaje}<br>
         5 + 3 = ${suma}<br>
         4 × 2 = ${producto}`;
};
