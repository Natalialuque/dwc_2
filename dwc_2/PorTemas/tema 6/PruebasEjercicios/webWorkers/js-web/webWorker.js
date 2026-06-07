// Recibir datos desde el JavaScript principal
self.onmessage = function (event) {
    const numero = event.data;

    // Procesamos el número (por ejemplo, calcular el cuadrado)
    const resultado = numero * numero;

    // Enviamos el resultado de vuelta al hilo principal
    postMessage("El cuadrado es: " + resultado);
};

