let boton = document.getElementById("boton");

boton.onclick=function(){
//FUNCION BASE DE XML DE LA QUE PARTEN TODAS 
fetch("archivo.xml") //cambiar nombre al archivo que corresponda
    .then(res => res.text())
    .then(xmlString => {
        let parser = new DOMParser();
        let xml = parser.parseFromString(xmlString, "text/xml");
        
        // A PARTIR DE AQUÍ CAMBIA SEGÚN EL XML
    });

}

