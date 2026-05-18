// función para crear o actualizar una cookie
export function ponerCookie(nombre, valor, dias = 7) {
    // Creamos una fecha a partir del dia actual
    const fecha = new Date();

    // Sumamos los d?as de duraci?n de la cookie
    fecha.setDate(fecha.getDate() + dias);
    // Guardamos la cookie codificando nombre y valor
    document.cookie = encodeURIComponent(nombre) + "=" + encodeURIComponent(valor) + "; expires=" + fecha.toUTCString() + "; path=/";
}

// función para leer una cookie por su nombre
export function obtenerCookie(nombre) {
    // Preparamos el texto que vamos a buscar
    const buscada = encodeURIComponent(nombre) + "=";
    // Separamos todas las cookies
    const cookies = document.cookie.split("; ");

    // Recorremos las cookies una a una
    for (let i = 0; i < cookies.length; i++) {
        // Si una cookie empieza por el nombre buscado, Devolvemos su valor
        if (cookies[i].indexOf(buscada) === 0) {
            return decodeURIComponent(cookies[i].replace(buscada, ""));
        }
    }

    // Si no existe, Devolvemos cadena vacia
    return "";
}

// función para borrar una cookie
export function borrarCookie(nombre) {
    // Para borrar una cookie, se pone una fecha de expiracion antigua
    document.cookie = encodeURIComponent(nombre) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
}


