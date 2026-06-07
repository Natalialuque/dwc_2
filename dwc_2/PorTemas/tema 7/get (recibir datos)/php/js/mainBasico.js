let boton = document.getElementById("boton");

boton.onclick=function(){
//FUNCION BASE DE PHP DE LA QUE PARTEN TODAS 
fetch("archivo.xml") //cambiar nombre al archivo que corresponda
    .then(res => res.text() , res => res.json()) //DEPENDIENDO DEL TIPO DE PHP QUE LEAMOS
    .then(dato => {
        
        // A PARTIR DE AQUÍ CAMBIA SEGÚN EL php
    });

}