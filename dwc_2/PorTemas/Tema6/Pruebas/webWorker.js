/**EJEMPLO 3 */
//webWorker
const cantidad =100;
sqrtCantidad(cantidad);

function sqrtCantidad(){
    let myArray = new Array();
    for(let i = 0; i< cantidad; i++){
        myArray.push(i*i);
    }

    postMessage(myArray);
}