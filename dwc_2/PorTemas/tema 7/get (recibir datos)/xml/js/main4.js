let boton = document.getElementById("boton");
let respuesta = document.getElementById("respuesta");

boton.onclick = function () {
    fetch("server/xmlNodosAnidados.xml")
        .then(res => res.text())
        .then(xmlString => {
            let parser = new DOMParser();
            let xml = parser.parseFromString(xmlString, "text/xml");

           //si fuese sencillo y solo hubiese uno 
                    //let dir = xml.getElementsByTagName("direccion")[0];
                    //let calle = dir.getElementsByTagName("calle")[0].textContent;
                    //let numero = dir.getElementsByTagName("numero")[0].textContent;

            //completo
            let empleado = xml.getElementsByTagName("empleado");
            console.log(empleado.length);
            let text="";

            for(let empl of empleado){
                let dir = empl.getElementsByTagName("direccion");
                for(let di of dir){
                    let calle = di.getElementsByTagName("calle")[0].textContent;
                    let numero = di.getElementsByTagName("numero")[0].textContent;

                    text += calle+" "+numero+"---";
                }
            }


            
            respuesta.textContent = text;



        });
};

