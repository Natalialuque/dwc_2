// Importamos la clase Pantalla para crear objetos de pantalla
import { Pantalla } from "./pantallas/Pantalla.js";
// Importamos la clase Nodos para crear la interfaz con document.createElement
import { Nodos } from "./nodos/Nodos.js";
// Importamos el servicio que contiene los fetch
import { ServicioApi } from "./servicios/ServicioApi.js";
// Importamos el servicio de localStorage, sessionStorage y cookies
import { ServicioAlmacenamiento } from "./servicios/ServicioAlmacenamiento.js";
// Importamos las funciones que validan formularios
import { validarAcceso, validarPantalla } from "./utilidades/validadores.js";

// Creamos un objeto de la clase Nodos
const creadorNodos = new Nodos();
// Creamos toda la estructura HTML dentro del contenedor del index
creadorNodos.crearAplicacion();
// Creamos la pantalla de acceso inicial
creadorNodos.crearAcceso();

// Llamamos a las variables del HTML para poder usarlas y modificarlas
const listaPantallas = document.getElementById("listaPantallas");
const lineaEstado = document.getElementById("lineaEstado");

// Variables de la pantalla de acceso
const capaAcceso = document.getElementById("capaAcceso");
const formularioAcceso = document.getElementById("formularioAcceso");
const usuarioAcceso = document.getElementById("usuarioAcceso");
const contrasenaAcceso = document.getElementById("contrasenaAcceso");
const errorAcceso = document.getElementById("errorAcceso");

// Variables del formulario
const formularioPantalla = document.getElementById("formularioPantalla");
const tituloFormulario = document.getElementById("tituloFormulario");
const referenciaEdicion = document.getElementById("referenciaEdicion");
const botonCancelarEdicion = document.getElementById("botonCancelarEdicion");

// Variables de los bot?nes principales
const botonRecargar = document.getElementById("botonRecargar");
const botonEstadísticas = document.getElementById("botonEstadísticas");
const botonTema = document.getElementById("botonTema");

// Variables de los campos del formulario
const campoNombre = document.getElementById("nombrePantalla");
const campoReferencia = document.getElementById("referenciaPantalla");
const campoTamaño = document.getElementById("tamañoPantalla");
const campoTipo = document.getElementById("tipoPantalla");
const campoEstado = document.getElementById("estadoPantalla");
const campoPrecio = document.getElementById("precioPantalla");
const campoFecha = document.getElementById("fechaPantalla");
const campoImagen = document.getElementById("imagenPantalla");

// Variables de los mensajes de error del formulario
const errorNombre = document.getElementById("errorNombrePantalla");
const errorReferencia = document.getElementById("errorReferenciaPantalla");
const errorTamaño = document.getElementById("errorTamañoPantalla");
const errorTipo = document.getElementById("errorTipoPantalla");
const errorEstado = document.getElementById("errorEstadoPantalla");
const errorPrecio = document.getElementById("errorPrecioPantalla");
const errorFecha = document.getElementById("errorFechaPantalla");

// Variables de los filtros
const busquedaPantalla = document.getElementById("busquedaPantalla");
const filtroTipo = document.getElementById("filtroTipo");
const filtroEstado = document.getElementById("filtroEstado");
const ordenPantallas = document.getElementById("ordenPantallas");

// Creamos el worker que filtra y ordena las pantallas
const trabajadorFiltros = new Worker("clases/filtros/filtros.js");

// Array donde guardamos las pantallas creadas o cargadas
const pantallas = [];

// Variable para recordar si está activo el fondo oscuro
let fondoOscuro = true;

// Variable para guardar el clima del taller y mostrarlo solo en estad?sticas
let climaTaller = "No disponible";

const CLAVE_SESION_ACCESO = "navisson.sesionIniciada";

// Iniciamos la aplicación
iniciarAplicacion();

// función principal de arranque de la aplicación
async function iniciarAplicacion() {
    // Asignamos todos los eventos de bot?nes, filtros y formulario
    asignarEventos();
    // Mostramos o escondemos el acceso según la sesión
    controlarAcceso();
    // Preparamos el worker para recibir resultados
    asignarTrabajador();
    // Recuperamo filtros guardados en sessionStorage
    recuperarFiltros();
    // Recuperamos la cookie del modo oscuro
    recuperarTema();
    // Cargamos pantallas desde localStorage o desde JSON
    await cargarDatos();
    // Recuperamos la última pantalla pulsada para modificar
    recuperarUltimaPantallaModificada();
    // Cargamos el clima, pero no lo pintamos en el index
    await cargarClima();
}

