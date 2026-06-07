let contador = 0;

// Función que se ejecuta continuamente en segundo plano
function contar() {
    contador++;

    // Enviamos el valor al hilo principal
    postMessage(contador);

    // Volvemos a ejecutar la función después de 200 ms
    setTimeout(contar, 200);
}

// Iniciamos el proceso
contar();
