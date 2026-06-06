/**
 * Lo primero es verificar que los usuarios son correctos 
 */
let usuario = document.getElementById("user"); 
let mensajes = document.getElementById("mensajes");

document.getElementById("login").onclick = function () {

    //para controlar los intentos del inicio de sesion
    if (!sessionStorage.getItem("intentos")) {
    sessionStorage.setItem("intentos", "0");
    }


    let user = usuario.value.trim();
    let pass = document.getElementById("pass").value.trim();


    if (user !== "rrhh" && user !== "almacen") {
        mensajes.textContent = "ERROR, el usuario " + user + " es erróneo";
    } else {
        //guardamos el usuario principal
        localStorage.setItem("usuario", user);

        //carga los arrays
        let arrayUsuarios = JSON.parse(localStorage.getItem("arrayUsuarios")) || [];
        let arrayPasswords = JSON.parse(localStorage.getItem("arrayPasswords")) || [];

        // Buscar si ya tiene contraseña
        let pos = arrayUsuarios.indexOf(user);

        //si es la primera vez pues nos piramos a registro
        if(pos === -1){
            window.open(
                "registro.html",
                "registro",
                "width=400,height=300,top=100,left=100"
            );
        }

            
        // Validar contraseña y si es mas de 3 vedes incorrexta desabilitamos todo
       if (arrayPasswords[pos] !== pass) {

        // sumar intento
        let intentos = parseInt(sessionStorage.getItem("intentos"));
        intentos++;
        sessionStorage.setItem("intentos", intentos);

        mensajes.textContent = "Contraseña incorrecta. Intento " + intentos + " de 3";

        // si llega a 3 → bloquear
        if (intentos >= 3) {
            mensajes.textContent = "Has superado los 3 intentos. Usuario bloqueado.";
            document.getElementById("user").disabled = true;
            document.getElementById("pass").disabled = true;
            document.getElementById("login").disabled = true;
        }

        return;
        }
        // Si llega aquí, la contraseña es correcta
        sessionStorage.setItem("intentos", "0"); // ← reinicia el contador
        mensajes.textContent = "";

        limpiarPantallaTotal();
            if (user === "rrhh") {
                // Si había un intervalo activo → lo paramos
                if (intervaloProductos !== null) {
                    clearInterval(intervaloProductos);
                    intervaloProductos = null;
                }

                cargaRRHH();

            } else if (user === "almacen") {
                limpiarPantallaTotal();
                cargaAlmacen();
            }

    }
};


function cargaRRHH(){
    // Crear lista desplegable
    let select = document.createElement("select");
    select.id = "accionesRRHH";

    let op1 = document.createElement("option");
    op1.id="nuevo";
    op1.value = "nuevo";
    op1.textContent = "Nuevo empleado";

    let op2 = document.createElement("option");
    op2.id="eliminar";
    op2.value = "eliminar";
    op2.textContent = "Eliminar empleado";

    select.appendChild(op1);
    select.appendChild(op2);

    document.body.appendChild(select);


    //si elegimos la opcion de nuevo empleado hacemos una cosa y si es la de eliminar otra 
   select.onchange = function () {
        limpiarPantallaRRHH();
        if (select.value === "nuevo") {
            nuevoEmpleado();
        } else {
            eliminarEmpleado();
        }
    };

}

//si tenemos un nuevo empleado pues tenemos la siguiente funcion 
function nuevoEmpleado(){
    //creamos un formulario con serie de campos, nombre apellidos direccion y email 
    let form = document.createElement("form");
    form.id="formRRHH";

    let nombre = crearCampo("nombre","Nombre:");
    let apellidos = crearCampo("apellidos","Apellidos:");
    let direccion = crearCampo("direccion","Direccion:");
    let email =crearCampo("email","Email:");

    let boton = document.createElement("button");
    boton.textContent = "Enviar";
    boton.id = "btnEnviar";
    boton.type = "button";


    form.appendChild(nombre);
    form.appendChild(apellidos);
    form.appendChild(direccion);
    form.appendChild(email);
    form.appendChild(boton);

    document.body.appendChild(form);


    //ahora vamos a cuando clicamos boton 
    boton.onclick=function(){
        let contenedor = document.getElementById("formRRHH");
        let inputs = contenedor.querySelectorAll("input");

        let valido = true;

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                input.style.border = "2px solid red";
                valido = false;
            } else {
                input.style.border = "";
            }
        });

        if (!valido) {
            mensajes.textContent = "Rellena todos los campos obligatorios";
            return;
        }

        // Crear XML
         let nombre = document.getElementById("nombre").value.trim();
        let apellidos = document.getElementById("apellidos").value.trim();
        let direccion = document.getElementById("direccion").value.trim();
        let email = document.getElementById("email").value.trim();

        let xml = 
            "<empleado>" +
                "<nombre>" + nombre + "</nombre>" +
                "<apellidos>" + apellidos + "</apellidos>" +
                "<direc>" + direccion + "</direc>" +
                "<email>" + email + "</email>" +
            "</empleado>";

        //este xml tenemos que enviarlo al php que tenemos 
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                mensajes.textContent = "Servidor: " + xhr.responseText;
            }
        };

        xhr.open("POST", "php/nuevoUser.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("datos=" + encodeURIComponent(xml));
    }

}