// función donde se asignan los eventos
function asignarEventos() {
    // Evento submit del formulario de acceso
    formularioAcceso.addEventListener("submit", iniciarSesion);
    // Evento submit del formulario para guardar o modificar pantalla
    formularioPantalla.addEventListener("submit", guardarPantalla);
    // Evento para cancelar la edici?n
    botonCancelarEdicion.addEventListener("click", limpiarFormulario);
    // Evento delegado para los bot?nes de cada tarjeta
    listaPantallas.addEventListener("click", gestionarClickLista);
    // Eventos de filtros
    busquedaPantalla.addEventListener("input", aplicarFiltros);
    filtroTipo.addEventListener("change", aplicarFiltros);
    filtroEstado.addEventListener("change", aplicarFiltros);
    ordenPantallas.addEventListener("change", aplicarFiltros);
    // Eventos de bot?nes de la cabecera
    botonRecargar.addEventListener("click", recargarJson);
    botonEstadísticas.addEventListener("click", abrirVentanaEstadísticas);
    botonTema.addEventListener("click", cambiarTema);

    // Antes de cerrar o recargar guardamos los filtros en sessionStorage
    window.addEventListener("beforeunload", () => {
        ServicioAlmacenamiento.guardarFiltros(leerFiltros());
    });
}

// función que muestra el acceso si no hay sesión iniciada
function controlarAcceso() {
    if (sessionStorage.getItem(CLAVE_SESION_ACCESO) === "si") {
        ocultarAcceso();
    } else {
        mostrarAcceso();
    }
}

// función que comprueba usuario y contraseña
function iniciarSesion(evento) {
    // Evitamos que el formulario recargue la página
    evento.preventDefault();

    // Leemos los datos introducidos
    const usuario = usuarioAcceso.value.trim();
    const contrasena = contrasenaAcceso.value;

    // Validamos el formato de los datos de acceso
    const validacion = validarAcceso({ usuario, contrasena });

    if (validacion.esValido) {
        sessionStorage.setItem(CLAVE_SESION_ACCESO, "si");
        errorAcceso.textContent = "";
        formularioAcceso.reset();
        ocultarAcceso();
        mostrarEstado("Sesión iniciada correctamente.");
        return;
    }

    // Si no cumple el formato, mostramos el error correspondiente
    errorAcceso.textContent = validacion.errores.usuario || validacion.errores.contrasena;

    if (validacion.errores.usuario) {
        usuarioAcceso.focus();
    } else {
        contrasenaAcceso.value = "";
        contrasenaAcceso.focus();
    }
}

// función que muestra la pantalla de acceso
function mostrarAcceso() {
    capaAcceso.classList.remove("oculto");
    document.body.classList.add("acceso-bloqueado");
    usuarioAcceso.focus();
}

// función que oculta la pantalla de acceso
function ocultarAcceso() {
    capaAcceso.classList.add("oculto");
    document.body.classList.remove("acceso-bloqueado");
}

// función que cierra la sesión y vuelve a pedir acceso
function cerrarSesion() {
    sessionStorage.removeItem(CLAVE_SESION_ACCESO);
    formularioAcceso.reset();
    errorAcceso.textContent = "";
    mostrarAcceso();
}

// función que prepara la respuestá del worker
function asignarTrabajador() {
    // Cuando el worker devuelve datos, pintamos las tarjetas
    trabajadorFiltros.addEventListener("message", (evento) => {
        // Convertimos los objetos planos otra vez en objetos de la clase Pantalla
        const pantallasFiltradas = evento.data.map((elemento) => Pantalla.crear(elemento));

        // Pintamos las pantallas filtradas
        pintarPantallas(pantallasFiltradas);
        // Mostramos cuantos resultados hay
        mostrarEstado(pantallasFiltradas.length + " resultado(s) mostrado(s).");
    });
}

