import { Partido } from "./libreria.js";
// funcion que muestra los partidos
export function mostrarPartidos(partidos) {
    const contenedorPrincipal = document.getElementById("partidosHoy");
    contenedorPrincipal.style.flexDirection = "row";

    document.getElementById("clasificacion").style.display = "block";
    document.getElementById("titulo").innerText = "Partidos Hoy";

    // borro si hay algo
    const navExistente = contenedorPrincipal.querySelector(".nav-paginacion");
    if (navExistente) navExistente.remove();

    const rejillaExistente = document.getElementById("rejillaPartidos");
    if (rejillaExistente) rejillaExistente.remove();

    const avisoPrevio = contenedorPrincipal.querySelector("h2:not(.seccion-clasificacion h2)");
    if (avisoPrevio) avisoPrevio.remove();

    if (!partidos || partidos.length === 0) {
        const avisoNoHay = createNode("h2", "No hay partidos para mostrar en este momento.");
        avisoNoHay.style.textAlign = "center";
        avisoNoHay.style.marginTop = "50px";
        avisoNoHay.style.color = "var(--text-secondary)";
        contenedorPrincipal.appendChild(avisoNoHay);
        return;
    }

    const rejilla = createNode("div");
    rejilla.className = "partidos-grid";
    rejilla.id = "rejillaPartidos";

    partidos.forEach(datos => {
        // se crea el objeto Partido con los datos que llegan de la API
        const partido = new Partido(datos);

        const tarjeta = createNode("div");
        tarjeta.className = "tarjetaPartido";
        tarjeta.id = "partido-" + partido.id;

        // crear el title para el partido
        let infoTitle = partido.local + " vs " + partido.visitante + "\n";
        infoTitle += "Competición: " + partido.nombreCompeticion + "\n";
        infoTitle += "Estado: " + partido.getEtiquetaEstado() + "\n";
        if (partido.estaEnDirecto() || partido.estaFinalizado()) {
            infoTitle += "Resultado: " + partido.golesLocal + " - " + partido.golesVisitante + "\n";
        } else {
            infoTitle += "Hora: " + partido.getHoraFormateada();
        }
        tarjeta.title = infoTitle;

        // cabecera con logo y nombre de la competicion
        const cabeceraTarjeta = createNode("div");
        cabeceraTarjeta.className = "tarjeta";

        const logoLiga = createNode("img");
        logoLiga.src = partido.escudoCompeticion;
        logoLiga.className = "league-logo";

        const nombreLiga = createNode("span", partido.nombreCompeticion);

        cabeceraTarjeta.appendChild(logoLiga);
        cabeceraTarjeta.appendChild(nombreLiga);

        const contenedorEquipos = createNode("div");
        contenedorEquipos.className = "contenedorEquipos";

        // equipo local
        const divLocal = createNode("div");
        divLocal.className = "equipo";
        const imgLocal = createNode("img");
        imgLocal.src = partido.escudoLocal;
        const nombreLocal = createNode("p", partido.local);
        divLocal.appendChild(imgLocal);
        divLocal.appendChild(nombreLocal);

        // marcador central
        const centroMarcador = createNode("div");
        centroMarcador.className = "marcador";

        const textoHoraElemento = createNode("span", partido.getTextoCentro());
        textoHoraElemento.className = "horaPartido";

        const marcadorEstado = createNode("div", partido.getEtiquetaEstado());
        marcadorEstado.className = "logoEquipo";

        if (partido.estaEnDirecto()) {
            textoHoraElemento.style.color = "#ff4d4d";
            marcadorEstado.style.color = "#ff4d4d";
            marcadorEstado.style.border = "1px solid #ff4d4d";
            marcadorEstado.style.padding = "2px 6px";
            marcadorEstado.style.borderRadius = "4px";
            marcadorEstado.style.fontSize = "10px";
            marcadorEstado.style.backgroundColor = "rgba(255, 71, 87, 0.1)";
        }

        centroMarcador.appendChild(textoHoraElemento);
        centroMarcador.appendChild(marcadorEstado);

        // equipo visitante
        const divVisitante = createNode("div");
        divVisitante.className = "equipo";
        const imgVisitante = createNode("img");
        imgVisitante.src = partido.escudoVisitante;
        const nombreVisitante = createNode("p", partido.visitante);
        divVisitante.appendChild(imgVisitante);
        divVisitante.appendChild(nombreVisitante);

        contenedorEquipos.appendChild(divLocal);
        contenedorEquipos.appendChild(centroMarcador);
        contenedorEquipos.appendChild(divVisitante);

        tarjeta.appendChild(cabeceraTarjeta);
        tarjeta.appendChild(contenedorEquipos);
        rejilla.appendChild(tarjeta);
    });

    // se usa prepend para que se inserte antes
    contenedorPrincipal.prepend(rejilla);
}

