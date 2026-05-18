// Clase encargada de crear los nodos en JavaScript
export class Nodos {
    // Recibimos el id del contenedor donde se montara toda la aplicación
    constructor(idContenedor = "aplicacion") {
        // Guardamos el contenedor raiz para poder añadir dentro todos los nodos
        this.contenedor = document.getElementById(idContenedor);
    }

    // Crea un elemento, le pone una clase si se indica y devuelve el nodo
    crearElemento(etiqueta, clase = "") {
        // document.createElement crea el nodo indicado
        const elemento = document.createElement(etiqueta);

        // Si nos pasan una clase, se la asignamos al elemento
        if (clase) {
            elemento.className = clase;
        }

        // Devolvemos el elemento para poder seguir configurandolo
        return elemento;
    }

    // Crea un bot?n normal de la aplicación
    crearBoton(texto, clase, id = "") {
        // Creamos el bot?n con createElement
        const boton = this.crearElemento("button", clase);

        // Todos los bot?nes normales son type button para que no envien formularios sin querer
        boton.type = "button";
        // Texto que vera el usuario
        boton.textContent = texto;

        // Si el bot?n necesita id, se lo ponemos
        if (id) {
            boton.id = id;
        }

        // Devolbemos el bot?n creado
        return boton;
    }

    // Crea un titulo pequeño de seccion con etiqueta y h2
    crearTituloSeccion(etiquetaTexto, tituloTexto, idTitulo = "") {
        // Contenedor del titulo
        const contenedor = this.crearElemento("div", "titulo-seccion");
        // Texto superior pequeño
        const etiqueta = this.crearElemento("p", "etiqueta");
        // Titulo principal de esa seccion
        const titulo = document.createElement("h2");

        // Rellenamos textos
        etiqueta.textContent = etiquetaTexto;
        titulo.textContent = tituloTexto;

        // Si necesitamos localizar el titulo desde main, le ponemos id
        if (idTitulo) {
            titulo.id = idTitulo;
        }

        // Metemos los nodos en su contenedor
        contenedor.appendChild(etiqueta);
        contenedor.appendChild(titulo);

        // Devolvemos el bloque completo
        return contenedor;
    }

    // Crea una opcion de select
    crearOpcion(valor, texto) {
        // Creamos la etiqueta option
        const opcion = document.createElement("option");

        // Value es el dato real que se lee desde JavaScript
        opcion.value = valor;
        // textContent es lo que se ve en pantalla
        opcion.textContent = texto;

        // Devolvemos la opcion creada
        return opcion;
    }

    // Crea un input con su label y su zona de error
    crearCampoTexto(id, nombre, textoLabel, tipo, placeholder, idError, requerido = true) {
        // Contenedor para que label, input y error viajen juntos
        const contenedor = this.crearElemento("div", "campo-formulario");
        // Label visible para el campo
        const label = document.createElement("label");
        // Input que escribira el usuario
        const input = document.createElement("input");
        // Small para mostrar errores de validación
        const error = this.crearElemento("small", "error-campo");

        // Asociamos el label con el input
        label.htmlFor = id;
        label.textContent = textoLabel;

        // Configuramos el input
        input.id = id;
        input.name = nombre;
        input.type = tipo;
        input.placeholder = placeholder;
        input.required = requerido;

        // Evitamos sugerencias del navegador en campos de texto normales
        if (tipo === "text") {
            input.autocomplete = "off";
        }

        // El precio usa teclado decimal en móvil
        if (id === "precioPantalla") {
            input.inputMode = "decimal";
        }

        // Configuramos el nodo de error
        error.id = idError;

        // Metemos todo en el contenedor
        contenedor.appendChild(label);
        contenedor.appendChild(input);
        contenedor.appendChild(error);

        // Devolvemos el grupo de nodos
        return contenedor;
    }

    // Crea un campo para seleccionar imagen desde el equipo
    crearCampoArchivo(id, nombre, textoLabel, accept) {
        // Contenedor del campo de archivo
        const contenedor = this.crearElemento("div", "campo-formulario");
        // Label visible para el campo
        const label = document.createElement("label");
        // Input file para elegir imagen
        const input = document.createElement("input");

        // Asociamos label e input
        label.htmlFor = id;
        label.textContent = textoLabel;

        // Configuramos el input
        input.id = id;
        input.name = nombre;
        input.type = "file";
        input.accept = accept;

        // Montamos el campo
        contenedor.appendChild(label);
        contenedor.appendChild(input);

        // Devolvemos el contenedor
        return contenedor;
    }