// función para recuperar los filtros guardados
function recuperarFiltros() {
    // Cargamos filtros desde sessionStorage
    const filtrosGuardados = ServicioAlmacenamiento.cargarFiltros();

    // Rellenamos los controles del filtro
    busquedaPantalla.value = filtrosGuardados.busqueda || "";
    filtroTipo.value = filtrosGuardados.tipo || "";
    filtroEstado.value = filtrosGuardados.estado || "";
    ordenPantallas.value = filtrosGuardados.orden || "nombre";
}

// función para recuperar el tema desde cookie
function recuperarTema() {
    // Leemos la cookie del fondo oscuro
    const cookieTema = ServicioAlmacenamiento.cargarFondoOscuro();

    // Si no existe, activamos oscuro por defecto y lo guardamos
    if (cookieTema === "") {
        ServicioAlmacenamiento.guardarFondoOscuro(true);
        fondoOscuro = true;
    } else {
        // Si existe, miramos si vale si o no
        fondoOscuro = cookieTema === "si";
    }

    // Aplicamos el tema a la página
    pintarTemaOscuro();
}

// función para cambiar entre modo oscuro y claro
function cambiarTema() {
    // Cambiamos el valor booleano
    fondoOscuro = !fondoOscuro;
    // Guardamos el nuevo valor en cookie
    ServicioAlmacenamiento.guardarFondoOscuro(fondoOscuro);
    // Pintamos el cambio
    pintarTemaOscuro();
}

// función que aplica la clase CSS del modo oscuro
function pintarTemaOscuro() {
    // Si fondoOscuro es true, se añade la clase; si es false, se quita
    document.body.classList.toggle("fondo-oscuro", fondoOscuro);
    // Cambiamos el texto del bot?n
    botonTema.textContent = fondoOscuro ? "Modo claro" : "Modo oscuro";
}

// función para cargar pantallas
async function cargarDatos() {
    // Intentamos leer pantallas guardadas en localStorage
    const pantallasGuardadas = ServicioAlmacenamiento.cargarPantallas();

    // Vaciamos el array antes de llenarlo
    pantallas.length = 0;

    // Si hay datos guardados, usamos esos datos
    if (pantallasGuardadas.length > 0) {
        pantallasGuardadas.forEach((pantallaActual) => pantallas.push(pantallaActual));
        mostrarEstado("Inventario recuperado desde localStorage.");
    } else {
        // Si no hay datos guardados, cargamos el JSON inicial con fetch
        const pantallasJson = await ServicioApi.cargarPantallasIniciales();
        // Metemos cada pantalla en el array
        pantallasJson.forEach((pantallaActual) => pantallas.push(pantallaActual));
        // Guardamos esas pantallas iniciales en localStorage
        ServicioAlmacenamiento.guardarPantallas(pantallas);
        mostrarEstado("Inventario inicial cargado desde JSON.");
    }

    // Actualizamos el listado
    aplicarFiltros();
}

// función que recupera la última pantalla pulsada para editar
function recuperarUltimaPantallaModificada() {
    // Leemos la referencia guardada en cookie
    const referencia = ServicioAlmacenamiento.cargarUltimaPantallaModificada();
    // Buscamos la pantalla con esa referencia
    const pantallaModificada = pantallas.find((pantallaActual) => pantallaActual.referencia === referencia);

    // Si existe, rellenamos el formulario
    if (pantallaModificada) {
        rellenarFormulario(pantallaModificada);
        mostrarEstado("Formulario preparado con la ultima pantalla modificada: " + referencia + ".");
    }
}

// función para recargar desde el JSON original
async function recargarJson() {
    // Usamos try/catch porque fetch puede fallar
    try {
        // Cargamos las pantallas del JSON
        const pantallasJson = await ServicioApi.cargarPantallasIniciales();

        // Vaciamos el array actual
        pantallas.length = 0;
        // Metemos los datos del JSON
        pantallasJson.forEach((pantallaActual) => pantallas.push(pantallaActual));
        // Guardamos en localStorage
        ServicioAlmacenamiento.guardarPantallas(pantallas);
        // Dejamos el formulario limpio
        limpiarFormulario();
        // Refrescamos el listado
        aplicarFiltros();
        // Informamos al usuario
        mostrarEstado("Datos iniciales recargados desde json/pantallas.json.");
        // Al recargar el JSON se vuelve a pedir acceso
        cerrarSesion();
    } catch (error) {
        // Si algo falla, mostramos el mensaje
        mostrarEstado(error.message);
    }
}

