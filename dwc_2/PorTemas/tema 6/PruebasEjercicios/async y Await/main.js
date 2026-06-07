// Función que simula una petición lenta al servidor
function obtenerDatosDelServidor() {

    return new Promise((resolve) => {

        // Simulamos un retardo de 2 segundos
        setTimeout(() => {
            resolve("Datos recibidos del servidor");
        }, 2000);
    });
}

let boton = document.getElementById("boton");

// Asignamos la función al hacer clic
boton.onclick = async function () {

    // Mensaje inmediato se muestra antes porque es codigo sincrono
    document.getElementById("estado").textContent = "Cargando datos...";

    // Pausa solo dentro de esta función
    const resultado = await obtenerDatosDelServidor();

    // Continúa cuando la promesa termina
    document.getElementById("estado").textContent = resultado;
};