    // Crea un select con label, opciones y error
    crearSelect(id, nombre, textoLabel, opciones, idError) {
        // Contenedor del campo para poder usarlo dentro de filas
        const contenedor = document.createElement("div");
        // Label del select
        const label = document.createElement("label");
        // Select con las opciones
        const select = document.createElement("select");
        // Small para errores
        const error = this.crearElemento("small", "error-campo");

        // Asociamos label y select
        label.htmlFor = id;
        label.textContent = textoLabel;

        // Configuramos select
        select.id = id;
        select.name = nombre;
        select.required = true;

        // Primera opcion vacia
        select.appendChild(this.crearOpcion("", "Selecciona"));

        // Recorremos las opciones recibidas y las añadimos
        opciones.forEach((opcion) => {
            select.appendChild(this.crearOpcion(opcion, opcion));
        });

        // Configuramos el nodo de error
        error.id = idError;

        // Montamos el campo completo
        contenedor.appendChild(label);
        contenedor.appendChild(select);
        contenedor.appendChild(error);

        // Devolvemos el contenedor
        return contenedor;
    }

    // Crea toda la estructura base de la aplicación dentro del contenedor raiz
    crearAplicacion() {
        // Limpiamos el contenedor por si se llama más de una vez
        this.contenedor.replaceChildren();

        // Creamos los dos bloques principales
        const cabecera = this.crearCabecera();
        const principal = this.crearPrincipal();

        // Insertamos cabecera y contenido principal en el contenedor del index
        this.contenedor.appendChild(cabecera);
        this.contenedor.appendChild(principal);
    }

    // Crea la pantalla de inicio de sesión
    crearAcceso() {
        // Capa que tapa la aplicación hasta validar usuario
        const capa = this.crearElemento("section", "capa-acceso");
        // Formulario de acceso
        const formulario = this.crearElemento("form", "formulario-acceso");
        // Logo del acceso
        const logo = this.crearElemento("img", "logo-acceso");
        // Titulo del formulario
        const titulo = document.createElement("h2");
        // Campo usuario
        const usuario = document.createElement("input");
        // Campo contraseña
        const contrasena = document.createElement("input");
        // Mensaje de error
        const error = this.crearElemento("p", "error-acceso");
        // Boton de iniciar sesión
        const boton = this.crearBoton("Iniciar sesión", "boton-principal", "botonIniciarSesion");

        // Configuramos la capa
        capa.id = "capaAcceso";
        capa.setAttribute("aria-modal", "true");
        capa.setAttribute("role", "dialog");

        // Configuramos el formulario
        formulario.id = "formularioAcceso";
        formulario.noValidate = true;

        // Configuramos logo y textos
        logo.src = "src/navisson-logo.png";
        logo.alt = "Logotipo de Navisson";
        titulo.textContent = "Acceso Navisson";

        // Configuramos usuario
        usuario.id = "usuarioAcceso";
        usuario.name = "usuario";
        usuario.type = "text";
        usuario.placeholder = "Usuario";
        usuario.autocomplete = "username";
        usuario.required = true;

        // Configuramos contraseña
        contrasena.id = "contrasenaAcceso";
        contrasena.name = "contrasena";
        contrasena.type = "password";
        contrasena.placeholder = "Contraseña";
        contrasena.autocomplete = "current-password";
        contrasena.required = true;

        // Configuramos error y bot?n
        error.id = "errorAcceso";
        boton.type = "submit";

        // Montamos el formulario de acceso
        formulario.appendChild(logo);
        formulario.appendChild(titulo);
        formulario.appendChild(usuario);
        formulario.appendChild(contrasena);
        formulario.appendChild(error);
        formulario.appendChild(boton);
        capa.appendChild(formulario);

        // Lo añadimos al body para que tape toda la ventana
        document.body.appendChild(capa);
    }

