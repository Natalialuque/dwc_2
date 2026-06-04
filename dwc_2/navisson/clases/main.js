/**
 * Clase del main general de la aplicacion
 */

//Importamos todo lo necesario 
import { Pantalla } from "./pantallas/Pantalla.js";
import { Nodos } from "./nodos/Nodos.js";
import { ServicioApi } from "./datos/ServicioApi.js";
import { ServicioAlmacenamiento } from "./datos/ServicioAlmacenamiento.js";
import { validarAcceso, validarPantalla } from "./utilidades/validadores.js";

// Creamos un objeto de la clase Nodos
const creadorNodos = new Nodos();
// Creamos toda la estructura del contenedor del index
creadorNodos.crearAplicacion();
// Creamos la pantalla de acceso inicial
creadorNodos.crearAcceso();

// Llamamos a las variables para poder usarlas y modificarlas
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

// Variables de los botones principales
const botonRecargar = document.getElementById("botonRecargar");
const botonEstadisticas = document.getElementById("botonEstadisticas");
const botonTema = document.getElementById("botonTema");

// Variables de los campos del formulario
const campoNombre = document.getElementById("nombrePantalla");
const campoReferencia = document.getElementById("referenciaPantalla");
const campoTamano = document.getElementById("tamanoPantalla");
const campoTipo = document.getElementById("tipoPantalla");
const campoEstado = document.getElementById("estadoPantalla");
const campoPrecio = document.getElementById("precioPantalla");
const campoFecha = document.getElementById("fechaPantalla");
const campoImagen = document.getElementById("imagenPantalla");

// Variables de los mensajes de error del formulario
const errorNombre = document.getElementById("errorNombrePantalla");
const errorReferencia = document.getElementById("errorReferenciaPantalla");
const errorTamano = document.getElementById("errorTamanoPantalla");
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
const trabajadorFiltros = new Worker("clases/worker/FiltrosWorkers.js");

// Array donde guardamos las pantallas creadas o cargadas
const pantallas = [];

// Variable para recordar si esta activo el fondo oscuro
let fondoOscuro = true;

// Variable para guardar el clima del taller y mostrarlo solo en estadisticas
let climaTaller = "No disponible";

const CLAVE_SESION_ACCESO = "navisson.sesionIniciada";

// Iniciamos la aplicacion
iniciarAplicacion();

// funcion principal de arranque de la aplicacion
async function iniciarAplicacion() {
    // Asignamos todos los eventos de botones, filtros y formulario
    asignarEventos();
    // Mostramos o escondemos el acceso segun la sesion
    controlarAcceso();
    // Preparamos el worker para recibir resultados
    asignarTrabajador();
    // Recuperamo filtros guardados en sessionStorage
    recuperarFiltros();
    // Recuperamos la cookie del modo oscuro
    recuperarTema();
    // Cargamos pantallas desde localStorage o desde JSON
    await cargarDatos();
    // Recuperamos la ultima pantalla pulsada para modificar
    recuperarUltimaPantallaModificada();
    // Cargamos el clima, pero no lo pintamos en el index
    await cargarClima();
}

// funcion donde se asignan los eventos
function asignarEventos() {
    // Evento submit del formulario de acceso
    formularioAcceso.addEventListener("submit", iniciarSesion);
    // Evento submit del formulario para guardar o modificar pantalla
    formularioPantalla.addEventListener("submit", guardarPantalla);
    // Evento para cancelar la edicion
    botonCancelarEdicion.addEventListener("click", limpiarFormulario);
    // Evento delegado para los botones de cada tarjeta
    listaPantallas.addEventListener("click", gestionarClickLista);
    // Eventos de filtros
    busquedaPantalla.addEventListener("input", aplicarFiltros);
    filtroTipo.addEventListener("change", aplicarFiltros);
    filtroEstado.addEventListener("change", aplicarFiltros);
    ordenPantallas.addEventListener("change", aplicarFiltros);
    // Eventos de botones de la cabecera
    botonRecargar.addEventListener("click", recargarJson);
    botonEstadisticas.addEventListener("click", abrirVentanaEstadisticas);
    botonTema.addEventListener("click", cambiarTema);

    // Antes de cerrar o recargar guardamos los filtros en sessionStorage
    window.addEventListener("beforeunload", () => {
        ServicioAlmacenamiento.guardarFiltros(leerFiltros());
    });
}

// funcion que muestra el acceso si no hay sesion iniciada
function controlarAcceso() {
    if (sessionStorage.getItem(CLAVE_SESION_ACCESO) === "si") {
        ocultarAcceso();
    } else {
        mostrarAcceso();
    }
}

