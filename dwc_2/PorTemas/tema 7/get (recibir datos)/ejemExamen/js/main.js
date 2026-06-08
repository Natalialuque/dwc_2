import { Network } from "./Network";

let boton = document.getElementById("boton");
let respuesta = document.getElementById("respuesta");
const net = new Network();

boton.onclick=function(){
    console.log("hola");
    net.leerPhp(respuesta);
}