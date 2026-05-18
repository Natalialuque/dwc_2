// El worker escucha mensajes enviados desde main.js
self.addEventListener("message", (evento) => {
    // Datos recibidos desde main.js
    const datos = evento.data;
    // Array de pantallas
    const pantallas = datos.pantallas;
    // Filtros activos
    const filtros = datos.filtros;
    // Busqueda en minusculas para comparar sin importar mayusculas
    const busqueda = filtros.busqueda.toLowerCase();

    // Filtramos las pantallas según texto, tipo y estado
    let resultado = pantallas.filter((pantallaActual) => {
        // Nombre en minusculas
        const nombre = String(pantallaActual.nombre).toLowerCase();
        // Referencia en minusculas
        const referencia = String(pantallaActual.referencia).toLowerCase();
        // Comprobamos si coincide la busqueda
        const coincideBusqueda = !busqueda || nombre.includes(busqueda) || referencia.includes(busqueda);
        // Comprobamos tipo
        const coincideTipo = !filtros.tipo || pantallaActual.tipo === filtros.tipo;
        // Comprobamos estado
        const coincideEstado = !filtros.estado || pantallaActual.estado === filtros.estado;

        // Solo pasa el filtro si cumple todo
        return coincideBusqueda && coincideTipo && coincideEstado;
    });

    // Ordenamos el resultado según el select de ordenación
    resultado = resultado.sort((primera, segunda) => {
        // Orden por precio ascendente
        if (filtros.orden === "precio") {
            return Number(primera.precio) - Number(segunda.precio);
        }

        // Orden por fecha más reciente primero
        if (filtros.orden === "fecha") {
            return new Date(segunda.fechaFabricacion) - new Date(primera.fechaFabricacion);
        }

        // Orden por nombre si no se elige otro
        return String(primera.nombre).localeCompare(String(segunda.nombre), "es");
    });

    // Enviamos el resultado filtrado de vuelta al main
    self.postMessage(resultado);
});