// función para cargar el clima del taller
async function cargarClima() {
    // Usamos try/catch porque la API externa puede fallar
    try {
        // Pedimos el clima al servicio
        const clima = await ServicioApi.cargarClimaTaller();
        // Guardamos el dato actual en una variable
        const actual = clima.current;

        // No se muestra en el index; solo se guarda para estad?sticas
        climaTaller = actual.temperature_2m + " C - viento " + actual.wind_speed_10m + " km/h";
    } catch (error) {
        // Si falla, dejamos un texto de reserva
        climaTaller = "No disponible";
        console.warn(error);
    }
}

// función para guardar una pantalla nueva o modificar una existente
async function guardarPantalla(evento) {
    // Evitamos que el formulario recargue la página
    evento.preventDefault();

    // Leemos todos los campos del formulario
    // Miramos si estamos editando una pantalla
    const referenciaActual = referenciaEdicion.value;
    // Leemos todos los campos del formulario
    const datosFormulario = await leerFormulario(referenciaActual);
    // Validamos los datos antes de guardar
    const validacion = validarPantalla(datosFormulario, pantallas, referenciaActual);

    // Si hay errores, los mostramos y salimos
    if (!validacion.esValido) {
        pintarErrores(validacion.errores);
        mostrarEstado("Revisa los campos marcados antes de guardar.");
        return;
    }

    // Creamos una instancia de pantalla con los datos del formulario
    const pantallaNueva = new Pantalla(datosFormulario);

    // Si referenciaActual tiene valor, estamos modificando
    if (referenciaActual) {
        // Recorremos el array para sustituir la pantalla modificada
        for (let i = 0; i < pantallas.length; i++) {
            if (pantallas[i].referencia === referenciaActual) {
                pantallas[i] = pantallaNueva;
            }
        }

        // Guardamos en cookie la última pantalla modificada
        ServicioAlmacenamiento.guardarUltimaPantallaModificada(pantallaNueva);
        // Mostramos mensaje
        mostrarEstado("Pantalla " + pantallaNueva.referencia + " actualizada correctamente.");
    } else {
        // Si no estamos modificando, añadimos la pantalla al array
        pantallas.push(pantallaNueva);
        // Mostramos mensaje
        mostrarEstado("Pantalla " + pantallaNueva.referencia + " creada correctamente.");
        // Mandamos una petición POST al servidor local
        registrarAltaSinBloquear(pantallaNueva);
    }

    // Guardamos el array en localStorage
    ServicioAlmacenamiento.guardarPantallas(pantallas);
    // Limpiamos el formulario
    limpiarFormulario();
    // Refrescamos el listado
    aplicarFiltros();
}

// función para registrar el alta en servidor sin bloquear la app
async function registrarAltaSinBloquear(pantallaActual) {
    // Usamos try/catch porque está petición no debe romper la aplicación
    try {
        // Enviamos la pantalla con fetch POST
        const resultado = await ServicioApi.registrarAltaPantalla(pantallaActual);
        // Mostramos que el alta tambien se ha registrado en servidor
        mostrarEstado(resultado.mensaje + ". Total altas servidor: " + resultado.totalAltas + ".");
    } catch (error) {
        // Avisamos en pantalla y dejamos tambien el aviso en consola
        mostrarEstado("La pantalla se ha guardado en localStorage, pero no se ha registrado en servidor.");
        console.warn("No se pudo registrar el alta en servidor", error);
    }
}

// función que gestiona clicks dentro de la lista de pantallas
function gestionarClickLista(evento) {
    // Buscamos si el click viene de un bot?n con data-acci?n
    const boton = evento.target.closest("button[data-accion]");

    // Si no se ha pulsado un bot?n de acci?n, no hacemos nada
    if (!boton) {
        return;
    }

    // Leemos la acci?n y la referencia guardadas en data
    const accion = boton.dataset.accion;
    const referencia = boton.dataset.referencia;
    // Buscamos la pantalla correspondiente
    const pantallaActual = pantallas.find((elemento) => elemento.referencia === referencia);

    // Si no existe, salimos
    if (!pantallaActual) {
        return;
    }

    // Accion para ver detalle
    if (accion === "detalle") {
        abrirVentanaDetalle(pantallaActual);
    }

    // Accion para editar
    if (accion === "editar") {
        ServicioAlmacenamiento.guardarUltimaPantallaModificada(pantallaActual);
        rellenarFormulario(pantallaActual);
        mostrarEstado("Pantalla " + pantallaActual.referencia + " guardada en cookie para modificar.");
    }

    // Accion para eliminar
    if (accion === "eliminar") {
        eliminarPantalla(pantallaActual);
    }
}

