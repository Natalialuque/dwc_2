import { DOMINIO, CookieUtils } from "./global.js"
import { crearNodoVehiculo } from "./dom.js"

const PILA_ERRORES = []
const HAY_SESION = CookieUtils.existeCookie("sesion")
const WEB_WORKER_CACHE = new Worker(`${DOMINIO}/worker.js`, { type: "module" }) // ya que necesito usar los ECMAScript modules (el import), tengo que crear el worker como type module

/* ELEMENTOS DEL DOM */
const ERROR_CONTAINER = document.getElementById("errores")
const INPUT_LOGIN = document.getElementById("login")
if (HAY_SESION) {
  const sesion = CookieUtils.obtenerCookie("sesion")
  INPUT_LOGIN.value = sesion
}

/**
 * Funcion main, renderiza los vehículos en su contenedor asignado
 * Tambien agrega eventos relacionados con el web worker
 */
async function main() {
  const vehiculosContenedor = document.getElementById("vehicles-container")
  const res = await fetch(`${DOMINIO}/server/vehicles.json`)

  /** @type {import("./global.js").Vehiculo[]} */
  const vehiculos = (await res.json()).vehiculos[0]

  for (const vehiculo of vehiculos) {
    const elementoVehiculo = crearNodoVehiculo(vehiculo)
    elementoVehiculo
      .querySelector("button")
      .addEventListener("click", function() {
        WEB_WORKER_CACHE.postMessage({ imagen: elementoVehiculo.querySelector("img").src })

        ERROR_CONTAINER.innerHTML += "<p style=color=\"#e76f51\">Reserva realizada con éxito</p>"

        setTimeout(() => {
          ERROR_CONTAINER.innerHTML = ""
        }, 2000);
      })

    vehiculosContenedor.appendChild(elementoVehiculo)    
  }

  /**
   * FUNCION CHILL IMPORTANTE !!!!
   */
  const xhttp = new XMLHttpRequest();
  xhttp.responseType = "document"
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const temporada_baja = this.responseXML.querySelector("temporada_baja")

      document.getElementById("TBprecioDia").textContent = temporada_baja.children.item(0).textContent
      document.getElementById("TBminDias").textContent = temporada_baja.children.item(1).textContent
      document.getElementById("TBfianza").textContent = temporada_baja.children.item(2).textContent
      document.getElementById("TBfechas").textContent = temporada_baja.children.item(3).textContent

      const temporada_media = this.responseXML.querySelector("temporada_media")

      document.getElementById("TMprecioDia").textContent = temporada_media.children.item(0).textContent
      document.getElementById("TMminDias").textContent   = temporada_media.children.item(1).textContent
      document.getElementById("TMfianza").textContent    = temporada_media.children.item(2).textContent
      document.getElementById("TMfechas").textContent    = temporada_media.children.item(3).textContent

      const temporada_alta = this.responseXML.querySelector("temporada_alta")

      document.getElementById("TAprecioDia").textContent = temporada_alta.children.item(0).textContent
      document.getElementById("TAminDias").textContent   = temporada_alta.children.item(1).textContent
      document.getElementById("TAfianza").textContent    = temporada_alta.children.item(2).textContent
      document.getElementById("TAfechas").textContent    = temporada_alta.children.item(3).textContent

      const extras = this.responseXML.querySelector("extras_incluidos")

      const extrasLista = document.getElementById("extras")
      extras.childNodes.forEach(extra => {
        if (extra.nodeName === "extra") {
          const li = document.createElement("li")
          li.textContent = extra.textContent
          extrasLista.appendChild(li)
        }
      })
    }
  }
  
  xhttp.open("GET", `${DOMINIO}/server/datos.xml`)
  xhttp.send()
}

main()

/** EVENTO DEL BOTON DE FILTRADO */
const btnAplicarFiltros = document.getElementById("apply-filters")
btnAplicarFiltros.addEventListener("click", function(e) {
  e.preventDefault()

  const inputs = [
    [ "vehicle-type", document.getElementById("vehicle-type").value ],
    [ "capacity",     document.getElementById("capacity").value ],
    [ "start-date",   document.getElementById("start-date").value ],
    [ "end-date",     document.getElementById("end-date").value ],
    [ "min-price",    document.getElementById("min-price").value ],
    [ "max-price",    document.getElementById("max-price").value]
  ]

  if (inputs.some(input => input[1] === "")) {
    ERROR_CONTAINER.innerHTML += "<br>No se han especificado correctamente algunos campos"
    return
  }

  if (!CookieUtils.existeCookie("sesion")) {
    ERROR_CONTAINER.innerHTML += "<br>No se pueden agregar filtros sin no se ha iniciado la sesión"
    return
  }

  CookieUtils.crearCookie({
    nombre: "filtros",
    valor: JSON.stringify(Object.fromEntries(inputs)),
    dias: 5
  })

  ERROR_CONTAINER.innerHTML += "<p style=color=\"#e76f51\">Se han aplicado los filtros exitósamente</p>"

  setTimeout(() => {
    ERROR_CONTAINER.innerHTML = ""
  }, 2000);
})

async function iniciarSesion() {
/** @type {HTMLInputElement} */
const inPassw = document.getElementById("pass")

const req = fetch(`${DOMINIO}/server/usuarios.php`, {
  method: "POST",
  body: JSON.stringify({ login: INPUT_LOGIN.value, password: inPassw.value })
})

/** @type {Promise<{ status, "success" | "error", rol?, "admin" | "user", fecha_registro?, string, message?, string }>} */

const res = req.then(res => res.json())
res.then(data => {
  if (data.status === "error")
    return Promise.reject(data.message)

  if (data.rol === "admin") {
    document.querySelector("header").style.backgroundColor = "var(--accent)"
    document.querySelectorAll("button").forEach(button => button.style.backgroundColor = "var(--primary)")

    document.querySelector("main").style.display = "none"
  }

  CookieUtils.crearCookie({
    nombre: "sesion",
    valor: INPUT_LOGIN.value,
    dias: 3
  })

  ERROR_CONTAINER.innerHTML += "<p style=color=\"#e76f51\">Inicio de sesión realizado con éxito</p>"

  setTimeout(() => {
    ERROR_CONTAINER.innerHTML = ""
  }, 2000);
})
}

/* EVENTO DEL BOTON LOGIN */
document
  .getElementById("Btnlogin")
  .addEventListener("click", iniciarSesion)

document
  .getElementById("BtnRegister")
  .addEventListener("click", iniciarSesion)

/* EVENTO DEL ENLACE 'Forget me!' PARA OLVIDAR TODAS LAS CREDENCIALES */
const forgetLink = document.getElementById("forget")
forgetLink.addEventListener("click", async function() {
  switch (true) {
    case document.cookie !== "": {
      document.cookie = "sesion=; max-age=0; path=/"
      document.cookie = "filtros=; max-age=0; path=/"
    }
    case localStorage.length > 0: {
      localStorage.clear()
    }
    case sessionStorage.length > 0: {
      sessionStorage.clear()
    }
    case (await caches.keys()).length > 0: {
      const mainCache = await caches.open("main")
      const mainCacheKeys = await mainCache.keys()

      console.log(mainCacheKeys)
      mainCacheKeys.forEach(key => {
        mainCache.delete(key.url)
      })
    } break
    default: PILA_ERRORES.push("No hay datos que borrar"); break
  }

  if (PILA_ERRORES.length > 0)
    PILA_ERRORES.forEach(error => ERROR_CONTAINER.appendChild(document.createTextNode(error)))
})