// funcion que muestra la clasificación
export function mostrarClasificacion(clasificacion) {
    const contenedorAside = document.getElementById("clasificacion");
    contenedorAside.style.display = "block";
    // se limpia todo lo que hay menos el h2 con el titulo
    const h2 = contenedorAside.querySelector("h2");
    contenedorAside.innerHTML = "";
    if (h2) contenedorAside.appendChild(h2);

    // crear tabla y encabezado
    const tabla = createNode("table");
    tabla.className = "tabla-clasificacion";

    const encabezado = createNode("thead");
    const filaTitulos = createNode("tr");

    // columnas de la clasificacion que voy a usar
    const columnas = ["Pos", "Equipo", "PJ", "DG", "Pts"];
    columnas.forEach(texto => {
        const th = createNode("th", texto);
        filaTitulos.appendChild(th);
    });

    encabezado.appendChild(filaTitulos);
    tabla.appendChild(encabezado);

    // cuerpo
    const cuerpoTabla = createNode("tbody");

    clasificacion.forEach(equipo => {
        const fila = createNode("tr");

        const tdPos = createNode("td", equipo.position);
        tdPos.className = "col-pos";

        const tdEquipo = createNode("td");
        tdEquipo.className = "col-equipo";

        const imgEscudo = createNode("img");
        imgEscudo.src = equipo.team.crest;
        imgEscudo.className = "mini-escudo";

        const nombreEquipo = createNode("span", equipo.team.shortName);

        tdEquipo.appendChild(imgEscudo);
        tdEquipo.appendChild(nombreEquipo);

        const tdPJ = createNode("td", equipo.playedGames);
        const tdGD = createNode("td", equipo.goalDifference);
        const tdPts = createNode("td", equipo.points);
        tdPts.className = "col-pts";

        fila.appendChild(tdPos);
        fila.appendChild(tdEquipo);
        fila.appendChild(tdPJ);
        fila.appendChild(tdGD);
        fila.appendChild(tdPts);

        cuerpoTabla.appendChild(fila);
    });

    tabla.appendChild(cuerpoTabla);
    contenedorAside.appendChild(tabla);
}