// función para eliminar una pantalla
function eliminarPantalla(pantallaActual) {
    // Pedimos confirmacion antes de borrar
    const confirmado = window.confirm("Eliminar la pantalla " + pantallaActual.referencia + "?");

    // Si se cancela, salimos
    if (!confirmado) {
        return;
    }

    // Recorremos hacia atras para poder borrar con splice
    for (let i = pantallas.length - 1; i >= 0; i--) {
        if (pantallas[i].referencia === pantallaActual.referencia) {
            pantallas.splice(i, 1);
        }
    }

    // Guardamos cambios
    ServicioAlmacenamiento.guardarPantallas(pantallas);
    // Limpiamos formulario
    limpiarFormulario();
    // Refrescamos listado
    aplicarFiltros();
    // Mostramos mensaje
    mostrarEstado("Pantalla " + pantallaActual.referencia + " eliminada del inventario.");
}

// función que aplica filtros usando el worker
function aplicarFiltros() {
    // Leemos filtros actuales
    const filtros = leerFiltros();

    // Guardamos filtros en sessionStorage
    ServicioAlmacenamiento.guardarFiltros(filtros);
    // Mostramos mensaje temporal
    mostrarEstado("Filtrando con Web Worker...");

    // Enviamos datos al worker
    trabajadorFiltros.postMessage({
        pantallas: pantallas.map((pantallaActual) => pantallaActual.convertirObjeto()),
        filtros
    });
}

// función que pinta las pantallas filtradas en el listado
function pintarPantallas(pantallasFiltradas) {
    // Borramos el contenido anterior
    listaPantallas.replaceChildren();

    // Si no hay resultados, mostramos estado vacío
    if (pantallasFiltradas.length === 0) {
        listaPantallas.appendChild(creadorNodos.crearEstadoVacio());
        return;
    }

    // Por cada pantalla creamos una tarjeta con la clase nodos
    pantallasFiltradas.forEach((pantallaActual) => {
        listaPantallas.appendChild(creadorNodos.crearTarjeta(pantallaActual));
    });
}

// función que lee el formulario
async function leerFormulario(referenciaActual = "") {
    // Si estamos editando y no se cambia la imagen, conservamos la anterior
    const pantallaEditada = pantallas.find((pantallaActual) => pantallaActual.referencia === referenciaActual);

    // Devolvemos un objeto con los valores del formulario
    return {
        nombre: campoNombre.value,
        referencia: campoReferencia.value,
        tamaño: campoTamaño.value,
        tipo: campoTipo.value,
        estado: campoEstado.value,
        precio: campoPrecio.value,
        fechaFabricación: campoFecha.value,
        imagen: await leerImagenFormulario(pantallaEditada)
    };
}

// función que obtiene la imagen del formulario
async function leerImagenFormulario(pantallaEditada) {
    // Archivo elegido desde el equipo
    const archivo = campoImagen.files[0];

    // Si hay archivo, lo Convertimos a base64 con FileReader
    if (archivo) {
        return convertirArchivoImagen(archivo);
    }

    // Si editamos sin tocar imagen, mantenemos la que ya tenia
    if (pantallaEditada) {
        return pantallaEditada.imagen;
    }

    // Imagen por defecto
    return "src/navisson-logo.png";
}

// Convierte un archivo de imagen en una URL de datos para guardarla en localStorage
function convertirArchivoImagen(archivo) {
    return new Promise((resolve, reject) => {
        const lector = new FileReader();

        lector.addEventListener("load", () => {
            resolve(lector.result);
        });

        lector.addEventListener("error", () => {
            reject(new Error("No se pudo leer la imagen seleccionada."));
        });

        lector.readAsDataURL(archivo);
    });
}

