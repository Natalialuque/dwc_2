import { CookieUtils } from "../cookies.js";

window.onload = function () {

    const inputNombre = document.getElementById("login");
    const inputEmail = document.getElementById("email");
    const btnLogin = document.getElementById("btn-login-user");
    const btnDelete = document.getElementById("btn-data-user-delete");
    const btnLogout = document.getElementById("btn-logout");
    const pUsuario = document.getElementById("loged-user");

    // Mostrar usuario al cargar
    mostrarUsuario();

    // LOGIN
    // btnLogin.onclick = function () {
    //     const nombre = inputNombre.value.trim();
    //     const email = inputEmail.value.trim();

    //     if (!nombre || !email) {
    //         alert("Debe introducir nombre y email");
    //         return;
    //     }

    //     const nombreExiste = CookieUtils.existeCookie("nombre");
    //     const emailExiste = CookieUtils.existeCookie("email");

    //     if (nombreExiste && emailExiste) {
    //         alert("Las cookies ya existen. Usuario recordado.");
    //     } else {
    //         if (!nombreExiste) CookieUtils.setCookie("nombre", nombre, 7);
    //         if (!emailExiste) CookieUtils.setCookie("email", email, 7);
    //         alert("Cookies creadas correctamente.");
    //     }

    //     mostrarUsuario();
    // };

   btnLogin.onclick = function () {
        const nombre = inputNombre.value.trim();
        const email = inputEmail.value.trim();

        if (!nombre || !email) {
            alert("Debe introducir nombre y email");
            return;
        }

        const cookieNombre = CookieUtils.getCookie("nombre");
        const cookieEmail = CookieUtils.getCookie("email");

        // Si las cookies existen y los valores coinciden → mensaje especial
        if (cookieNombre === nombre && cookieEmail === email) {
            alert("Las cookies ya existen con estos mismos datos.");
            mostrarUsuario();
            return;
        }

        // Si no coinciden → sobrescribir
        CookieUtils.setCookie("nombre", nombre, 7);
        CookieUtils.setCookie("email", email, 7);

        alert("Usuario guardado correctamente.");
        mostrarUsuario();
    };

    // BORRAR COOKIES
    btnDelete.onclick = function () {
        CookieUtils.borrarCookie("nombre");
        CookieUtils.borrarCookie("email");
        mostrarUsuario();
    };

    // LOGOUT (solo visual)
    btnLogout.onclick = function () {
        pUsuario.textContent = "Usuario: Visitante";
    };

    // MOSTRAR USUARIO
    function mostrarUsuario() {
        const nombre = CookieUtils.getCookie("nombre");
        const email = CookieUtils.getCookie("email");

        if (nombre && email) {
            pUsuario.textContent = `Usuario: ${nombre} (${email})`;
        } else {
            pUsuario.textContent = "Usuario: Visitante";
        }
    }
};
