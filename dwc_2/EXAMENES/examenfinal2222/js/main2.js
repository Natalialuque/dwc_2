/**
 * metemos importaciones 
 */
import { crearNodoFormulario } from "../nodos.js";
import {envioDatos,reciboDatos} from "../network.js";
import {LocalUtils} from "../local.js";
import {CookieUtils} from "../cookies.js"

/**
 * llamamos a los dos radioButtons
 */
let registro = document.getElementById("rr");
let verChat = document.getElementById("rc");
let div2 = document.getElementById("div2");


//nuevos nodos 
  let mensajeLogin = document.createElement("p");
    div2.appendChild(mensajeLogin);

//NADA MAS CARGAR LA PAGINA
window.onload = function() {

    if (CookieUtils.existeCookie("loginGuardado")) {
        mensajeLogin.textContent = "Bienvenido, " + CookieUtils.getCookie("loginGuardado");
    } else {
        mensajeLogin.textContent = "Todavía no te has registrado";
    }

};

//si pulsamos registro
registro.onclick=function(){
    div2.textContent=""
    crearNodoFormulario(div2);

    //llamamos a los nodos 
    let inputNombre = document.getElementById("inputNombre");
    let inputApellidos = document.getElementById("inputApellidos");
    let inputMail = document.getElementById("inputMail");
    let inputLogin = document.getElementById("inputLogin");
    let inputContraseña = document.getElementById("inputContraseña");
    let inputContraseña2 = document.getElementById("inputContraseña2");
    let botonEnviar = document.getElementById("botonEnviar");

    //tenemos que validarlos mientras se escriben
            //EN CASO DE QUERER LAS VALIDACIONES EN EL MOMENTO
            // inputNombre.addEventListener("input", () => {
            //     borrarError(inputNombre);
            //     if (inputNombre.value.trim() === "") {
            //         crearError(inputNombre, "El nombre no puede estar vacío");
            //     }
            // });

    botonEnviar.onclick = function () {

        // Antes de validar, borramos errores anteriores
        borrarError(inputNombre);
        borrarError(inputApellidos);
        borrarError(inputMail);
        borrarError(inputLogin);
        borrarError(inputContraseña);
        borrarError(inputContraseña2);

        let valido = true;

        // VALIDACIONES
        if (inputNombre.value.trim() === "") {
            crearError(inputNombre, "El nombre no puede estar vacío");
            valido = false;
        }

        if (inputApellidos.value.trim() === "") {
            crearError(inputApellidos, "Los apellidos no pueden estar vacíos");
            valido = false;
        }

        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(inputMail.value.trim())) {
            crearError(inputMail, "El email no es válido");
            valido = false;
        }

        if (inputLogin.value.trim() === "") {
            crearError(inputLogin, "El login no puede estar vacío");
            valido = false;
        }

        if (inputContraseña.value.trim() === "") {
            crearError(inputContraseña, "La contraseña no puede estar vacía");
            valido = false;
        }

        if (inputContraseña2.value.trim() !== inputContraseña.value.trim()) {
            crearError(inputContraseña2, "Las contraseñas no coinciden");
            valido = false;
        }

        // SI TODO ES CORRECTO
        if (valido) {

            let datos={
                nombre: inputNombre.value.trim(),
                apellidos: inputApellidos.value.trim(),
                email: inputMail.value.trim(),
                login: inputLogin.value.trim()
            };
            let respuesta = document.createElement("p");
            div2.appendChild(respuesta);
            //respuesta del server
            envioDatos(datos,respuesta);

            //guardamos 
            CookieUtils.setCookie("loginGuardado",inputLogin.value.trim());

            //actualizar en caso de nuevo 
            mensajeLogin.textContent = "Bienvenido, " + inputLogin.value.trim();


        }else{
            botonEnviar.disabled = true;
            mensajeLogin.textContent="Error datos mal";
        }
    };



}

/**
 * FUNCIONES PARA EL TEMA DEL ERROR Y PARA BORRARLO
 */

//funciones para crear el error y borrarlo
function crearError(input, mensaje) {
    let label = document.createElement("label");
    label.textContent = mensaje;
    label.style.color = "red";
    label.classList.add("error");

    let siguiente = input.nextSibling; // esto pilla el <br>
    input.parentElement.insertBefore(label, siguiente);z
}

function borrarError(input) {
    let siguiente = input.nextSibling;
    if (siguiente && siguiente.classList && siguiente.classList.contains("error")) {
        siguiente.remove();
    }
}
/////////////////////////////////////////////////////////////////////
verChat.onclick=function(){
    div2.textContent=""

    //verificar que estamos registrados 
      if (!CookieUtils.existeCookie("loginGuardado")) {
        mensajeLogin.textContent = "Todavía no te has registrado. No puedes ver el chat.";
        return;
    }

    //Creamos el contenedor del chat
    let chat = document.createElement("div");
    chat.id = "chat";
    chat.style.border = "1px solid black";
    chat.style.width = "80%";
    chat.style.margin = "20px auto"; // centrado horizontal
    chat.style.padding = "10px";
    chat.style.textAlign = "center"; // centrado del contenido
    div2.appendChild(chat);


    // llama a tu función que lee el JSON
    reciboDatos(chat);
  

}