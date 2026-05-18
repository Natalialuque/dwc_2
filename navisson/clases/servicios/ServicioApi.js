// Importamos la clase Pantalla para convertir los datos recibidos en objetos
import { Pantalla } from "../pantallas/Pantalla.js";

// Objeto que agrupa las llamadas fetch de la aplicación
export const ServicioApi = {
    // Carga las pantallas iniciales desde el archivo JSON
    async cargarPantallasIniciales() {
        // Pedimos el archivo JSON local con fetch
        const respuesta = await fetch("json/pantallas.json?actualizacion=" + Date.now());

        // Si la respuestá no es correcta, lanzamos error
        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el JSON inicial.");
        }

        // Convertimos la respuestá a JSON
        const datos = await respuesta.json();
        // Convertimos cada objeto en una instancia de pantalla
        return datos.map(
            (elemento) => Pantalla.crear(elemento)
        );
    },

    // Carga el clima del taller desde una API externa
    async cargarClimaTaller() {
        // URL de Open-Meteo para Malaga con temperatura y viento actuales
        const ruta = "https://api.open-meteo.com/v1/forecast?latitude=36.7213&longitude=-4.4214&current=temperature_2m,wind_speed_10m&timezone=Europe%2FMadrid";
        // Pedimos los datos con fetch
        const respuesta = await fetch(ruta);

        // Si faya, lanzamos error
        if (!respuesta.ok) {
            throw new Error("No se pudo consultar la API externa.");
        }

        // Devolvemos el JSON de clima
        return respuesta.json();
    },

    // Registra una pantalla nueva en el servidor local
    async registrarAltaPantalla(pantallaActual) {
        // Enviamos la pantalla al endpoint PHP del proyecto
        const respuesta = await fetch("api/registrarPantalla.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pantallaActual.convertirObjeto())
        });

        // Si falla, lanzamos error
        if (!respuesta.ok) {
            throw new Error("No se pudo registrar la pantalla en el servidor.");
        }

        // Devolvemos la respuestá JSON
        const datos = await respuesta.json();

        if (!datos.ok) {
            throw new Error(datos.mensaje);
        }

        return datos;
    }
};


