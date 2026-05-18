// main.js
import { guerrero } from "./clases/guerrero.js";
import { mago } from "./clases/mago.js";

//llamamos a las variables del html para editar 
const personaje = document.getElementById("form-personaje");
const tarjetas = document.getElementById("tarjetas");
const batalla = document.getElementById("batalla");

// Array donde guardamos los personajes creados
const personajes = [];

// Control de turnos
let turno = 0;

// CREACIÓN DE PERSONAJES
personaje.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const fuerza = parseInt(document.getElementById("fuerza").value);
    const clase = document.getElementById("clase").value;

    let personaje;

    // Creamos la instancia según la clase elegida
    if (clase === "guerrero") {
        personaje = new guerrero(nombre, fuerza);
    } else {
        personaje = new mago(nombre, fuerza);
    }

    personajes.push(personaje);

    crearTarjeta(personaje, personajes.length - 1);

    // Si es el primer personaje, empieza él
    actualizarTurnos();
});


//Funcion para crear la tarjeta en el index 
function crearTarjeta(personaje, index) {
    const tarjeta = document.createElement("div");
    //para poder darle formato en el css
    tarjeta.classList.add("tarjeta");
    tarjeta.id = "pj-"+index;

    // Creamos elementos uno a uno
    const nombreEl = document.createElement("h3");
    nombreEl.textContent = personaje.nombre;

    const claseEl = document.createElement("p");
    claseEl.textContent = "Clase:"+personaje.constructor.name;

    const barraVida = document.createElement("progress");
    barraVida.value = 100;
    barraVida.max = 100;

    const btnAtacar = document.createElement("button");
    btnAtacar.textContent = "Atacar";
    btnAtacar.classList.add("btn-atacar");

    btnAtacar.addEventListener("click", () => {
        atacar(index);
    });

    // Añadimos todo a la tarjeta
    tarjeta.appendChild(nombreEl);
    tarjeta.appendChild(claseEl);
    tarjeta.appendChild(barraVida);
    tarjeta.appendChild(btnAtacar);

    // Añadimos la tarjeta al DOM
    tarjetas.appendChild(tarjeta);
}

//sistema de ataque 
function atacar(indiceAtacante) {
    const atacante = personajes[indiceAtacante];

    // Elegimos de objetivo el siguiente personaje
    const indiceObjetivo = (indiceAtacante + 1) % personajes.length;
    const objetivo = personajes[indiceObjetivo];

    // Si el objetivo esta muerto no hacemos nada
    if (!objetivo.estaVivo()) {
        return;
    }

    atacante.atacar(objetivo);

    // Solo escribimos en el div de batalla si el objetivo sigue vivo después del ataque
    if (objetivo.estaVivo()) {
        escribirBatalla(
            atacante.nombre+" ataca a "+objetivo.nombre+" ,su vida restante:"+objetivo.vida
        );
    }

    // Si muere, marcamos su tarjeta y desactivamos su botón
    if (!objetivo.estaVivo()) {
        const tarjeta = document.getElementById("pj-" + indiceObjetivo);
        tarjeta.classList.add("muerto");

        // Desactivar botón de atacar del muerto
        const btn = tarjeta.querySelector(".btn-atacar");
        btn.disabled = true;

        escribirBatalla(objetivo.nombre+" ha muerto.");
    }

    // Pasamos turno
    turno = indiceObjetivo;
    actualizarTurnos();
}


//debemos tener una funcion para actualizar los turnos
function actualizarTurnos() {
    const botones = document.querySelectorAll(".btn-atacar");

    botones.forEach((btn, i) => {
        btn.disabled = i !== turno; // Solo el del turno actual está activo
    });
}

// funcion para escribir en el div de batalla
function escribirBatalla(texto) {
    const linea = document.createElement("p");
    linea.textContent = texto;
    batalla.appendChild(linea);

    //para poder realizar scroll
    batalla.scrollTop = batalla.scrollHeight; 
}
