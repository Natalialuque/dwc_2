
// const boton = document.querySelectorAll("input")[2];
// boton.onclick=function(){
//     console.log("hola");
// }

//const boton = document.querySelector("input[value='Aceptar']");

/**
 * Nos permite llamar al boton de aceptar teniendo en cuenta que es un input hay que hacerlo asi
 */
var inputs = document.getElementsByTagName("input");
var usuario = inputs[0];
var contraseña = inputs[1];
var boton = inputs[2]; 

//añadir al body
const cuerpo = document.body;

/**
 * aqui metemos todo lo que hace el boton al pulsarse 
 */
boton.onclick=function(){

if(usuario.value.trim()==""){
    //creamos un nodo p para mostrar el erro
    let errorUsuario = document.createElement("p");
    errorUsuario.style.color="red"; //ponemos texto en rojo
    errorUsuario.textContent="no puede estar el usuario vacio"; //texto
    cuerpo.appendChild(errorUsuario);//añadimos al body
    usuario.style.border="1px solid red";//borde rojo
}else {
    // eliminar borde rojo
    usuario.style.border = "";

    // eliminar mensajes previos si existen
    let errores = cuerpo.querySelectorAll("p");
    errores.forEach(e => e.remove());
}

if(contraseña.value.trim()==""){
    //creamos un nodo p para mostrar el erro
    let errorContraseña = document.createElement("p");
    errorContraseña.style.color="red"; //ponemos texto en rojo
    errorContraseña.textContent="no puede estar la contraseña vacia"; //texto
    cuerpo.appendChild(errorContraseña);//añadimos al body
    contraseña.style.border="1px solid red";//borde rojo
}else {
    // eliminar borde rojo
    contraseña.style.border = "";

    // eliminar mensajes previos si existen
    let errores = cuerpo.querySelectorAll("p");
    errores.forEach(e => e.remove());
}

//verificar que los unicos usuarios validos son empleado y encargado
if(usuario.value.trim()!=="empleado" && usuario.value.trim()!=="encargado"){
    let errorUsu = document.createElement("p");
    errorUsu.style.color="red";
    errorUsu.textContent="usuario erroneo";
    cuerpo.appendChild(errorUsu);
}

// si es válido, lo mandamos al padre y cerramos
    window.opener.postMessage({ tipo: "usuario", nombre: usuario.value.trim().toLowerCase() }, "*");
    window.close();

}