    // Crea la cabecera con logo, titulo y bot?nes
    crearCabecera() {
        // Header principal
        const cabecera = this.crearElemento("header", "cabecera-aplicacion");
        // Zona izquierda con logo y titulo
        const contenido = this.crearElemento("div", "contenido-cabecera");
        // Logo de Navisson
        const logo = this.crearElemento("img", "logo-marca");
        // Caja de textos
        const cajaTexto = document.createElement("div");
        // Texto pequeño
        const etiqueta = this.crearElemento("p", "etiqueta");
        // Titulo grande
        const titulo = document.createElement("h1");
        // Zona de bot?nes
        const acciones = this.crearElemento("div", "acciones-cabecera");

        // Configuramos imagen
        logo.src = "src/navisson-logo.png";
        logo.alt = "Logotipo de Navisson";

        // Configuramos textos
        etiqueta.textContent = "Inventario interno";
        titulo.textContent = "Gestión de pantallas para vehículos";

        // Configuramos zona de acci?nes
        acciones.setAttribute("aria-label", "Acciones principales");
        acciones.appendChild(this.crearBoton("Estadísticas", "boton-secundario", "botonEstadísticas"));
        acciones.appendChild(this.crearBoton("Modo claro", "boton-secundario", "botonTema"));
        acciones.appendChild(this.crearBoton("Recargar JSON", "boton-secundario", "botonRecargar"));

        // Montamos cabecera izquierda
        cajaTexto.appendChild(etiqueta);
        cajaTexto.appendChild(titulo);
        contenido.appendChild(logo);
        contenido.appendChild(cajaTexto);

        // Montamos cabecera completa
        cabecera.appendChild(contenido);
        cabecera.appendChild(acciones);

        // Devolvemos la cabecera
        return cabecera;
    }

    // Crea el contenido principal: formulario e inventario
    crearPrincipal() {
        // Main principal
        const principal = this.crearElemento("main", "contenedor-aplicacion");
        // Rejilla con formulario a un lado e inventario al otro
        const rejilla = this.crearElemento("section", "rejilla-trabajo");

        // Insertamos formulario e inventario
        rejilla.appendChild(this.crearFormulario());
        rejilla.appendChild(this.crearInventario());
        principal.appendChild(rejilla);

        // Devolvemos el main
        return principal;
    }

    // Crea el formulario de alta y modificacion de pantallas
    crearFormulario() {
        // Formulario principal
        const formulario = this.crearElemento("form", "formulario-pantalla");
        // Campo oculto para saber si estamos editando
        const oculto = document.createElement("input");
        // Primera fila de tamaño y precio
        const filaTamañoPrecio = this.crearElemento("div", "fila-formulario");
        // segunda fila de tipo y estado
        const filaTipoEstado = this.crearElemento("div", "fila-formulario");
        // Label de fecha
        const labelFecha = document.createElement("label");
        // Input de fecha
        const inputFecha = document.createElement("input");
        // Error de fecha
        const errorFecha = this.crearElemento("small", "error-campo");
        // Botones del formulario
        const acciones = this.crearElemento("div", "acciones-formulario");
        // Boton guardar
        const guardar = this.crearBoton("Guardar pantalla", "boton-principal", "botonGuardar");
        // Boton cancelar
        const cancelar = this.crearBoton("Cancelar", "boton-fantasma", "botonCancelarEdicion");

        // El formulario se valida desde JavaScript
        formulario.id = "formularioPantalla";
        formulario.noValidate = true;

        // Campo oculto de edici?n
        oculto.type = "hidden";
        oculto.id = "referenciaEdicion";
        oculto.value = "";

        // Campos de tamaño y precio
        filaTamañoPrecio.appendChild(this.crearCampoTexto("tamañoPantalla", "tamaño", "Tamaño", "text", "10.1", "errorTamañoPantalla"));
        filaTamañoPrecio.appendChild(this.crearCampoTexto("precioPantalla", "precio", "Precio", "text", "249.90", "errorPrecioPantalla"));

        // Selects de tipo y estado
        filaTipoEstado.appendChild(this.crearSelect("tipoPantalla", "tipo", "Tipo", ["LCD", "OLED", "Tactil", "AMOLED", "LED"], "errorTipoPantalla"));
        filaTipoEstado.appendChild(this.crearSelect("estadoPantalla", "estado", "Estado", ["En stock", "Enviada", "Defectuosa"], "errorEstadoPantalla"));

        // Campo fecha de fabricaci?n
        labelFecha.htmlFor = "fechaPantalla";
        labelFecha.textContent = "Fecha de fabricación";
        inputFecha.id = "fechaPantalla";
        inputFecha.name = "fechaFabricación";
        inputFecha.type = "date";
        inputFecha.required = true;
        errorFecha.id = "errorFechaPantalla";

        // El bot?n guardar debe enviar el formulario
        guardar.type = "submit";

        // Montamos los bot?nes
        acciones.appendChild(guardar);
        acciones.appendChild(cancelar);

        // Montamos todo el formulario
        formulario.appendChild(this.crearTituloSeccion("Registro", "Nueva pantalla", "tituloFormulario"));
        formulario.appendChild(oculto);
        formulario.appendChild(this.crearCampoTexto("nombrePantalla", "nombre", "Nombre / modelo", "text", "Navisson Vision X7", "errorNombrePantalla"));
        formulario.appendChild(this.crearCampoTexto("referenciaPantalla", "referencia", "Referencia", "text", "NAV-2026-001", "errorReferenciaPantalla"));
        formulario.appendChild(filaTamañoPrecio);
        formulario.appendChild(filaTipoEstado);
        formulario.appendChild(labelFecha);
        formulario.appendChild(inputFecha);
        formulario.appendChild(errorFecha);
        formulario.appendChild(this.crearCampoArchivo("imagenPantalla", "imagen", "Subir imagen", "image/*"));
        formulario.appendChild(acciones);

        // Devolvemos el formulario
        return formulario;
    }