//si vamos a eliminar un empleado hacemos lo siguiente 
function eliminarEmpleado(){

    //llamamos a fetch para que lea el usuario.php
    fetch("php/usuarios.php")
        .then(respuesta => respuesta.json())//convierte en json como pide 
        .then(datos=>{ //datos dentro del archivo 

        // Crear el combo
        let select = document.createElement("select");
        select.id = "comboEliminar";

        // Rellenar el combo con nombre + apellidos
        datos.forEach(dat => {
            let option = document.createElement("option");
            // option.value = dat.nombre; // o un ID si lo tuvieras
            option.textContent = dat.nombre + " " + dat.apellidos;
            select.appendChild(option);
        });

        // Añadir el combo a la página
        document.body.appendChild(select);
    })
    .catch(err => {
        console.error("Error cargando empleados:", err);
    });

        //creamos el enlace del boton a eliminar 
        let enlace = document.createElement("a");
        enlace.href = "#";
        enlace.id="enlace";
        enlace.textContent = "Eliminar";

        document.body.appendChild(enlace);


        enlace.onclick = function (e) {
             e.preventDefault(); // para que no navegue

             //selecionamos el combo donde esta estan las opciones 
            let select = document.getElementById("comboEliminar");
            let texto = select.options[select.selectedIndex].textContent;

            //debemos partirtlas para poder crear el json
            let partes = texto.split(" ");
            let nombre = partes[0];
            let apellidos = partes.slice(1).join(" ");


            //esto es la creacion del jsOn que nos va a permitir llamar 
            let datos = {
                nombre: nombre,
                apellidos: apellidos
            };

            fetch("php/eliminaUsuarios.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            })
            .then(respuesta =>respuesta.text())
            .then(datos =>{
                        mensajes.textContent = "Servidor: " + datos;
            })
            .catch(err => {
                mensajes.textContent = "Error eliminando empleado";
            });

        };



}


/**
 * VAMOS AHORA AL APARTADO DE ALMACEN
 */
let intervaloProductos = null;

function cargaAlmacen(){

    // Crear el div SOLO si no existe
    let div = document.getElementById("productos");
    if (!div) {
        div = document.createElement("div");
        div.id = "productos";
        document.body.appendChild(div);
    }

    function cargarProductos() {
        fetch("php/productos.php")
            .then(res => res.text())
            .then(productos => {

                let div = document.getElementById("productos");
                div.innerHTML = productos; 

                
            })
            .catch(err => {
                console.error("Error cargando productos:", err);
            });
    }

    cargarProductos();
    intervaloProductos = setInterval(cargarProductos, 30000);
}



/**
 * funcion para crear los nodos 
 */
function crearCampo(id, textoLabel, tipo = "text") {
    // contenedor
    let div = document.createElement("div");
    div.classList.add("campo");

    // label
    let label = document.createElement("label");
    label.textContent = textoLabel;
    label.setAttribute("for", id);

    // input
    let input = document.createElement("input");
    input.type = tipo;
    input.id = id;

    // unir nodos
    div.appendChild(label);
    div.appendChild(input);

    return div;
}


function limpiarPantallaTotal() {
    let ids = ["accionesRRHH", "formRRHH", "comboEliminar", "enlace", "productos"];
    ids.forEach(id => {
        let nodo = document.getElementById(id);
        if (nodo) nodo.remove();
    });
}

function limpiarPantallaRRHH() {
    let ids = ["formRRHH", "comboEliminar", "enlace"];
    ids.forEach(id => {
        let nodo = document.getElementById(id);
        if (nodo) nodo.remove();
    });
}