// función que rellena el formulario al editar
function rellenarFormulario(pantallaActual) {
    // Cambiamos el titulo
    tituloFormulario.textContent = "Editar pantalla";
    // Guardamos la referencia original en el campo oculto
    referenciaEdicion.value = pantallaActual.referencia;
    // Rellenamos cada campo
    campoNombre.value = pantallaActual.nombre;
    campoReferencia.value = pantallaActual.referencia;
    campoTamaño.value = pantallaActual.tamaño;
    campoTipo.value = pantallaActual.tipo;
    campoEstado.value = pantallaActual.estado;
    campoPrecio.value = pantallaActual.precio;
    campoFecha.value = pantallaActual.fechaFabricación;
    // Ponemos el foco en el primer campo
    campoNombre.focus();
}

// función que limpia el formulario
function limpiarFormulario() {
    // Reseteamos los campos
    formularioPantalla.reset();
    // Volvemos al titulo inicial
    tituloFormulario.textContent = "Nueva pantalla";
    // Quitamos la referencia de edici?n
    referenciaEdicion.value = "";
    // Limpiamos errores
    limpiarErrores();
}

// función que pinta errores campo a campo
function pintarErrores(errores) {
    // Primero limpiamos errores anteriores
    limpiarErrores();

    // Error de nombre
    if (errores.nombre) {
        errorNombre.textContent = errores.nombre;
        campoNombre.classList.add("campo-invalido");
    }

    // Error de referencia
    if (errores.referencia) {
        errorReferencia.textContent = errores.referencia;
        campoReferencia.classList.add("campo-invalido");
    }

    // Error de tamaño
    if (errores.tamaño) {
        errorTamaño.textContent = errores.tamaño;
        campoTamaño.classList.add("campo-invalido");
    }

    // Error de tipo
    if (errores.tipo) {
        errorTipo.textContent = errores.tipo;
        campoTipo.classList.add("campo-invalido");
    }

    // Error de estado
    if (errores.estado) {
        errorEstado.textContent = errores.estado;
        campoEstado.classList.add("campo-invalido");
    }

    // Error de precio
    if (errores.precio) {
        errorPrecio.textContent = errores.precio;
        campoPrecio.classList.add("campo-invalido");
    }

    // Error de fecha
    if (errores.fechaFabricación) {
        errorFecha.textContent = errores.fechaFabricación;
        campoFecha.classList.add("campo-invalido");
    }
}

// función para quitar errores
function limpiarErrores() {
    // Vaciamos textos de error
    errorNombre.textContent = "";
    errorReferencia.textContent = "";
    errorTamaño.textContent = "";
    errorTipo.textContent = "";
    errorEstado.textContent = "";
    errorPrecio.textContent = "";
    errorFecha.textContent = "";

    // Quitamos clase de error de todos los campos
    campoNombre.classList.remove("campo-invalido");
    campoReferencia.classList.remove("campo-invalido");
    campoTamaño.classList.remove("campo-invalido");
    campoTipo.classList.remove("campo-invalido");
    campoEstado.classList.remove("campo-invalido");
    campoPrecio.classList.remove("campo-invalido");
    campoFecha.classList.remove("campo-invalido");
}

// función que lee los filtros
function leerFiltros() {
    // Devolvemos los valores actuales de los filtros
    return {
        busqueda: busquedaPantalla.value.trim(),
        tipo: filtroTipo.value,
        estado: filtroEstado.value,
        orden: ordenPantallas.value
    };
}

// función para escribir mensajes de estado
function mostrarEstado(mensaje) {
    // Cambiamos el texto de la l?nea de estado
    lineaEstado.textContent = mensaje;
}

