const datosUsuarios = [
    "Nombre:  Ana García, Email: ana.garcia@example.com, FechaNac: 1995-10-25",
    "Nombre: luis pérez, Email: luisperez@dominio.net, FechaNac: 2005-01-05",
    "Nombre:  MARTA FERNÁNDEZ, Email: marta.fdez-INVALID, FechaNac: 1980-03-15", // Inválido
    "Nombre: pepe lopez, Email: pepe.lopez@example.es, FechaNac: 1978/11/02" // Formato de fecha diferente
];

const regexEmail = /^\S+@\S+\.\S+$/; // \S --> todo lo que no sea un espacio, una @ algo sin espacios, un punto y algo sin espacios

/********************************************************************************* */


/**
 * rellena la tabla que mostramos en el index al pulsar el boton de obtener datos
 */

document.getElementById("bDatosusuarios").onclick=function(){

  for(let usu = 0; usu<datosUsuarios.length; usu++){
      
    //INDICE 
      //se encarga de dividir cada apartado
      let datosUsuario = datosUsuarios[usu].split(",");
      //se encarga de ir cargando el indice por la division
      document.getElementById("indice"+usu).innerHTML=usu;

    //NOMBRE 
      //buscamos el nombre sabiendo que es el primer dato con :
      let nombre= datosUsuario[0].split(":")[1].trim().toUpperCase();
      //y lo carga en la parte del nombre
      document.getElementById("nombre"+usu).innerHTML=nombre;

    //EMAIL (debemos comprobar que sea correcto, si no lo es ponemos invalido)
      //buscamos el email sabiendo que es el segundo dato con :
      let email= datosUsuario[1].split(":")[1].trim();
      //y lo cargamos en la parte de email 
      document.getElementById("email"+usu).innerHTML=email;

      //debemos verificar si es valido o no
      if(email.match(regexEmail)){
         document.getElementById("valido"+usu).innerHTML="valido ";
      }else{
        document.getElementById("valido"+usu).innerHTML="No valido ";
      }

let fechaAño = new Date(datosUsuario[2].split(":")[1].trim());
    //alert(fechaAño.getFullYear());
    
    let annoNow = new Date().getFullYear();
    
   if(fechaAño)
     document.getElementById("edad"+usu).innerHTML=annoNow-fechaAño.getFullYear();
   else   
      document.getElementById("valido"+usu).innerHTML="Fecha no admitida ";


    datosUsuario[0];  
  }
  
}


/**
 * Abrir una nueva ventana con un enlace aleatorio al pulsar abrir documentación 
 */
let ancho = (window.innerWidth-40);
let alto = (window.innerHeight-20);
document.getElementById("bDoc").onclick = function() {
    aux = window.open(
      "../Pruebas/src/usuers.html",
     "NuevaVenta",
     "Width="+ancho+",height="+alto);
}