    // Crea el panel del inventario y sus filtros
    crearInventario() {
        // Panel principal
        const panel = this.crearElemento("section", "panel-inventario");
        // Zona de filtros
        const filtros = this.crearElemento("div", "filtros");
        // Buscador
        const busqueda = document.createElement("input");
        // Selects de filtro
        const filtroTipo = document.createElement("select");
        const filtroEstado = document.createElement("select");
        const orden = document.createElement("select");
        // Linea de mensajes
        const linea = this.crearElemento("p", "linea-estado");
        // Lista donde se meteran las tarjetas
        const lista = this.crearElemento("div", "lista-pantallas");

        // Configuramos filtros
        filtros.setAttribute("aria-label", "Filtros de inventario");

        // Configuramos buscador
        busqueda.id = "busquedaPantalla";
        busqueda.type = "search";
        busqueda.placeholder = "Buscar por modelo o referencia";

        // Configuramos filtro de tipo
        filtroTipo.id = "filtroTipo";
        filtroTipo.appendChild(this.crearOpcion("", "Todos los tipos"));
        ["LCD", "OLED", "Tactil", "AMOLED", "LED"].forEach((tipo) => {
            filtroTipo.appendChild(this.crearOpcion(tipo, tipo));
        });

        // Configuramos filtro de estado
        filtroEstado.id = "filtroEstado";
        filtroEstado.appendChild(this.crearOpcion("", "Todos los estados"));
        ["En stock", "Enviada", "Defectuosa"].forEach((estado) => {
            filtroEstado.appendChild(this.crearOpcion(estado, estado));
        });

        // Configuramos ordenación
        orden.id = "ordenPantallas";
        orden.appendChild(this.crearOpcion("nombre", "Ordenar por modelo"));
        orden.appendChild(this.crearOpcion("precio", "Ordenar por precio"));
        orden.appendChild(this.crearOpcion("fecha", "Ordenar por fecha"));

        // Configuramos mensaje y lista
        linea.id = "lineaEstado";
        linea.textContent = "Preparando inventario...";
        lista.id = "listaPantallas";
        lista.setAttribute("aria-live", "polite");

        // Montamos filtros
        filtros.appendChild(busqueda);
        filtros.appendChild(filtroTipo);
        filtros.appendChild(filtroEstado);
        filtros.appendChild(orden);

        // Montamos panel
        panel.appendChild(this.crearTituloSeccion("Busqueda y filtrado", "Inventario"));
        panel.appendChild(filtros);
        panel.appendChild(linea);
        panel.appendChild(lista);

        // Devolvemos el panel completo
        return panel;
    }

