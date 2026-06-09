// Crear o actualizar
function setLocal(clave, valor) {
    localStorage.setItem(clave, valor);
}

// Obtener
function getLocal(clave) {
    return localStorage.getItem(clave);
}

// Comprobar si existe
function existeLocal(clave) {
    return localStorage.getItem(clave) !== null;
}

// Borrar
function borrarLocal(clave) {
    localStorage.removeItem(clave);
}

export const LocalUtils = { setLocal, getLocal, existeLocal ,borrarLocal}