// funcion que comprueba usuario y contraseña
function iniciarSesion(evento) {
    // Evitamos que el formulario recargue la pagina
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
        mostrarEstado("Sesion iniciada correctamente.");
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

// funcion que muestra la pantalla de acceso
function mostrarAcceso() {
    capaAcceso.classList.remove("oculto");
    document.body.classList.add("acceso-bloqueado");
    usuarioAcceso.focus();
}

// funcion que oculta la pantalla de acceso
function ocultarAcceso() {
    capaAcceso.classList.add("oculto");
    document.body.classList.remove("acceso-bloqueado");
}

// funcion que cierra la sesion y vuelve a pedir acceso
function cerrarSesion() {
    sessionStorage.removeItem(CLAVE_SESION_ACCESO);
    formularioAcceso.reset();
    errorAcceso.textContent = "";
    mostrarAcceso();
}

// funcion que prepara la respuesta del worker
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

// funcion para recuperar los filtros guardados
function recuperarFiltros() {
    // Cargamos filtros desde sessionStorage
    const filtrosGuardados = ServicioAlmacenamiento.cargarFiltros();

    // Rellenamos los controles del filtro
    busquedaPantalla.value = filtrosGuardados.busqueda || "";
    filtroTipo.value = filtrosGuardados.tipo || "";
    filtroEstado.value = filtrosGuardados.estado || "";
    ordenPantallas.value = filtrosGuardados.orden || "nombre";
}

// funcion para recuperar el tema desde cookie
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

    // Aplicamos el tema a la pagina
    pintarTemaOscuro();
}

// funcion para cambiar entre modo oscuro y claro
function cambiarTema() {
    // Cambiamos el valor booleano
    fondoOscuro = !fondoOscuro;
    // Guardamos el nuevo valor en cookie
    ServicioAlmacenamiento.guardarFondoOscuro(fondoOscuro);
    // Pintamos el cambio
    pintarTemaOscuro();
}

// funcion que aplica la clase CSS del modo oscuro
function pintarTemaOscuro() {
    // Si fondoOscuro es true, se anade la clase; si es false, se quita
    document.body.classList.toggle("fondo-oscuro", fondoOscuro);
    // Cambiamos el texto del boton
    botonTema.textContent = fondoOscuro ? "Modo claro" : "Modo oscuro";
}

// funcion para cargar pantallas
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

// funcion que recupera la ultima pantalla pulsada para editar
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

// funcion para recargar desde el JSON original
async function recargarJson() {
    // Usamos try/catch porque fetch puede fallar
    try {
        // Cargamos las patallas del JSON
        const pantallasJson = await ServicioApi.cargarPantallasIniciales();

        // Vaciamos el array actual
        pantallas.length = 0;
        // Metemos los datos del JSON
        pantallasJson.forEach((pantallaActual) => pantallas.push(pantallaActual));
        // Guardamos en localStorage
        ServicioAlmacenamiento.guardarPantallas(pantallas);
        // Dejamos el formulario limpi
        limpiarFormulario();
        // Refrescamos el listado
        aplicarFiltros();
        // Informamos al usuario
        mostrarEstado("Datos iniciales recargados desde json/pantallas.json.");
        // Al recargar e JSON se vuelve a pedir acceso
        cerrarSesion();
    } catch (error) {
        // Si algo falla, mostramos el mensaje
        mostrarEstado(error.message);
    }
}

// funcion paa cargar el clima del taller
async function cargarClima() {
    // Usamos try/catch porque la API externa puede fallar
    try {
        // Pedimos el clima al servicio
        const clima = await ServicioApi.cargarClimaTaller();
        // Guardamos el dato actual en una variable
        const actual = clima.current;

        // No se muestra en el index; solo se guarda para estadisticas
        climaTaller = actual.temperature_2m + " C - viento " + actual.wind_speed_10m + " km/h";
    } catch (error) {
        // Si falla, dejamos un texto de reserva
        climaTaller = "No disponible";
        console.error(error);
    }
}

