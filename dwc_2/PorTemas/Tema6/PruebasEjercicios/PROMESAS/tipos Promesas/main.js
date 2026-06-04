let promise1 = document.getElementById("promise1");
let promise2 = document.getElementById("promise2");
let promise3 = document.getElementById("promise3");
let promise4 = document.getElementById("promise4");


// Promesas de ejemplo
function promesaRapida() {
    return new Promise(resolve => setTimeout(() => resolve("Rápida"), 1000));
}

function promesaMedia() {
    return new Promise(resolve => setTimeout(() => resolve("Media"), 2000));
}

function promesaLenta() {
    return new Promise(resolve => setTimeout(() => resolve("Lenta"), 3000));
}

function promesaFalla() {
    return new Promise((resolve, reject) => setTimeout(() => reject("Error en promesa"), 1000));
}


// Promise.all → todas deben cumplirse
promise1.onclick=function(){
    Promise.all([promesaRapida(), promesaMedia(), promesaLenta(),promesaFalla()])
        .then(resultados => {
            document.getElementById("salida").textContent =
                "Promise.all → Todas resueltas: " + resultados.join(", ");
        })
        .catch(error => {
            document.getElementById("salida").textContent =
                "Promise.all → Una falló: " + error;
        });
}


// Promise.any → basta con que una se cumpla
promise2.onclick=function(){
    Promise.any([promesaFalla(), promesaLenta(), promesaMedia()])
        .then(resultado => {
            document.getElementById("salida").textContent =
                "Promise.any → Primera que se resuelve: " + resultado;
        })
        .catch(error => {
            document.getElementById("salida").textContent =
                "Promise.any → Todas fallaron";
        });
}


// Promise.race → la primera que termine (sea resolve o reject)
promise3.onclick=function(){
    Promise.race([promesaRapida(), promesaLenta(),promesaFalla()])
        .then(resultado => {
            document.getElementById("salida").textContent =
                "Promise.race → Ganó: " + resultado;
        })
        .catch(error => {
            document.getElementById("salida").textContent =
                "Promise.race → Ganó el error: " + error;
        });
}


// Promise.allSettled → espera a todas, sin importar si fallan
promise4.onclick=function(){
    Promise.allSettled([promesaRapida(), promesaFalla(), promesaMedia()])
        .then(resultados => {
            document.getElementById("salida").textContent =
                "Promise.allSettled → Resultados: " + JSON.stringify(resultados);
        });
}


    

