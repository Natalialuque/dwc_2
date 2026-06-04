/**EL cafe solo cuesta 1.5, leche cuesta 2, 
capuchino 2.5, si hay mas de 5 cafes tiene un descuento del 10%, 
si el pedido es para llevar hay que sumarle un 20%  **/

//variables 
let tipoCafe = document.getElementById("tipoCafe");
let cantidad = document.getElementById("cantidad");
let parallevar = document.getElementById("paraLlevar");
let boton = document.getElementById("procesarPedido");
let resultado = document.getElementById("resultado");


boton.onclick=function(){

    console.log("hola");
    let precioCafe=0;

    switch(tipoCafe.value){
        case "solo" : 
            precioCafe += 1.5;
            break;
        case "leche":
            precioCafe += 2;
            break;
        case "capuchino":
            precioCafe += 2.5;
            break;
    }

    if (Number(cantidad.value)>5){
        precioCafe = (precioCafe*cantidad.value)-(precioCafe * 0.10)
    }else{
        precioCafe = precioCafe*cantidad.value;
    }

    if(paraLlevar.checked){
        precioCafe = precioCafe +(precioCafe*0.2);
    }else{
        precioCafe = precioCafe;
    }

    resultado.textContent=precioCafe+"€";
}
