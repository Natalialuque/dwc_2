let boton = document.getElementById("boton");
let respuesta = document.getElementById("respuesta");


boton.onclick=function(){
fetch("server/xmlSimple.xml") //cambiar nombre al archivo que corresponda
    .then(res => res.text())
    .then(xmlString => {
        let parser = new DOMParser();
        let xml = parser.parseFromString(xmlString, "text/xml");
        
        let nombre = xml.getElementsByTagName("nombre")[0];
        let apellidos = xml.getElementsByTagName("apellidos")[0];

        respuesta.textContent="nombre "+nombre.textContent+" apellidos "+apellidos.textContent; //el textContent es la unica forma de leer 


    });

}

