let boton = document.getElementById("boton");
let respuesta = document.getElementById("respuesta");

boton.onclick=function(){
//FUNCION BASE DE PHP DE LA QUE PARTEN TODAS 
fetch("server/phpConJson1.php") //cambiar nombre al archivo que corresponda
    .then(res => res.json()) 
    .then(dato => {
        
    // dato es un ARRAY de objetos
            let texto = "";

            for (let persona of dato) {
                texto += persona.nombre + " " + persona.apellidos + "<br>"; //lee tal cual 
            }

            respuesta.textContent = texto;        

    });

}