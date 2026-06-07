//import { year,seyHello } from "./modulos/lib.js";

import  seyHello,* as lib from "./modulos/lib.js";

let info = document.getElementById("info");


info.innerHTML="Año acutal <b>"+year+"</b>";
info.innerHTML+="<br>"+seyHello();