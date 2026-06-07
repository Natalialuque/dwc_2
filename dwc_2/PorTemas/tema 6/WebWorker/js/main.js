const worker = new Worker("netWorks.js");

document.getElementById("boton").onclick = function () {
    worker.postMessage("leer");
};

worker.onmessage = function(e) {
    document.getElementById("respuesta").textContent = e.data;
};