export function mostrarEquipos(equipos) {
    const contenedorPrincipal = document.getElementById("partidosHoy");
    contenedorPrincipal.style.flexDirection = "column";
    // cambiar el valor de h1
    document.getElementById("titulo").innerText = "Equipos";

    // quito la clasificacion
    document.getElementById("clasificacion").style.display = "none";

    // Borrar contenido previo
    const rejillaExistente = document.getElementById("rejillaPartidos");
    if (rejillaExistente) rejillaExistente.remove();

    const avisoPrevio = contenedorPrincipal.querySelector("h2:not(.seccion-clasificacion h2)");
    if (avisoPrevio) avisoPrevio.remove();

    if (!equipos || equipos.length === 0) {
        const mensaje = createNode("h2", "No se encontraron equipos.");
        contenedorPrincipal.appendChild(mensaje);
        return;
    }

    const navExistente = contenedorPrincipal.querySelector(".nav-paginacion");
    if (navExistente) navExistente.remove();

    // crear enlaces 
    const anterior = createNode("a", "Anterior");
    anterior.id = "anteriorEquipo";

    const siguiente = createNode("a", "Siguiente");
    siguiente.id = "siguienteEquipo";

    const navPaginacion = createNode("div", "");
    navPaginacion.className = "nav-paginacion";
    navPaginacion.appendChild(anterior);
    navPaginacion.appendChild(siguiente);
    contenedorPrincipal.appendChild(navPaginacion);

    // crear la tabla y la cabecera
    const tabla = createNode("table", "");
    tabla.id = "rejillaPartidos";
    tabla.className = "tabla-equipos";

    const thead = createNode("thead", "");
    const trHead = createNode("tr", "");

    // columnas
    trHead.appendChild(createNode("th", "Escudo"));
    trHead.appendChild(createNode("th", "Nombre"));
    trHead.appendChild(createNode("th", "Fundado"));
    trHead.appendChild(createNode("th", "Estadio"));
    trHead.appendChild(createNode("th", "Favorito"));
    trHead.appendChild(createNode("th", "Web"));

    thead.appendChild(trHead);
    tabla.appendChild(thead);

    const tbody = createNode("tbody", "");

    equipos.forEach(equipo => {
        const fila = createNode("tr", "");

        // escudo
        const tdEscudo = createNode("td", "");
        const img = createNode("img", "");
        img.src = equipo.crest;
        img.className = "img-escudo";
        tdEscudo.appendChild(img);

        // nombre
        const tdNombre = createNode("td", equipo.shortName);
        tdNombre.className = "td-nombre";

        // año
        const tdFundado = createNode("td", equipo.founded || "---");

        // estadio
        const tdEstadio = createNode("td", equipo.venue || "N/A");
        
        // favorito
        const tdFav = createNode("td");
        tdFav.id = "tdFav";

        let fav = false;

        // si no existe crea un array vacio
        let arrayFav = JSON.parse(localStorage.getItem("favoritos")) || {};
        // si es undefined lo convierte en false
        fav = !!arrayFav[equipo.shortName]

        let nodo = "";

        if(fav) {
            nodo = createNode("p", "Favorito guardado");
            nodo.id = "favGuardado";
        }
        else {
            nodo = createNode("button", "Marcar favorito");
            nodo.id = "guardarFav";
            // dataset guarda los datos que yo quiera dentro del mismo botón
            nodo.dataset.shortName = equipo.shortName;
            nodo.dataset.founded = equipo.founded || "---";
            nodo.dataset.venue = equipo.venue || "N/A";
            nodo.dataset.crest = equipo.crest;
            nodo.dataset.website = equipo.website;
        }

        tdFav.appendChild(nodo);

        // Celda Web
        const tdWeb = createNode("td", "");
        if (equipo.website) {
            const link = createNode("a", "Sitio Web");
            link.href = equipo.website;
            link.target = "_blank";
            link.className = "link-web";
            tdWeb.appendChild(link);
        }

        // Unir todo
        fila.appendChild(tdEscudo);
        fila.appendChild(tdNombre);
        fila.appendChild(tdFundado);
        fila.appendChild(tdEstadio);
        fila.appendChild(tdFav);
        fila.appendChild(tdWeb);
        tbody.appendChild(fila);
    });

    tabla.appendChild(tbody);
    contenedorPrincipal.appendChild(tabla);
}

// funcion que carga los nuevos equipos
export async function cargarNuevosEquipos(offset, equipos) {
    try {
        await fetch('/server/equipos/equipos.php?offset=' + offset);
        // se le añade el date now para que lea el archivo real y no el que esta guardado en cache
        const respE = await fetch("/server/equipos/equipos.json?t=" + Date.now());
        equipos = await respE.json();
        equipos = equipos.teams;
        mostrarEquipos(equipos);
    } catch (error) {
        console.error("Error cargando equipos:", error);
    }
}