    // Devuelve la clase CSS según el estado de la pantalla
    obtenerClaseEstado(estado) {
        // Si está en stock usamos clase verde
        if (estado === "En stock") {
            return "stock";
        }

        // Si está enviada usamos clase naranja
        if (estado === "Enviada") {
            return "enviada";
        }

        // Cualquier otro caso en este proyecto es defectuosa
        return "defectuosa";
    }

    // Crea un dato pequeño dentro de una tarjeta
    crearDetalle(etiqueta, valor) {
        // Contenedor del dato
        const contenedor = document.createElement("div");
        // Nombre del dato
        const titulo = document.createElement("strong");
        // Valor del dato
        const texto = document.createElement("span");

        // Rellenamos textos
        titulo.textContent = etiqueta;
        texto.textContent = valor;

        // Metemos titulo y texto en el contenedor
        contenedor.appendChild(titulo);
        contenedor.appendChild(texto);

        // Devolvemos el dato completo
        return contenedor;
    }

    // Crea un bot?n de tarjeta con su acci?n y referencia asociada
    crearBotonTarjeta(texto, clase, accion, referencia) {
        // Creamos el bot?n
        const boton = document.createElement("button");

        // Configramos bot?n y datasets
        boton.type = "button";
        boton.className = clase;
        boton.dataset.accion = accion;
        boton.dataset.referencia = referencia;
        boton.textContent = texto;

        // Devolvemos el bot?n
        return boton;
    }

    // Crea una tarjeta de pantalla para el listado
    crearTarjeta(pantalla) {
        // Nodos principales de la tarjeta
        const tarjeta = document.createElement("article");
        const imagen = document.createElement("img");
        const cabecera = document.createElement("header");
        const cajaTitulo = document.createElement("div");
        const titulo = document.createElement("h3");
        const referencia = document.createElement("p");
        const insignia = document.createElement("span");
        const detalles = document.createElement("div");
        const acciones = document.createElement("div");

        // Configuramos clases y textos
        tarjeta.className = "tarjeta-pantalla";
        imagen.className = "imagen-pantalla";
        imagen.src = pantalla.imagen;
        imagen.alt = "Imagen de " + pantalla.nombre;
        imagen.addEventListener("error", () => {
            imagen.src = "src/navisson-logo.png";
        });
        titulo.textContent = pantalla.nombre;
        referencia.className = "referencia";
        referencia.textContent = pantalla.referencia;
        insignia.className = "insignia " + this.obtenerClaseEstado(pantalla.estado);
        insignia.textContent = pantalla.estado;
        detalles.className = "detalles-pantalla";
        acciones.className = "acciones-tarjeta";

        // Montamos cabecera de tarjeta
        cajaTitulo.appendChild(titulo);
        cajaTitulo.appendChild(referencia);
        cabecera.appendChild(cajaTitulo);
        cabecera.appendChild(insignia);

        // Montamos detalles de la pantalla
        detalles.appendChild(this.crearDetalle("Tipo", pantalla.tipo));
        detalles.appendChild(this.crearDetalle("Tamaño", pantalla.tamaño + '"'));
        detalles.appendChild(this.crearDetalle("Precio", pantalla.obtenerPrecioFormateado()));
        detalles.appendChild(this.crearDetalle("Fabricación", pantalla.fechaFabricación));

        // Montamos bot?nes de acci?n
        acciones.appendChild(this.crearBotonTarjeta("Ver", "boton-fantasma", "detalle", pantalla.referencia));
        acciones.appendChild(this.crearBotonTarjeta("Editar", "boton-principal", "editar", pantalla.referencia));
        acciones.appendChild(this.crearBotonTarjeta("Eliminar", "boton-peligro", "eliminar", pantalla.referencia));

        // Montamos tarjeta completa
        tarjeta.appendChild(imagen);
        tarjeta.appendChild(cabecera);
        tarjeta.appendChild(detalles);
        tarjeta.appendChild(acciones);

        // Devolvemos tarjeta
        return tarjeta;
    }

    // Crea el mensaje que aparece cuando no hay resultados
    crearEstadoVacio() {
        // Parrafo del estado vacío
        const parrafo = document.createElement("p");

        // Configuramos clase y texto
        parrafo.className = "estado-vacio";
        parrafo.textContent = "No hay pantallas que coincidan con los filtros actuales.";

        // Devolvemos el parrafo
        return parrafo;
    }
}




