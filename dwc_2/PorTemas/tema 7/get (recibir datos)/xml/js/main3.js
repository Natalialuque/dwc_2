let boton = document.getElementById("boton");
let respuesta = document.getElementById("respuesta");

boton.onclick = function () {
    fetch("server/xmlConAtributos.xml")
        .then(res => res.text())
        .then(xmlString => {
            let parser = new DOMParser();
            let xml = parser.parseFromString(xmlString, "text/xml");


            let emp = xml.getElementsByTagName("empleado"); //leemos empleado de nuevo
            let text = "";

            for(let empl of emp){
                let id = empl.getAttribute("id"); //esto seleciona el atributo 
                let nombre = empl.getElementsByTagName("nombre")[0].textContent;

                text+="id: "+id+" nombre: "+nombre +" ---";

            }
            
            respuesta.textContent = text;



        });
};

