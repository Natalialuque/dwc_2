//variables 
let info = document.getElementById("info");//variable para mostrar el nombre de los planetas
let boton = document.getElementById("botonInsertar");//boton para subir los planetas
let color = document.getElementById("color");//para tener la variable de color 
let x = document.getElementById("textoX"); //variable x
let y = document.getElementById("textoY"); //variable y
let planeta = document.getElementById("planeta");//marcado planeta
let satelite = document.getElementById("satelite");//marcado satelite
let diametro = document.getElementById("diametro"); //coger el diametro
let nombre = document.getElementById("nombre"); //nombre del planeta
let informacion = document.getElementById("info"); //para mostrar las cosas 
let contenedorDerecha = document.getElementById("contenedorDerecha"); //donde mostramos los planetas
let errores = document.getElementById("errores"); //para enseñar los errores 

 let lista =[];
 //cuando pulsamos el boton 
 boton.onclick=function(){

    let mensajeErrores=[];
    //comprobar de que los campos no esten vacios 
    if(nombre.value.trim()===""){
        mensajeErrores.push("El nombre no puede estar vacio");
    }
     if(x.value.trim()=== ""){
        mensajeErrores.push("La X no puede estar vacia");
    }
     if(y.value.trim()=== ""){
        mensajeErrores.push("La Y no puede estar vacia");
        
    }
     if(diametro.value.trim()=== ""){
       mensajeErrores.push("El diametro no puede estar vacio");
    }
   
    
    // comprobar que al menos un radio esté seleccionado
    if (!planeta.checked && !satelite.checked) {
        mensajeErrores.push("Debes seleccionar si es planeta o satélite.");
        
    }

    // comprobar que X, Y y diámetro sean números
    if(isNaN(x.value)){
        mensajeErrores.push("La X debe ser un numero");
        
    }

    if (isNaN(y.value)) {
          mensajeErrores.push("La Y debe ser un numero");
          
    }

     if (isNaN(diametro.value)) {
          mensajeErrores.push("El diametro debe ser un numero");
          
    }

    // si hay errores, los mostramos y detenemos la ejecución
    if (mensajeErrores.length > 0) {
        errores.innerHTML = mensajeErrores.join("<br>");
        return;
    }

    errores.innerHTML=""; //para borrar el campo


     //para mostrar el nombre de los planetas o satelites
     let nombrePlaneSate = document.createElement("p");
     nombrePlaneSate.textContent = nombre.value;
     info.appendChild(nombrePlaneSate);


     //crear un nuevo planeta con la información que se necesita
     let nuevoPlaneSate = document.createElement("div");
    
     //caracteristicas que tiene que tener el planeta
     nuevoPlaneSate.style.backgroundColor=color.value;
     nuevoPlaneSate.style.width=diametro.value + "px";
     nuevoPlaneSate.style.height=diametro.value + "px";
     nuevoPlaneSate.style.borderRadius = "50%";

     //posicionamiento del planetita con las cordenadas cordenadas
     nuevoPlaneSate.style.position="absolute";
     nuevoPlaneSate.style.left=x.value +"px";//mueve por el eje x
     nuevoPlaneSate.style.top=y.value +"px";//mueve por el eje y


     //tenemos que controlar si se elegie luna o si se elige planeta 
    if (satelite.checked) {
         // aquí aplicas el borde blanco
          nuevoPlaneSate.style.border = "5px solid white";
     }


     //Añadimos el nombre del planeta/satelite dentro del div 
     nuevoPlaneSate.textContent = nombre.value;

     //Para el tema de profundidad 
     let profundidad = Math.floor(Math.random() * 101); // entre 0 y 100
     let factorEscala = 0.5 + (profundidad / 200); //para realizar la escala y que no se sobrepase
     nuevoPlaneSate.style.transform = "scale(" + factorEscala + ")";

    
     lista.push(nuevoPlaneSate);
     //añadir al contenedor 
     contenedorDerecha.appendChild(nuevoPlaneSate);




     // Añadir manejador de evento al nuevo planeta creado
    nuevoPlaneSate.addEventListener("click", function() {
        if (lista.length > 1) {
            let primero = lista[0];

            // Intercambiar coordenadas y profundidad
            let tempLeft = this.style.left;
            let tempTop = this.style.top;
            let tempTransform = this.style.transform;

            this.style.left = primero.style.left;
            this.style.top = primero.style.top;
            this.style.transform = primero.style.transform;

            primero.style.left = tempLeft;
            primero.style.top = tempTop;
            primero.style.transform = tempTransform;

            // Actualizar el orden en la lista de planetas
            let index = lista.indexOf(this);
            if (index > -1) {
                lista.splice(index, 1);
                lista.unshift(this);
            }

           // Recolocar planetas 
             contenedorDerecha.innerHTML = "";
                 for (let i = 0; i < lista.length; i++) {
                 contenedorDerecha.appendChild(lista[i]);
            }

            // Actualizar la lista de  nombres
             info.innerHTML = "";
             for (let i = 0; i < lista.length; i++) {
                let nombrePlaneSate = document.createElement("p");
                nombrePlaneSate.textContent = lista[i].textContent;
                info.appendChild(nombrePlaneSate);
            }
         }
    });

}






 /**NO ME HACE FALTA PORQUE HE USADO EL CREATEELEMENT */
/**Funcion para la creacción de nodos */
function createNode(tipoNodo, tipoTexto) {
    let nodo;
    let nodoText;

    switch(arguments.length) {
        case 0: 
            throw "Se necesita al menos el tipo de elemento a crear.";
            break;
        case 1:
            nodo = document.createElement(tipoNodo);
            nodo.onclick = changeColor;
            nodo.id = "nuevoNodo"
            break;
        case 2:
            nodo = document.createElement(tipoNodo);
            nodo.onclick = changeColor;
            nodoText = document.createTextNode(tipoTexto);
            nodo.appendChild(nodoText);
            break;
    }

    return nodo;
}