// función para abrir una ventana con el detalle de una pantalla
function abrirVentanaDetalle(pantallaActual) {
    // Creamos ventana nueva
    const ventanaDetalle = window.open("", "detalle-" + pantallaActual.referencia, "width=520,height=620");

    // Si el navegador bloquea la ventana, avisamos
    if (!ventanaDetalle) {
        mostrarEstado("El navegador ha bloqueado la ventana de detalle.");
        return;
    }

    // Escribimos el HTML de detalle
    ventanaDetalle.document.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Detalle ${pantallaActual.referencia}</title>
            <style>
                body { margin: 0; font-family: Arial, sans-serif; color: #20201f; background: #f7f7f6; }
                main { padding: 28px; }
                h1 { margin: 0 0 8px; }
                img { width: 100%; max-height: 240px; object-fit: contain; background: #fff; border-radius: 8px; margin: 0 0 18px; padding: 12px; }
                .ref { color: #6d6d68; margin: 0 0 18px; }
                dl { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
                div { padding: 14px; border-radius: 8px; background: #fff; border-left: 4px solid #D49454; }
                dt { font-weight: 700; }
                dd { margin: 4px 0 0; }
            </style>
        </head>
        <body>
            <main>
                <h1>${pantallaActual.nombre}</h1>
                <p class="ref">${pantallaActual.referencia}</p>
                <img src="${pantallaActual.imagen}" alt="Imagen de ${pantallaActual.nombre}">
                <dl>
                    <div><dt>Tipo</dt><dd>${pantallaActual.tipo}</dd></div>
                    <div><dt>Estado</dt><dd>${pantallaActual.estado}</dd></div>
                    <div><dt>Tamaño</dt><dd>${pantallaActual.tamaño}"</dd></div>
                    <div><dt>Precio</dt><dd>${pantallaActual.obtenerPrecioFormateado()}</dd></div>
                    <div><dt>Fabricación</dt><dd>${pantallaActual.fechaFabricación}</dd></div>
                    <div><dt>Días desde fabricación</dt><dd>${pantallaActual.obtenerDiasDesdeFabricación()}</dd></div>
                </dl>
            </main>
        </body>
        </html>
    `);
    // Cerramos el documento para que termine de renderizar
    ventanaDetalle.document.close();
}

// función para abrir una ventana con estad?sticas
function abrirVentanaEstadísticas() {
    // Total de pantallas registradas
    const total = pantallas.length;
    // Pantallas en stock
    const stock = pantallas.filter((pantallaActual) => pantallaActual.estado === "En stock").length;
    // Pantallas enviadas
    const enviadas = pantallas.filter((pantallaActual) => pantallaActual.estado === "Enviada").length;
    // Pantallas defectuosas
    const defectuosas = pantallas.filter((pantallaActual) => pantallaActual.estado === "Defectuosa").length;
    // Suma de precios para calcular la media
    const sumaPrecios = pantallas.reduce((suma, pantallaActual) => suma + pantallaActual.precio, 0);
    // Precio medio: suma de todos los precios dividido entre la cantidad de pantallas
    const media = total === 0 ? 0 : sumaPrecios / total;
    // Pantalla más cara
    const masCara = [...pantallas].sort((primera, segunda) => segunda.precio - primera.precio)[0];
    // Creamos ventana nueva
    const ventanaEstadísticas = window.open("", "navisson-estadisticas", "width=620,height=700");

    // Si el navegador bloquea la ventana, avisamos
    if (!ventanaEstadísticas) {
        mostrarEstado("El navegador ha bloqueado la ventana de estadisticas.");
        return;
    }

    // Escribimos las estad?sticas, incluyendo los datos que ya no aparecen en el index
    ventanaEstadísticas.document.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Estadísticas Navisson</title>
            <style>
                body { margin: 0; font-family: Arial, sans-serif; color: #20201f; background: #f7f7f6; }
                main { padding: 28px; }
                h1 { margin-top: 0; }
                section { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
                article { padding: 16px; background: #fff; border-radius: 8px; border-left: 4px solid #D49454; }
                strong { display: block; font-size: 1.6rem; }
                p { margin: 8px 0 0; color: #5f5f5a; }
                @media (max-width: 560px) { section { grid-template-columns: 1fr; } }
            </style>
        </head>
        <body>
            <main>
                <h1>Estadísticas del inventario</h1>
                <section>
                    <article><strong>${total}</strong><span>Pantallas registradas</span></article>
                    <article><strong>${stock}</strong><span>Pantallas en stock</span></article>
                    <article>
                        <strong>${new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(media)}</strong>
                        <span>Precio medio</span>
                    </article>
                    <article><strong>${climaTaller}</strong><span>Clima taller</span></article>
                    <article><strong>${enviadas}</strong><span>Pantallas enviadas</span></article>
                    <article><strong>${defectuosas}</strong><span>Pantallas defectuosas</span></article>
                    <article><strong>${masCara ? masCara.nombre : "Sin datos"}</strong><span>Pantalla de mayor precio</span></article>
                </section>
            </main>
        </body>
        </html>
    `);
    // Cerramos el documento de la ventana
    ventanaEstadísticas.document.close();
}




