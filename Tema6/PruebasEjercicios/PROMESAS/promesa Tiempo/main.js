let boton = document.getElementById("boton");
let resultado = document.getElementById("resultado");


boton.onclick=function() {

    const promesaConTiempo = new Promise(function(resolve) {

        resultado.innerHTML = "Cargando...";

        setTimeout(function() { 
            resolve("Datos cargados después de 3 segundos");
        }, 3000);
    });

    promesaConTiempo.then(function(texto) {
        resultado.innerHTML = texto;
    });
}

    

