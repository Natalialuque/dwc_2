//import { Network } from "../Network.js";
import {leerPhp} from "../Network.js"

let boton = document.getElementById("boton");
let respuesta = document.getElementById("respuesta");
//const net = new Network();

// boton.onclick=function(){
//     console.log("hola");
//     net.leerPhp(respuesta);
// }

let res = document.createElement("div");
res.id="respuesta";

document.body.appendChild(res);

boton.onclick=function(){
    leerPhp(res);
}