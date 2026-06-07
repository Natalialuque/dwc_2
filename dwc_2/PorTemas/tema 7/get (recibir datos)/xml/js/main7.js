let boton = document.getElementById("boton");
let respuesta = document.getElementById("respuesta");

boton.onclick=function(){
    fetch("server/categorias.xml") //cambiar nombre al archivo que corresponda
    .then(res => res.text())
    .then(xmlString => {
        let parser = new DOMParser();
        let xml = parser.parseFromString(xmlString, "text/xml");
        
        /**
         * si quisiese leet los datos de dentro de categorias */
                    // let categorias = xml.getElementsByTagName("categoria");
                    // let text = "";

                    // for(let cate of categorias){
                    //     text += cate.textContent.trim();
                    // }

                    // respuesta.textContent=text;

        /**
         * si quisiese leer los departamentos solo y meterlos en un combo y que no esten repetidos
         */
         // 1. Obtener todas las categorías
            let categorias = xml.getElementsByTagName("categoria");

            // 2. Set para evitar repetidos
            let departamentos = new Set(); //array sin elementos repetidos 

            for (let cat of categorias) {
                let dep = cat.getAttribute("departamento");
                departamentos.add(dep); // evita duplicados automáticamente
            }

           // 3. Crear el combo
            let combo = document.createElement("select");

            // 4. Añadir opciones
            for (let dep of departamentos) {
                let option = document.createElement("option");
                option.value = dep;
                option.textContent = dep;
                combo.appendChild(option);
            }

            // 5. Mostrar el combo en pantalla
            respuesta.innerHTML = "";   // limpiar antes
            respuesta.appendChild(combo);
        

    });
}