// funcion para guardar una pantalla nueva o modificar una existente
async function guardarPantalla(evento) {
    // Evitamos que el formulario recargue la pagina
    evento.preventDefault();

    // Miramos si estamos editando una pantalla
    const referenciaActual = referenciaEdicion.value;
    // Leemos todos los campos del formulario
    const datosFormulario = await leerFormulario(referenciaActual);
    // Validamos los datos antes de guardar
    const validacion = validarPantalla(datosFormulario, pantallas, referenciaActual);

    // Si hay errores, los mostramos y fuera
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

        // Guardamos en cookie la ultima pantalla modificada
        ServicioAlmacenamiento.guardarUltimaPantallaModificada(pantallaNueva);
        // Mostramos mensaje
        mostrarEstado("Pantalla " + pantallaNueva.referencia + " actualizada correctamente.");
    } else {
        // Si no estamos modificando, anadimos la pantalla al array
        pantallas.push(pantallaNueva);
        // Mostramos mensaje
        mostrarEstado("Pantalla " + pantallaNueva.referencia + " creada correctamente.");
        // Mandamos una peticion POST al servidor local
        registrarAltaSinBloquear(pantallaNueva);
    }

    // Guardamos el array en localStorage
    ServicioAlmacenamiento.guardarPantallas(pantallas);
    // Limpiamos el formulario
    limpiarFormulario();
    // Refrescamos el listado
    aplicarFiltros();
}

// funcion para registrar el alta en servidor sin bloquear la app
async function registrarAltaSinBloquear(pantallaActual) {
    // Usamos try/catch porque esta peticion no debe romper la aplicacion
    try {
        // Enviamos la pantalla con fetch POST
        const resultado = await ServicioApi.registrarAltaPantalla(pantallaActual);
        // Mostramos que el alta tambien se ha registrado en servidor
        mostrarEstado(resultado.mensaje + ". Total altas servidor: " + resultado.totalAltas + ".");
    } catch (error) {
        // Avisamos en pantalla y dejamos tambien el aviso en consola
        mostrarEstado("La pantalla se ha guardado en localStorage, pero no se ha registrado en servidor.");
        console.error("No se pudo registrar el alta en servidor", error);
    }
}

