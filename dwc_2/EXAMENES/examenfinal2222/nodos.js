/**
 * funcion que crea el nodo de formulario
 * @param {} contenedor 
 */
export function crearNodoFormulario(contenedor){
    let div = document.createElement("div");

    //nombre
    let labelNombre = document.createElement("label");
    labelNombre.textContent="Nombre: "
    div.appendChild(labelNombre);
    let inputNombre = document.createElement("input");
    inputNombre.type="text";
    inputNombre.id="inputNombre";
    div.appendChild(inputNombre);
        
    div.appendChild(document.createElement("br"));

    //apellidos
    let labelApellidos = document.createElement("label");
    labelApellidos.textContent="Apellidos: "
    div.appendChild(labelApellidos);
    let inputApellidos = document.createElement("input");
    inputApellidos.type="text";
    inputApellidos.id="inputApellidos";
    div.appendChild(inputApellidos);

    div.appendChild(document.createElement("br"));

    //email
    let labelMail = document.createElement("label");
    labelMail.textContent="Email: "
    div.appendChild(labelMail);
    let inputMail = document.createElement("input");
    inputMail.type="text";
    inputMail.id="inputMail";
    div.appendChild(inputMail);

        div.appendChild(document.createElement("br"));

    //login
    let labelLogin = document.createElement("label");
    labelLogin.textContent="Login: "
    div.appendChild(labelLogin);
    let inputLogin = document.createElement("input");
    inputLogin.type="text";
    inputLogin.id="inputLogin";
    div.appendChild(inputLogin);

        div.appendChild(document.createElement("br"));

    //contraseña 
    let labelContraseña = document.createElement("label");
    labelContraseña.textContent="Contrasea¨:"
    div.appendChild(labelContraseña);
    let inputContraseña = document.createElement("input");
    inputContraseña.type="text";
    inputContraseña.id="inputContraseña";
    div.appendChild(inputContraseña);

    
    //contraseña 2
    let labelContraseña2 = document.createElement("label");
    labelContraseña2.textContent="Repetir contraseña:"
    div.appendChild(labelContraseña2);
    let inputContraseña2 = document.createElement("input");
    inputContraseña2.type="text";
    inputContraseña2.id="inputContraseña2";
    div.appendChild(inputContraseña2);

        div.appendChild(document.createElement("br"));
    //boton
    let botonEnviar = document.createElement("button");
    botonEnviar.textContent="enviar";
    botonEnviar.id="botonEnviar"
    div.appendChild(botonEnviar);


    contenedor.appendChild(div);


}