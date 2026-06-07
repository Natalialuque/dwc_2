let boton = document.getElementById("boton");
let respuesta = document.getElementById("respuesta");

boton.onclick=function(){
//FUNCION BASE DE PHP DE LA QUE PARTEN TODAS 
fetch("server/phpConHtml.php") //cambiar nombre al archivo que corresponda
    .then(res => res.text()) //este es .text al ser html 
    .then(dato => {
        console.log("hola");
        
        respuesta.innerHTML=dato;
    
    });

}