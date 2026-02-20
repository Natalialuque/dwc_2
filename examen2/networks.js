//leer texto plano 
function leerTextoPlano(){
     fetch("server/data/normativa.txt")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("info-display").textContent = data;
    })
    .catch((err) => console.error(err));
}

//esta funcion se encarga de leer el xml y cargarlo en el select 
/**
 * cargamos el xml de categorias dentro de un select, el valor de cada lista sera el id del fichero categoria.xml y dependiendo de la urgencia se pondra de un color u otro
 */
function cargarXML() {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {if (xhr.status === 200) {
        // Aquí procesamos el XML
        let xml = xhr.responseXML;

        let categoria = xml.querySelector("categoria");
        let sele = document.getElementById("category-select");

        sele.appendChild(categoria.textContent);
        
    }
  };

  xhr.open("GET", "server/data/categorias.xml", true);
  xhr.send();
}
}

//leer jSon 
function cargarJson(){
fetch("server/datos.json")
    .then((res) => res.json())
    .then((data) => {
      
    })
    .catch((err) => console.error(err));
};




export const networks = { leerTextoPlano,cargarXML,cargarJson};
 