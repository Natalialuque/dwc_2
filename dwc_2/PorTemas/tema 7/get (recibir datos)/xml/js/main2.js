let boton = document.getElementById("boton");
let respuesta = document.getElementById("respuesta");

boton.onclick = function () {
    fetch("server/xmlNodosRepetidos.xml")
        .then(res => res.text())
        .then(xmlString => {
            let parser = new DOMParser();
            let xml = parser.parseFromString(xmlString, "text/xml");

            let empleados = xml.getElementsByTagName("empleado");
            let text = "";
            
            for (let empl of empleados) {
                let nombre = empl.getElementsByTagName("nombre")[0].textContent;
                let apellidos = empl.getElementsByTagName("apellidos")[0].textContent;

                text += nombre + " " + apellidos;
            }

            respuesta.textContent = text.trim();
        });
};

