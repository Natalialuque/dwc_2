function generarColor() {
    const letras = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }

    postMessage(color);//esto permite mandarlo al hilo principal js

    setTimeout(generarColor, 2000);
}

generarColor();
