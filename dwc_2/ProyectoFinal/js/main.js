import { mostrarClasificacion, mostrarPartidos, mostrarEquipos, cargarNuevosEquipos, mostrarTodasClasificaciones } from "./storage.js"

// lo que hago en mi aplicación es llamar al archivo php, que lo que hace es conectarse a la api football data, mira los datos de hoy y los mete en el archivo json
// para luego conectarme al json con todos los datos y asi mostrarlos

// -------------------------------------------
// A TENER EN CUENTA: YA QUE ES UNA API GRATIS SOLO TIENE 10 PETICIONES POR MINUTO, A VECES TARDARÁ EN CARGAR
// -------------------------------------------

// llamo al web worker, que se encarga de conectarse con los archivos php y json
const miWorker = new Worker('/js/network-worker.js');
let partidos = "";
let equipos = "";
let todasClasificaciones = "";
let offset = 1;
miWorker.onmessage = function (e) {

    partidos = e.data.partidos;
    const clasificacion = e.data.clasificacion;
    equipos = e.data.equipos;
    todasClasificaciones = e.data.todasClasificaciones;

    console.log(todasClasificaciones)

    mostrarPartidos(partidos);
    mostrarClasificacion(clasificacion);

    console.log(partidos);
    console.log(equipos);

};

miWorker.postMessage("");

// localStorage.clear()
console.log(JSON.parse(localStorage.getItem("favoritos")))

document.getElementById("equipos").addEventListener("click", function (e) {
    e.preventDefault();

    mostrarEquipos(equipos);
})

document.getElementById("favoritos").addEventListener("click", function(e) {
    e.preventDefault();
    const favObj = JSON.parse(localStorage.getItem("favoritos")) || {};

    // cambia los objetos a array para que el metodo lo pueda leer bien
    const favArray = Object.values(favObj);
    mostrarEquipos(favArray);
})

// cuando le de al boton en directo solo saldrán los partidos en directo
document.getElementsByClassName("btn-live")[0].addEventListener("click", function (e) {
    e.preventDefault();

    let partidosDirecto = [];

    partidos.forEach(element => {
        if (element.status === "IN_PLAY" || element.status === "PAUSED") {
            partidosDirecto.push(element);
        }
    });

    if (partidosDirecto.length === 0) {
        console.log("No hay partidos en directo ahora mismo")
    }
    else mostrarPartidos(partidosDirecto);
})

document.getElementById("competiciones").addEventListener("click", function (e) {
    e.preventDefault()
    mostrarPartidos(partidos);
})

// recargar la pagina cuando le de al logo
document.getElementsByClassName("logo-container")[0].addEventListener("click", function (e) {
    e.preventDefault()
    location.reload();
})

// detecta todos los clicks al contenedor, si ha sido a siguiente o anterior equipo se suma el offset o se resta
document.getElementById("partidosHoy").addEventListener("click", async function (e) {

    if (e.target && e.target.id === "siguienteEquipo") {
        e.preventDefault();
        offset += 50;
        await cargarNuevosEquipos(offset, equipos);
    }

    if (e.target && e.target.id === "anteriorEquipo") {
        e.preventDefault();
        if (offset >= 50) {
            offset -= 50;
            await cargarNuevosEquipos(offset, equipos);
        }
    }

    if (e.target && e.target.id === "guardarFav") {
        e.preventDefault();

        // cojo los datos que habia dentro del boton
        const shortName = e.target.dataset.shortName;
        const founded = e.target.dataset.founded;
        const venue = e.target.dataset.venue;
        const crest = e.target.dataset.crest;
        const website = e.target.dataset.website;

        const arrayFav = JSON.parse(localStorage.getItem("favoritos")) || {};

        // guardar el equipo con su nombre
        arrayFav[shortName] = { shortName, founded, venue, crest, website};
        localStorage.setItem("favoritos", JSON.stringify(arrayFav));

        // cambiar el boton 
        const tdFav = e.target.parentElement;
        tdFav.innerHTML = "";
        const confirmacion = document.createElement("p", "Favorito guardado");
        tdFav.appendChild(confirmacion);
        console.log(JSON.parse(localStorage.getItem("favoritos")))
    }
});

document.getElementById("crearEquipo").addEventListener("click", function (e) {
    e.preventDefault();
    window.open("crear-equipo.html", "CrearEquipo", "width=700,height=750,resizable=yes");
})

// mostrar todas las clasificaciones
document.getElementById("todasClasificaciones").addEventListener("click", function (e) {
    e.preventDefault()
    mostrarTodasClasificaciones(todasClasificaciones)
})




