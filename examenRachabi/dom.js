/**
 * Dibuja un elemento en el contenedor de vehículos
 * @param {import("./global.js").Vehiculo} param0 
 */
export function crearNodoVehiculo({id, imagenes, tipo, modelo, plazas, logintud, anchura, altura, equipamiento, disponibilidad}) {
  const elementoVehiculo = document.createElement("div")
  elementoVehiculo.classList.add("vehicle-card")
  elementoVehiculo.id = id

  const elementoImagen = document.createElement("img")
  elementoImagen.src = imagenes[0]
  elementoVehiculo.appendChild(elementoImagen)

  const elementoInfo = document.createElement("div")
    elementoInfo.classList.add("vehicle-info")

    const elementoTipo = document.createElement("h3")
      elementoTipo.appendChild(document.createTextNode(tipo))
    elementoInfo.appendChild(elementoTipo)

    const elementoModelo = document.createElement("h3")
      elementoModelo.appendChild(document.createTextNode(modelo))
    elementoInfo.appendChild(elementoModelo)

    elementoInfo.appendChild(document.createElement("hr"))

    const elementoParrafoPlazas = document.createElement("p")
      const elementoLabelBoldPlazas = document.createElement("b")
        elementoLabelBoldPlazas.appendChild(document.createTextNode("Plazas:"))
      elementoParrafoPlazas.appendChild(elementoLabelBoldPlazas)

      elementoParrafoPlazas.appendChild(document.createTextNode(plazas.para_viajar))
    elementoInfo.appendChild(elementoParrafoPlazas)

    const elementoParrafoLong = document.createElement("p")
      const elementoLabelBoldLong = document.createElement("b")
        elementoLabelBoldLong.appendChild(document.createTextNode("Longitud:"))
      elementoParrafoLong.appendChild(elementoLabelBoldLong)

      elementoParrafoLong.appendChild(document.createTextNode(`${logintud}. Anchura: ${anchura}. Altura: ${altura}`))
    elementoInfo.appendChild(elementoParrafoLong)

    const elementoParrafoEquip = document.createElement("p")
      const elementoLabelBoldEquip = document.createElement("b")
        elementoLabelBoldEquip.appendChild(document.createTextNode("Equipamiento:"))
      elementoParrafoEquip.appendChild(elementoLabelBoldEquip)

      elementoParrafoEquip.appendChild(document.createTextNode(equipamiento.join(", ")))
    elementoInfo.appendChild(elementoParrafoEquip)

    const elementoParrafoDisp = document.createElement("p")
      elementoParrafoDisp.style.color = "#d15f43"
      
      elementoParrafoDisp.appendChild(document.createTextNode(`${disponibilidad ? "No" : ""} disponible`))
    elementoInfo.appendChild(elementoParrafoDisp)

    const elementoBoton = document.createElement("button")
      elementoBoton.classList.add("btn")
      elementoBoton.appendChild(document.createTextNode("Reservar"))
    elementoInfo.appendChild(elementoBoton)

  elementoVehiculo.appendChild(elementoInfo)

  return elementoVehiculo
}