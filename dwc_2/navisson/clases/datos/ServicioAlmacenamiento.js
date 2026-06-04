// Importamos la clase Pantalla para reconstruir objetos al leer localStorage
import { Pantalla } from "../pantallas/Pantalla.js";
// Importamos las funciones de cookies
import { obtenerCookie, ponerCookie } from "../utilidades/cookies.js";

// Clave usada para guardar pantallas en localStorage
const CLAVE_LOCAL = "navisson.pantallas";
// Clave usada para guardar filtros en sessionStorage
const CLAVE_SESION = "navisson.filtros";
// Cookie que recuerda la ultima pantalla pulsada para modificar
const COOKIE_ULTIMA_PANTALLA = "navisson.ultimaPantallaModificada";
// Cookie que recuerda si el fondo oscuro esta activo
const COOKIE_FONDO_OSCURO = "navisson.fondoOscuro";

// Objeto que agrupa las funciones de almacenamient
export const ServicioAlmacenamiento = {
    // Guarda el array de pantallas en localStorage
    guardarPantallas(pantallas) {
        // Convertimos instancias de clase a objetos normales
        const pantallasPlanas = pantallas.map(
            (pantallaActual) => pantallaActual.convertirObjeto()
        );
        // Guardamos el array convertido a texto JSON
        localStorage.setItem(CLAVE_LOCAL, JSON.stringify(pantallasPlanas));
    },

    // Carga pantallas dede localStorage
    cargarPantallas() {
        // Leemos el texto guardado
        const guardadas = localStorage.getItem(CLAVE_LOCAL);

        // Si no hay nada guardado, devovlemos array vacio
        if (!guardadas) {
            return [];
        }

        // Intentamos convertir el texto JSON en objetos
        try {
            // Convertimos cada objeto normal en instancia de pantalla
            return JSON.parse(guardadas).map(
                (elemento) => Pantalla.crear(elemento)
            );
        } catch (error) {
            // Si hay error, avisamos y devovlemos array vacio
            console.error("No se pudo leer localStorage", error);
            return [];
        }
    },

    // Guarda filtros en sessionStorage
    guardarFiltros(filtros) {
        // sessionStorage guarda texto, por eso usamos JSON.stringify
        sessionStorage.setItem(CLAVE_SESION, JSON.stringify(filtros));
    },

    // Carga filtros desde sessionStorage
    cargarFiltros() {
        // Leemos el texto guardado
        const guardados = sessionStorage.getItem(CLAVE_SESION);

        // Si no hay filtros, devovlemos valores por defecto
        if (!guardados) {
            return { busqueda: "", tipo: "", estado: "", orden: "nombre" };
        }

        // Intentamos convertir el JSON
        try {
            return JSON.parse(guardados);
        } catch (error) {
            // Si falla, devovlemos filtros por defecto
            console.error("No se pudo leer sessionStorage", error);
            return { busqueda: "", tipo: "", estado: "", orden: "nombre" };
        }
    },

    // Guarda la última pantalla seleccionada para modificar
    guardarUltimaPantallaModificada(pantallaActual) {
        // Guardamos solo la referencia porque identifica la pantalla
        ponerCookie(COOKIE_ULTIMA_PANTALLA, pantallaActual.referencia, 30);
    },

    // Carga la referencia de la última pantalla seleccionada para modificar
    cargarUltimaPantallaModificada() {
        // Devolvemos el valor de la cookie
        return obtenerCookie(COOKIE_ULTIMA_PANTALLA);
    },

    // Guarda si el fondo oscuro está activado
    guardarFondoOscuro(activado) {
        // Guardamos si/no para que sea facil leerlo
        ponerCookie(COOKIE_FONDO_OSCURO, activado ? "si" : "no", 30);
    },

    // Carga la cookie del fondo oscuro
    cargarFondoOscuro() {
        // Devolvemos el valor guardado
        return obtenerCookie(COOKIE_FONDO_OSCURO);
    }
};


