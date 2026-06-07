let boton = document.getElementById("boton");
let respuesta = document.getElementById("respuesta");

boton.onclick=function(){
//FUNCION BASE DE PHP DE LA QUE PARTEN TODAS 
fetch("server/phpConJson3.php") //cambiar nombre al archivo que corresponda
    .then(res => res.json()) 
    .then(dato => {

        let text = " ";
        //tenemos que recorrerlo 
        for (let da of dato){
            text += da.producto.id +" "+da.producto.nombre+" "+da.producto.precio+" ----";
        }
        
        respuesta.textContent=text;

    });

}