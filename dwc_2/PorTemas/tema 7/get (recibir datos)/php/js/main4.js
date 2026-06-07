let boton = document.getElementById("boton");
let respuesta = document.getElementById("respuesta");

boton.onclick=function(){
//FUNCION BASE DE PHP DE LA QUE PARTEN TODAS 
fetch("server/phpConJson2.php") //cambiar nombre al archivo que corresponda
    .then(res => res.json()) 
    .then(dato => {

        
    // dato es un ARRAY de objetos con objetos
            let texto = "";

            for (let emple of dato.empleados) {
                texto += emple.nombre + " " + emple.edad + " "+emple.puesto; //lee tal cual 
            }

            respuesta.textContent = "empresa. "+dato.empresa +" Ciudad: " +dato.ciudad+" Empleados: "+texto;      

    });

}