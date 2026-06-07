let boton = document.getElementById("boton");
let respuesta = document.getElementById("respuesta");

boton.onclick=function(){
    fetch("server/xmlEjemplo1.xml") //cambiar nombre al archivo que corresponda
    .then(res => res.text())
    .then(xmlString => {
        let parser = new DOMParser();
        let xml = parser.parseFromString(xmlString, "text/xml");
        
        let mensaje = xml.getElementsByTagName("mensaje");
        let text = "";

        for (let men of mensaje){
          //  let de = men.getElementsByTagName("de")[0].textContent;
           // let para = men.getElementsByTagName("para")[0].textContent;
            let dia = men.getElementsByTagName("dia")[0].textContent;
           // let hora = men.getElementsByTagName("hora")[0].textContent;
           // let texto = men.getElementsByTagName("texto")[0].textContent;

            text += "dias "+dia+" --";
           // text += "Mensaje de "+de+" para "+para+" en el dia "+dia+" con hora "+hora+" y texto "+texto;
        }
        respuesta.textContent=text;
    });
}