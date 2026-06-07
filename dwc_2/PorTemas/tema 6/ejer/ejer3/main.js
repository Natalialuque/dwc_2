const cuadrado = document.getElementById("cuadrado"); //cuadrado creado
const worker = new Worker("webWorker.js"); //para que lleguen los cambios de colores
let coloresUsados = []; //array donde los vamos guardando


//mediante esto recibimos el color del WebWorker
worker.onmessage = function(event) {
    const colorRecibido = event.data;

    //Aqui metemos la promesa, para ver si el color esta repetido 
    const comprobacion = new Promise(function(resolve,reject){
        if(coloresUsados.includes(colorRecibido)){
            reject("color repetido");
        }else{
            resolve(colorRecibido);
        }

    }).then(function(color){
        cuadrado.style.backgroundColor = color; 
        coloresUsados.push(color);
        info.textContent = "Color nuevo: " + color;

    }).catch(function(error){
        cuadrado.style.backgroundColor="black";
        info.textContent = error+" → cuadrado en negro";

    });
}