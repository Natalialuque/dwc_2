import { CookieUtils } from "../cookies.js";

/**
 * Primerito de todo cargar la pagina de registro con unas medidas y demas en el centro
 */
window.onload = function () {

    // Tamaño de la ventana principal
    let anchoPrincipal = window.innerWidth;
    let altoPrincipal = window.innerHeight;

    // Tamaño de la ventana secundaria
    let anchoSecundaria = 250;
    let altoSecundaria = 300;

    // Cálculo del centro
    let left = (anchoPrincipal - anchoSecundaria) / 2;
    let top = (altoPrincipal - altoSecundaria) / 2;

    // Abrir ventana centrada
    window.open(
        "html/login.html",
        "registro",
        "width=" + anchoSecundaria + ",height=" + altoSecundaria + ",top=" + top + ",left=" + left    
    );

    
};



let usuario = document.getElementById("userLogged");

    if (CookieUtils.existeCookie("login")) {
    usuario.textContent = CookieUtils.getCookie("login");
    } else {
    usuario.textContent = "Sin usuario";
}