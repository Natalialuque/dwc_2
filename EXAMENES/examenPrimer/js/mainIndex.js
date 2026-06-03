/**
 * Cuando abramos esta pagina debe salir cargada la pagina de registro 
 */
window.onload=function(){
        window.open(
            "registro.html",
            "registro",
            "width=500,height=400,top=100,left=100"
        );
};

/**
 * Recibimos el usuario y lo metemos 
 */
window.addEventListener("message", function (e) {
    if (e.data.tipo === "usuario") {
        let label = document.getElementsByTagName("label")[0];
        label.textContent = "Usuario registrado: " + e.data.nombre;

        boton.disabled = !validaCampo();

    }
});


/**
 * Dependiendo de la opcion que elijamos se amplian los formularios
 */
const select = document.querySelector("select");
const body = document.body;

//creamos un contenedor para limpiar y que no se quede todo mezclado 
const contenedor = document.createElement("div");
body.appendChild(contenedor);

//nos permite ver cual selecionamos
// select.addEventListener("change", () => {

select.onchange=function(){
    contenedor.textContent=""; //para bresh 

    if(select.value.trim()==="empleado"){
        let div1 = document.createElement("div");
        let labelNumeIncidencia = document.createElement("label");
        labelNumeIncidencia.textContent ="numero incidencia";
        div1.appendChild(labelNumeIncidencia);
        let textNumIncidencia = document.createElement("input");
        textNumIncidencia.id = "numIncidencias";   // para poder llamarlo
        div1.appendChild(textNumIncidencia);

        contenedor.appendChild(div1);


        let div2 = document.createElement("div");
        let labelIncidencia = document.createElement("label");
        labelIncidencia.textContent =" incidencia";
        div2.appendChild(labelIncidencia);
        let textIncidencia = document.createElement("textArea");
        div2.appendChild(textIncidencia);

        contenedor.appendChild(div2);

    }else {
        //lista desplegable 
        let div1 = document.createElement("div");
        let labelDepartamento = document.createElement("label");
        labelDepartamento.textContent="Departamento";
        div1.appendChild(labelDepartamento);
        let listaDesplegable = document.createElement("select");
        let op1 = document.createElement("option");
            op1.value = "contabilidad";
            op1.textContent = "Contabilidad";      
            listaDesplegable.appendChild(op1);     
        let op2 = document.createElement("option");
            op2.value = "direccion";
            op2.textContent = "Direccion";      
            listaDesplegable.appendChild(op2);  
       
        div1.appendChild(listaDesplegable);


        contenedor.appendChild(div1);


        //textArea de asunto
        let div2 = document.createElement("div");
        let labelAsunto = document.createElement("label");
        labelAsunto.textContent =" Asunto   ";
        div2.appendChild(labelAsunto);
        let textAsunto = document.createElement("textArea");
        div2.appendChild(textAsunto);

        contenedor.appendChild(div2);
    }

        boton.disabled = !validaCampo();
};

/**
 * Ahora necesitamos una funcion para validar los campos 
 */

//primero vamos a tener una para mostrar errores 

function mostrarError(t) {
    const divErrores = document.getElementById("div2");
    const p = document.createElement("p");
    p.style.color = "red";
    p.textContent = t;
    divErrores.appendChild(p);
}


//ahora vamos a crear la funcion para validar campos, tener en cuenta que dos vienen del html y uno de aqui 
var inputs = document.getElementsByTagName("input");
var dni = inputs[4];
var email = inputs[5];
var boton = inputs[0];

boton.disabled=true;
function validaCampo(){

    document.getElementById("div2").innerHTML = "";
    let valido = true;

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexDNI = /^[0-9]{8}[A-Za-z]$/;
    const regexNumeros = /^[0-9]+$/;

    // VALIDACIÓN DE USUARIO
    const labelUsuario = document.getElementsByTagName("label")[0];
    if (!labelUsuario || !labelUsuario.textContent.includes("Usuario registrado:")) {
        mostrarError("Debe registrarse antes de enviar el formulario");
        valido = false;
    }

    // VALIDACIÓN DE DNI
    // Mostrar error SOLO si ha escrito algo
    if (dni.value.trim() !== "" && !regexDNI.test(dni.value.trim())) {
        dni.style.border = "2px solid red";
        mostrarError("El DNI no es válido (formato: 12345678A)");
    } else {
        dni.style.border = "";
    }

    // Para activar el botón: DNI vacío = inválido
    if (dni.value.trim() === "" || !regexDNI.test(dni.value.trim())) {
        valido = false;
    }

    // VALIDACIÓN DE EMAIL
    if (email.value.trim() !== "" && !regexEmail.test(email.value.trim())) {
        email.style.border = "2px solid red";
        mostrarError("El email no es válido");
    } else {
        email.style.border = "";
    }

    if (email.value.trim() === "" || !regexEmail.test(email.value.trim())) {
        valido = false;
    }

    // VALIDACIÓN DE INCIDENCIAS (solo empleado)
    const cargo = document.querySelector("select").value;

    if (cargo === "empleado") {
        const numInc = document.getElementById("numIncidencias");

        // Mostrar error SOLO si ha escrito algo
        if (numInc && numInc.value.trim() !== "" && !regexNumeros.test(numInc.value.trim())) {
            numInc.style.border = "2px solid red";
            mostrarError("El número de incidencias debe contener solo números");
        } else if (numInc) {
            numInc.style.border = "";
        }

        // Para activar el botón: vacío = inválido
        if (!numInc || numInc.value.trim() === "" || !regexNumeros.test(numInc.value.trim())) {
            valido = false;
        }
    }

    return valido;
}


/**
 * Necesitamos ahora la parte de activar o desactivar boton para que se verifique esa funcion 
 */
document.addEventListener("input", () => {
    boton.disabled = !validaCampo();

});




/**
 * el enviando formulario con el onSubmit
 */
// Convertir el botón en submit sin tocar el HTML
document.querySelector('input[value="Enviar"]').type = "submit";

// Añadir el onsubmit al formulario sin tocar el HTML
document.querySelector("form").onsubmit = enviarFormulario;

function enviarFormulario(e) {

    e.preventDefault();

    const acepto = document.querySelector('input[name="condiciones"][value="si"]');

    if (!acepto.checked) {
        alert("Debe aceptar las condiciones antes de enviar.");
        return false;
    }

    alert("Enviando formulario...");
    return true;
}
