import { CookieUtils } from "../cookies.js";

window.onload = function () {

    const rbClaro = document.getElementById("tema-claro");
    const rbOscuro = document.getElementById("tema-oscuro");

    
    // APLICAR TEMA AL CARGAR LA PÁGINA
    const colorGuardado = CookieUtils.getCookie("color");

    if (colorGuardado) {
        aplicarTema(colorGuardado);

        // Marcar el radio correspondiente
        if (colorGuardado === "claro") rbClaro.checked = true;
        if (colorGuardado === "oscuro") rbOscuro.checked = true;
    }

    // EVENTOS DE LOS RADIOBUTTONS
    rbClaro.onclick = function () {
        CookieUtils.setCookie("color", "claro", 7);
        aplicarTema("claro");
    };

    rbOscuro.onclick = function () {
        CookieUtils.setCookie("color", "oscuro", 7);
        aplicarTema("oscuro");
    };

    // FUNCIÓN PARA APLICAR EL TEMA
    function aplicarTema(color) {
        document.body.classList.remove("claro", "oscuro");
        document.body.classList.add(color);
    }
};
