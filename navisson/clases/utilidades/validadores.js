// Expresiones regulares usadas para validar los campos del formulario
const patrones = {
    // Nombre: letras basicas, números, espacios, punto y guion
    nombre: /^[A-Za-z0-9 .-]{3,60}$/,
    // Referencia con formato NAV-2026-001
    referencia: /^NAV-\d{4}-\d{3}$/,
    // tamaño entre 5 y 24 con un decimal opcional
    tamano: /^(?:[5-9]|1[0-9]|2[0-4])(?:\.\d)?$/,
    // Precio positivo con máximo dos decimales
    precio: /^(?:\d{1,4})(?:\.\d{1,2})?$/
};

// función principal de validación del formulario
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
        // Si el formato está bien pero existe otra igual, marcamos duplicado
        errores.referencia = "Ya existe una pantalla con esta referencia.";
    }

    // Validamos tamaño
    if (!patrones.tamano.test(String(datos.tamano).trim())) {
        errores.tamano = "Introduce un tamano entre 5 y 24 pulgadas.";
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


