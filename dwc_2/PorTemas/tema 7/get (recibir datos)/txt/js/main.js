let boton = document.getElementById("boton");
let respuesta = document.getElementById("respuesta");

boton.onclick=function(){
//FUNCION BASE DE PHP DE LA QUE PARTEN TODAS 
fetch("server/normativa.txt") //cambiar nombre al archivo que corresponda
    .then(res => res.text()) 
    .then(dato => {
        

        // 1. Crear el div
            const div = document.createElement("div");

            // 2. Añadir la clase CSS
            div.classList.add("mi-clase");

            // 3. Meter el texto dentro
            div.textContent = dato;

            // 4. Limpiar el contenedor (opcional)
            respuesta.innerHTML = "";

            // 5. Insertar el div dentro de #respuesta
            respuesta.appendChild(div);
    
    });

}