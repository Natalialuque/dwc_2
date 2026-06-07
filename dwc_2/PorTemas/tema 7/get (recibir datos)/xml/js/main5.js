let boton = document.getElementById("boton");
let respuesta = document.getElementById("respuesta");

boton.onclick = function () {
    fetch("server/xmlConListas.xml")
        .then(res => res.text())
        .then(xmlString => {
            let parser = new DOMParser();
            let xml = parser.parseFromString(xmlString, "text/xml");

        let telefonos = xml.getElementsByTagName("tel");
        let text = " ";
        for (let t of telefonos) {
            text+=t.textContent+"--";

        }

        respuesta.textContent=text


        });
};

