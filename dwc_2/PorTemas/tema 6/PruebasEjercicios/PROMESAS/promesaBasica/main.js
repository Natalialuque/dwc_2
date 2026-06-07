let boton = document.getElementById("boton");
let resultado = document.getElementById("resultado");


boton.onclick=function() {

    const promesa = new Promise(function(resolve, reject) {
        const numero = 10;

        if (numero > 5) {
            resolve("El número es mayor que 5");
        } else {
            reject("El número es menor o igual que 5"); //Podemos hacerlo con throwError y nos ahorrarmos el reject
        }

    }).then(function(mensaje) { //cuando esta bien
            resultado.innerHTML= mensaje;
    }).catch(function(error) {//cuando esta mal 
            resultado.innerHTML = error;
    });
    
}
