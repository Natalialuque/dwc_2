/**
 * Clase que alamacena las cookies 
 */
// Funcion para crear o actualizar una cookie
export function ponerCookie(nombre, valor, dias = 7) {
    // Creamos una fecha a partir del dia actual
    const fecha = new Date();

    // Sumamos los dias de duracion de la cookie
    fecha.setDate(fecha.getDate() + dias);
    // Guardamos la cookie codificando nombre y valor
    document.cookie = encodeURIComponent(nombre) + "=" + encodeURIComponent(valor) + "; expires=" + fecha.toUTCString() + "; path=/";
}

// Funcion para leer una cookie por su nombre
export function obtenerCookie(nombre) {
    // Preparamos el texto que vamos a buscar
    const buscada = encodeURIComponent(nombre) + "=";
    // Separamos todas las cookies por punto y coma
    const cookies = document.cookie.split(";");

    // Recorremos las cookies una a una
    for (let i = 0; i < cookies.length; i++) {
        // Quitamos espacios en blanco del
        let cookieActual = cookies[i];

        while (cookieActual.charAt(0) === " ") {
            cookieActual = cookieActual.substring(1);
        }

        // Si una cookie empieza por el nombre buscado, devovlemos su valor
        if (cookieActual.indexOf(buscada) === 0) {
            return decodeURIComponent(cookieActual.substring(buscada.length, cookieActual.length));
        }
    }

    // Si no existe, devovlemos cadena vacia
    return "";
}

// Funcion para borrar una cookie
export function borrarCookie(nombre) {
    // Para borrar una cookie, se pone una fecha de expiracion antigua
    document.cookie = encodeURIComponent(nombre) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}
