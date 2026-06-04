let worker;
const resultado = document.getElementById("resultado");
const btnIniciar = document.getElementById("iniciar");
const btnDetener = document.getElementById("detener");

// Iniciar el Web Worker
btnIniciar.onclick = function () {

    // Comprobamos si el navegador soporta Web Workers, no lo necesitas soportan todos
    if (typeof Worker !== "undefined") {

        // Si no está creado, lo creamos
        if (!worker) {
            worker = new Worker("webWorker.js");
        }

        // Recibir mensajes del Worker
        worker.onmessage = function (event) {
            resultado.textContent = event.data;
        };

    } else {
        resultado.textContent = "Tu navegador no soporta Web Workers";
    }
};

// Detener el Web Worker
btnDetener.onclick = function () {
    if (worker) {
        worker.terminate();   // Detiene el hilo del Worker
        worker = undefined;   // Limpia la referencia
        resultado.textContent = "Worker detenido";
    }
};
