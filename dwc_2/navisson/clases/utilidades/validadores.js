/**
 * Clase que se encarga de las validaciones de nuestra aplicacion
 */
// Expresiones regulares usadas para validar los campos del formulario
const patrones = {
    // Nombre: letras basicas, numeros, espacios, punto y guion
    nombre: /^[A-Za-z0-9 .-]{3,60}$/,
    // Referencia con formato NAV-2026-001
    referencia: /^NAV-\d{4}-\d{3}$/,
    // tamaño entre 5 y 24 con un decimal opcional
    tamano: /^(?:[5-9]|1[0-9]|2[0-4])(?:\.\d)?$/,
    // Precio positivo con maximo dos decimales
    precio: /^(?:\d{1,4})(?:\.\d{1,2})?$/,
    // Usuario: nombre con letras y dos numeros al final
    usuario: /^[A-Za-z]+[0-9]{2}$/,
    // Contraseña de exactamente 8 caracteres, letras o numeros
    contrasena: /^[A-Za-z0-9]{8}$/
};

// funcion principal de validacion del formulario
export function validarPantalla(datos, pantallasExistentes = [], referenciaActual = "") {
    // Objeto donde se guardan los errores
    const errores = {};
    // Fecha actual para comprobar que la fabricacion no sea futura
    const hoy = new Date();
    // Fecha escrita por el usuario
    const fechaFabricacion = new Date(datos.fechaFabricacion);
    // Buscamos si ya existe otra pantalla con la misma referencia
    const repetida = pantallasExistentes.some((pantalla) => {
        return pantalla.referencia === datos.referencia.toUpperCase() && pantalla.referencia !== referenciaActual;
    });

    // Validamos nombre
    if (!patrones.nombre.test(datos.nombre.trim())) {
        errores.nombre = "Usa entre 3 y 60 caracteres validos.";
    }

    // Validamos referencia
    if (!patrones.referencia.test(datos.referencia.trim().toUpperCase())) {
        errores.referencia = "La referencia debe seguir el formato NAV-2026-001.";
    } else if (repetida) {
        // Si el formato esta bien pero existe otra igual, marcamos duplicado
        errores.referencia = "Ya existe una pantalla con esta referencia.";
    }

    // Validamos tamaño
    if (!patrones.tamano.test(String(datos.tamano).trim())) {
        errores.tamano = "Introduce un tamaño entre 5 y 24 pulgadas.";
    }

    // Validamos tipo
    if (!datos.tipo) {
        errores.tipo = "Selecciona un tipo de pantalla.";
    }

    // Validamos estado
    if (!datos.estado) {
        errores.estado = "Selecciona un estado.";
    }

    // Validamos precio
    if (!patrones.precio.test(String(datos.precio).trim()) || Number(datos.precio) <= 0) {
        errores.precio = "Introduce un precio positivo con maximo dos decimales.";
    }

    // Validamos fecha
    if (!datos.fechaFabricacion || Number.isNaN(fechaFabricacion.getTime())) {
        errores.fechaFabricacion = "Selecciona una fecha valida.";
    } else if (fechaFabricacion > hoy) {
        // No permitimos fechas futuras
        errores.fechaFabricacion = "La fecha no puede ser futura.";
    }

    // Devolvemos si es valido y el objeto de errores
    return {
        esValido: Object.keys(errores).length === 0,
        errores
    };
}

// funcion para validar los datos de acceso
export function validarAcceso(datos) {
    // Objeto donde se guardan los errores
    const errores = {};

    // Validamos usuario con nombre y dos numeros
    if (!patrones.usuario.test(datos.usuario.trim())) {
        errores.usuario = "El usuario debe ser un nombre con dos numeros al final";
    }

    // Validamos contraseña de 8 caracteres
    if (!patrones.contrasena.test(datos.contrasena)) {
        errores.contrasena = "La contraseña debe tener 8 caracteres";
    }

    // Devolvemos si es valido y los errores
    return {
        esValido: Object.keys(errores).length === 0,
        errores
    };
}