export function mostrarTodasClasificaciones(clasificaciones) {
    const contenedorPrincipal = document.getElementById("partidosHoy");
    contenedorPrincipal.style.flexDirection = "column";

    document.getElementById("titulo").innerText = "Clasificaciones";
    document.getElementById("clasificacion").style.display = "none";

    // limpiar contenido previo
    const rejillaExistente = document.getElementById("rejillaPartidos");
    if (rejillaExistente) rejillaExistente.remove();

    const navExistente = contenedorPrincipal.querySelector(".nav-paginacion");
    if (navExistente) navExistente.remove();

    const avisoPrevio = contenedorPrincipal.querySelector("h2:not(.seccion-clasificacion h2)");
    if (avisoPrevio) avisoPrevio.remove();

    const contenedorClasificaciones = createNode("div");
    contenedorClasificaciones.id = "rejillaPartidos";
    contenedorClasificaciones.className = "grid-clasificaciones";

    const ligas = [
        { clave: "LaLiga",        nombre: "La Liga"        },
        { clave: "PremierLeague", nombre: "Premier League" },
        { clave: "SerieA",        nombre: "Serie A"        },
        { clave: "Ligue1",        nombre: "Ligue 1"        },
        { clave: "Bundesliga",    nombre: "Bundesliga"     }
    ];

    for (let i = 0; i < ligas.length; i++) {
        const clave  = ligas[i].clave;
        const nombre = ligas[i].nombre;
        const tabla  = clasificaciones[clave];

        const tarjetaLiga = createNode("div");
        tarjetaLiga.className = "tarjeta-clasificacion-liga";

        const tituloLiga = createNode("h2", nombre);
        tituloLiga.className = "titulo-clasificacion-liga";
        tarjetaLiga.appendChild(tituloLiga);

        const tablaEl = createNode("table");
        tablaEl.className = "tabla-clasificacion";

        const thead = createNode("thead");
        const filaTitulos = createNode("tr");
        const columnas = ["Pos", "Equipo", "PJ", "DG", "Pts"];

        for (let c = 0; c < columnas.length; c++) {
            filaTitulos.appendChild(createNode("th", columnas[c]));
        }

        thead.appendChild(filaTitulos);
        tablaEl.appendChild(thead);

        const tbody = createNode("tbody");

        for (let j = 0; j < tabla.length; j++) {
            const equipo = tabla[j];
            const fila = createNode("tr");

            const tdPos = createNode("td", equipo.position);
            tdPos.className = "col-pos";

            const tdEquipo = createNode("td");
            tdEquipo.className = "col-equipo";

            const imgEscudo = createNode("img");
            imgEscudo.src = equipo.team.crest;
            imgEscudo.className = "mini-escudo";

            const nombreEquipo = createNode("span", equipo.team.shortName);
            tdEquipo.appendChild(imgEscudo);
            tdEquipo.appendChild(nombreEquipo);

            const tdPJ  = createNode("td", equipo.playedGames);
            const tdGD  = createNode("td", equipo.goalDifference);
            const tdPts = createNode("td", equipo.points);
            tdPts.className = "col-pts";

            fila.appendChild(tdPos);
            fila.appendChild(tdEquipo);
            fila.appendChild(tdPJ);
            fila.appendChild(tdGD);
            fila.appendChild(tdPts);

            tbody.appendChild(fila);
        }

        tablaEl.appendChild(tbody);
        tarjetaLiga.appendChild(tablaEl);
        contenedorClasificaciones.appendChild(tarjetaLiga);
    }

    contenedorPrincipal.appendChild(contenedorClasificaciones);
}

function createNode(tipoNodo, tipoTexto) {
    let nodo;
    let nodoText;

    switch (arguments.length) {
        case 0:
            throw "Se necesita al menos el tipo de elemento a crear.";
        case 1:
            nodo = document.createElement(tipoNodo);
            nodo.id = "nuevoNodo";
            break;
        case 2:
            nodo = document.createElement(tipoNodo);
            nodoText = document.createTextNode(tipoTexto);
            nodo.appendChild(nodoText);
            break;
    }

    return nodo;
}