// funcion que gestiona clicks dentro de la lista de pantallas
function gestionarClickLista(evento) {
    // Buscamos si el click viene de un boton con data-accion
    const boton = evento.target.closest("button[data-accion]");

    // Si no se ha pulsado un boton de accion, no hacemos nada
    if (!boton) {
        return;
    }

    // Leemos la accion y la referencia guardadas en data
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

// funcion para eliminar una pantalla
function eliminarPantalla(pantallaActual) {
    // Pedimos confirmacion antes de borrar
    const confirmado = window.confirm("Eliminar la pantalla " + pantallaActual.referencia + "?");

    // Si se cancela, salimos
    if (!confirmado) {
        return;
    }

    // vamos hacia atras para poder borrar con splice
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

// funcion que aplica filtros usando el worker
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

// funcion que pinta las pantallas filtradas en el listado
function pintarPantallas(pantallasFiltradas) {
    // Borramos el contenido anterior
    listaPantallas.replaceChildren();

    // Si no hay resultados, mostramos estado vacio
    if (pantallasFiltradas.length === 0) {
        listaPantallas.appendChild(creadorNodos.crearEstadoVacio());
        return;
    }

    // Por cada pantalla creamos una tarjeta con la clase nodos
    pantallasFiltradas.forEach((pantallaActual) => {
        listaPantallas.appendChild(creadorNodos.crearTarjeta(pantallaActual));
    });
}

// funcion que lee el formulari
async function leerFormulario(referenciaActual = "") {
    // Si estamos editando y no se cambia la imagen, conservamos la anterior
    const pantallaEditada = pantallas.find((pantallaActual) => pantallaActual.referencia === referenciaActual);

    // Devolvemos un objto con los valores del formulario
    return {
        nombre: campoNombre.value,
        referencia: campoReferencia.value,
        tamano: campoTamano.value,
        tipo: campoTipo.value,
        estado: campoEstado.value,
        precio: campoPrecio.value,
        fechaFabricacion: campoFecha.value,
        imagen: await leerImagenFormulario(pantallaEditada)
    };
}

// funcion que obtiene la imgen del formulario
async function leerImagenFormulario(pantallaEditada) {
    // Archivo elegido desde el equipo
    const archivo = campoImagen.files[0];

    // Si hay archivo lo Convertimos a base64 con FileReader
    if (archivo) {
        return convertirArchivoImagen(archivo);
    }

    // Si editamos sin tocar imagen mantenemos la que ya tenia
    if (pantallaEditada) {
        return pantallaEditada.imagen;
    }

    // Imagen por defecto
    return "src/navisson-logo.png";
}

// Convierte un archiv de imagen en una URL de datos para guardarla en localStorage
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

// funcion que rellena el formulario al editar
function rellenarFormulario(pantallaActual) {
    // Cambiamos el titulo
    tituloFormulario.textContent = "Editar pantalla";
    // guardamos la referencia original en el campo oculto
    referenciaEdicion.value = pantallaActual.referencia;
    // completamos cada campo
    campoNombre.value = pantallaActual.nombre;
    campoReferencia.value = pantallaActual.referencia;
    campoTamano.value = pantallaActual.tamano;
    campoTipo.value = pantallaActual.tipo;
    campoEstado.value = pantallaActual.estado;
    campoPrecio.value = pantallaActual.precio;
    campoFecha.value = pantallaActual.fechaFabricacion;
    // Ponemos el foco en el primer campo
    campoNombre.focus();
}

// funcion que limpia el formulario
function limpiarFormulario() {
    // Reseteamos los campos
    formularioPantalla.reset();
    // Volvemos al titulo inicial
    tituloFormulario.textContent = "Nueva pantalla";
    // Quitamos la referencia de edicion
    referenciaEdicion.value = "";
    // Limpiamos errores
    limpiarErrores();
}

// funcion que escribe errores uno a uno
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
    if (errores.tamano) {
        errorTamano.textContent = errores.tamano;
        campoTamano.classList.add("campo-invalido");
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
    if (errores.fechaFabricacion) {
        errorFecha.textContent = errores.fechaFabricacion;
        campoFecha.classList.add("campo-invalido");
    }
}

// funcion para quitar errores
function limpiarErrores() {
    // Vaciamos textos de error
    errorNombre.textContent = "";
    errorReferencia.textContent = "";
    errorTamano.textContent = "";
    errorTipo.textContent = "";
    errorEstado.textContent = "";
    errorPrecio.textContent = "";
    errorFecha.textContent = "";

    // Quitamos clase de error de todos los campos
    campoNombre.classList.remove("campo-invalido");
    campoReferencia.classList.remove("campo-invalido");
    campoTamano.classList.remove("campo-invalido");
    campoTipo.classList.remove("campo-invalido");
    campoEstado.classList.remove("campo-invalido");
    campoPrecio.classList.remove("campo-invalido");
    campoFecha.classList.remove("campo-invalido");
}

// funcion para leer los filtros
function leerFiltros() {
    // Devolvemos los valores actuales de los filtros
    return {
        busqueda: busquedaPantalla.value.trim(),
        tipo: filtroTipo.value,
        estado: filtroEstado.value,
        orden: ordenPantallas.value
    };
}

// funcion para escribir mensaje del estado
function mostrarEstado(mensaje) {

    lineaEstado.textContent = mensaje;
}

// Funcion para preparar el documento de una ventana nueva
function prepararDocumentoVentana(ventana, titulo) {
    const documento = ventana.document;
    const meta = documento.createElement("meta");

    documento.documentElement.lang = "es";
    documento.title = titulo;
    meta.setAttribute("charset", "UTF-8");
    documento.head.replaceChildren(meta);
    documento.body.replaceChildren();

    Object.assign(documento.body.style, {
        margin: "0",
        fontFamily: "Arial, sans-serif",
        color: "#20201f",
        background: "#f7f7f6"
    });

    return documento;
}

// Funcion para crear el main de las ventanas que salen aparte
function crearMainVentana(documento) {
    const principal = documento.createElement("main");

    principal.style.padding = "28px";

    return principal;
}

// Funcion para montar cada dato del detalle con nodos
function crearDatoVentana(documento, etiqueta, valor) {
    const contenedor = documento.createElement("div");
    const titulo = documento.createElement("dt");
    const texto = documento.createElement("dd");

    Object.assign(contenedor.style, {
        padding: "14px",
        borderRadius: "8px",
        background: "#fff",
        borderLeft: "4px solid #D49454"
    });
    titulo.style.fontWeight = "700";
    texto.style.margin = "4px 0 0";
    titulo.textContent = etiqueta;
    texto.textContent = valor;
    contenedor.appendChild(titulo);
    contenedor.appendChild(texto);

    return contenedor;
}

// Funcion para crear cada bloque de estadisticas
function crearArticuloEstadistica(documento, valor, etiqueta) {
    const articulo = documento.createElement("article");
    const numero = documento.createElement("strong");
    const texto = documento.createElement("span");

    Object.assign(articulo.style, {
        padding: "16px",
        background: "#fff",
        borderRadius: "8px",
        borderLeft: "4px solid #D49454"
    });
    numero.style.display = "block";
    numero.style.fontSize = "1.6rem";
    numero.textContent = valor;
    texto.textContent = etiqueta;
    articulo.appendChild(numero);
    articulo.appendChild(texto);

    return articulo;
}

// funcion para abrir una ventana con el detalle de una pantalla
function abrirVentanaDetalle(pantallaActual) {
    // Creamos ventana nueva
    const ventanaDetalle = window.open("", "detalle-" + pantallaActual.referencia, "width=520,height=620");

    // Si el navegador bloquea la ventana, avisamos
    if (!ventanaDetalle) {
        mostrarEstado("El navegador ha bloqueado la ventana de detalle.");
        return;
    }

    // Creamos el contenido de detalle con nodos
    const documento = prepararDocumentoVentana(ventanaDetalle, "Detalle " + pantallaActual.referencia);
    const principal = crearMainVentana(documento);
    const titulo = documento.createElement("h1");
    const referencia = documento.createElement("p");
    const imagen = documento.createElement("img");
    const listaDatos = documento.createElement("dl");

    titulo.textContent = pantallaActual.nombre;
    titulo.style.margin = "0 0 8px";
    referencia.textContent = pantallaActual.referencia;
    referencia.style.color = "#6d6d68";
    referencia.style.margin = "0 0 18px";
    imagen.src = pantallaActual.imagen;
    imagen.alt = "Imagen de " + pantallaActual.nombre;
    Object.assign(imagen.style, {
        width: "100%",
        maxHeight: "240px",
        objectFit: "contain",
        background: "#fff",
        borderRadius: "8px",
        margin: "0 0 18px",
        padding: "12px",
        boxSizing: "border-box"
    });
    Object.assign(listaDatos.style, {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px"
    });
    listaDatos.appendChild(crearDatoVentana(documento, "Tipo", pantallaActual.tipo));
    listaDatos.appendChild(crearDatoVentana(documento, "Estado", pantallaActual.estado));
    listaDatos.appendChild(crearDatoVentana(documento, "Tamano", pantallaActual.tamano + '"'));
    listaDatos.appendChild(crearDatoVentana(documento, "Precio", pantallaActual.obtenerPrecioFormateado()));
    listaDatos.appendChild(crearDatoVentana(documento, "Fabricacion", pantallaActual.fechaFabricacion));
    listaDatos.appendChild(crearDatoVentana(documento, "Dias desde fabricacion", pantallaActual.obtenerDiasDesdeFabricacion()));
    principal.appendChild(titulo);
    principal.appendChild(referencia);
    principal.appendChild(imagen);
    principal.appendChild(listaDatos);
    documento.body.appendChild(principal);
}

// funcion para abrir una ventana con estadisticas
function abrirVentanaEstadisticas() {
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
    // Pantalla mas cara
    const masCara = [...pantallas].sort((primera, segunda) => segunda.precio - primera.precio)[0];
    // Creamos ventana nueva
    const ventanaEstadisticas = window.open("", "navisson-estadisticas", "width=620,height=700");

    // Si el navegador bloquea la ventana, avisamos
    if (!ventanaEstadisticas) {
        mostrarEstado("El navegador ha bloqueado la ventana de estadisticas.");
        return;
    }

    // Creamos las estadisticas con nodos
    const documento = prepararDocumentoVentana(ventanaEstadisticas, "Estadisticas Navisson");
    const principal = crearMainVentana(documento);
    const titulo = documento.createElement("h1");
    const seccion = documento.createElement("section");
    const precioMedio = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(media);
    const pintarColumnas = () => {
        seccion.style.gridTemplateColumns = ventanaEstadisticas.innerWidth <= 560 ? "1fr" : "repeat(2, minmax(0, 1fr))";
    };

    titulo.textContent = "Estadisticas del inventario";
    titulo.style.marginTop = "0";
    Object.assign(seccion.style, {
        display: "grid",
        gap: "12px"
    });
    pintarColumnas();
    ventanaEstadisticas.addEventListener("resize", pintarColumnas);
    seccion.appendChild(crearArticuloEstadistica(documento, total, "Pantallas registradas"));
    seccion.appendChild(crearArticuloEstadistica(documento, stock, "Pantallas en stock"));
    seccion.appendChild(crearArticuloEstadistica(documento, precioMedio, "Precio medio"));
    seccion.appendChild(crearArticuloEstadistica(documento, climaTaller, "Clima taller"));
    seccion.appendChild(crearArticuloEstadistica(documento, enviadas, "Pantallas enviadas"));
    seccion.appendChild(crearArticuloEstadistica(documento, defectuosas, "Pantallas defectuosas"));
    seccion.appendChild(crearArticuloEstadistica(documento, masCara ? masCara.nombre : "Sin datos", "Pantalla de mayor precio"));
    principal.appendChild(titulo);
    principal.appendChild(seccion);
    documento.body.appendChild(principal);
}




