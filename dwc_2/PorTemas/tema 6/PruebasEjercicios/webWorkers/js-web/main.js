let worker = new Worker("webWorker.js");

const input = document.getElementById("numero");
const btnEnviar = document.getElementById("enviar");
const salida = document.getElementById("respuesta");

// Enviar datos al Web Worker
btnEnviar.onclick = function () {
    const valor = Number(input.value);
    worker.postMessage(valor); // Enviamos el número al worker
};



// Recibir respuesta del Web Worker
worker.onmessage = function (event) {
    salida.textContent = event.data;
};
