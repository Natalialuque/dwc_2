import { CookieUtils } from "../cookies.js";

window.onload = function () {

    // Seleccionamos elementos existentes
    let contenedor = document.body;
    let error = document.getElementById("error");
    let botonOriginal = document.querySelector("button");

    contenedor.style.textAlign = "center";
    contenedor.style.fontFamily = "Arial, sans-serif";

    // ---------- USUARIO ----------
    let labelUsuario = document.createElement("label");
    labelUsuario.textContent = "Usuario:";
    labelUsuario.style.color = "orange";

    let inputUsuario = document.createElement("input");
    inputUsuario.type = "text";
    inputUsuario.style.border = "1px solid black";
    inputUsuario.style.borderRadius = "15px";
    inputUsuario.style.margin = "5px";

    // RESTRICCIONES DEL LOGIN
    inputUsuario.addEventListener("input", () => {
        inputUsuario.value = inputUsuario.value.replace(/\s+/g, "");
        if (inputUsuario.value.length > 10) {
            inputUsuario.value = inputUsuario.value.substring(0, 10);
        }
    });

    // ---------- PASSWORD ----------
    let labelPassword = document.createElement("label");
    labelPassword.textContent = "Password:";
    labelPassword.style.color = "orange";

    let inputPassword = document.createElement("input");
    inputPassword.type = "password";
    inputPassword.style.border = "1px solid black";
    inputPassword.style.borderRadius = "15px";
    inputPassword.style.margin = "5px";

    // REGEX DEL PASSWORD
    let regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[¡!\"#$%()]).+$/;

    // ---------- LÍNEA SEPARADORA ----------
    let linea = document.createElement("hr");
    linea.style.width = "60%";

    // ---------- INSERTAR NODOS ANTES DEL BOTÓN ----------
    contenedor.insertBefore(labelUsuario, botonOriginal);
    contenedor.insertBefore(document.createElement("br"), botonOriginal);
    contenedor.insertBefore(inputUsuario, botonOriginal);
    contenedor.insertBefore(document.createElement("br"), botonOriginal);

    contenedor.insertBefore(labelPassword, botonOriginal);
    contenedor.insertBefore(document.createElement("br"), botonOriginal);
    contenedor.insertBefore(inputPassword, botonOriginal);

    // ---------- TABLA NUMÉRICA 1–9 ----------
    let tabla = document.createElement("table");
    tabla.style.margin = "10px auto";
    tabla.style.borderCollapse = "collapse";
    tabla.style.cursor = "pointer";

    let num = 1;
    for (let i = 0; i < 3; i++) {
        let fila = document.createElement("tr");
        for (let j = 0; j < 3; j++) {
            let celda = document.createElement("td");
            celda.textContent = num;
            celda.style.border = "1px solid black";
            celda.style.padding = "10px";
            celda.style.width = "30px";
            celda.style.backgroundColor = "#eee";

            // Al pulsar un número → se añade al inputCaptcha
            celda.onclick = () => {
                inputCaptcha.value += celda.textContent;
            };

            fila.appendChild(celda);
            num++;
        }
        tabla.appendChild(fila);
    }

    contenedor.insertBefore(tabla, botonOriginal);

    // ---------- INPUT CAPTCHA ----------
    let inputCaptcha = document.createElement("input");
    inputCaptcha.type = "text";
    inputCaptcha.style.border = "1px solid black";
    inputCaptcha.style.borderRadius = "10px";
    inputCaptcha.style.margin = "5px";
    inputCaptcha.style.width = "80px";
    inputCaptcha.readOnly = true;

    // ---------- NÚMERO ALEATORIO ----------
    let numeroAleatorio = Math.floor(Math.random() * 900) + 100; // 100–999

    let spanAleatorio = document.createElement("span");
    spanAleatorio.textContent = "  Código: " + numeroAleatorio;
    spanAleatorio.style.fontWeight = "bold";
    spanAleatorio.style.marginLeft = "10px";

    // Insertar input + número aleatorio
    contenedor.insertBefore(inputCaptcha, botonOriginal);
    contenedor.insertBefore(spanAleatorio, botonOriginal);

    contenedor.insertBefore(linea, botonOriginal);

    // ---------- ESTILOS DEL BOTÓN EXISTENTE ----------
    botonOriginal.style.backgroundColor = "black";
    botonOriginal.style.color = "white";
    botonOriginal.style.border = "none";
    botonOriginal.style.padding = "5px 10px";
    botonOriginal.style.cursor = "pointer";

    botonOriginal.onmouseover = () => botonOriginal.style.backgroundColor = "orange";
    botonOriginal.onmouseout = () => botonOriginal.style.backgroundColor = "black";

    // ---------- VALIDACIÓN AL PULSAR ENTRAR ----------
    botonOriginal.onclick = function () {

        error.textContent = ""; // limpiar errores

        let login = inputUsuario.value.trim();
        let pass = inputPassword.value.trim();
        let captcha = inputCaptcha.value.trim();

        let errores = [];

        // VALIDACIÓN LOGIN
        if (login === "") errores.push("El login no puede estar vacío.");
        if (/\s/.test(login)) errores.push("El login no puede contener espacios.");
        if (login.length > 10) errores.push("El login no puede superar los 10 caracteres.");

        // VALIDACIÓN PASSWORD
        if (!regexPassword.test(pass)) {
            errores.push("El password debe contener una mayúscula, un número y un símbolo especial (¡ ! \" # $ % ( )).");
        }

        // VALIDACIÓN CAPTCHA
        if (captcha != numeroAleatorio) {
            errores.push("El código introducido no coincide con el número aleatorio.");
        }

        // MOSTRAR ERRORES
        if (errores.length > 0) {
            error.textContent = errores.join(" ");
            return;
        }

        // ---------- SI TODO ES CORRECTO → CREAR COOKIES ----------
      // ---------- SI TODO ES CORRECTO → CREAR COOKIES ----------
CookieUtils.setCookie("login", login, 1);
CookieUtils.setCookie("password", pass, 1);

// Recargar la ventana principal
window.opener.location.reload();

// Cerrar la ventana de login
window.close();

    };
};
