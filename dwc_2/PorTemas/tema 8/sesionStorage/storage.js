// Crear o actualizar
function setSession(clave, valor) {
    sessionStorage.setItem(clave, valor);
}

// Obtener
function getSession(clave) {
    return sessionStorage.getItem(clave);
}

// Comprobar si existe
function existeSession(clave) {
    return sessionStorage.getItem(clave) !== null;
}

// Borrar
function borrarSession(clave) {
    sessionStorage.removeItem(clave);
}


export const SessionUtils = { setSession, getSession, existeSession ,borrarSession}
