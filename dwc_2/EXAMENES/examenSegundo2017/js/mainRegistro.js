//debemos recibir la variable de usuario del LocalStorage 
window.onload = function () {
    let user = localStorage.getItem("usuario");
    document.getElementById("usuario").textContent =
        "Usuario registrado: " + user;
};

document.getElementById("aceptar").onclick = function () {
    let pass1 = document.getElementById("pass1").value.trim();
    let pass2 = document.getElementById("pass2").value.trim();

    
    //comprobar que tenga al menos 6 caracteres
    if(pass1.lenght<6 && pass2.lenght<6){
        mensajes.textContent = "Las contraseñas tiene que tener al menos 6 caracteres";
        mensajes.style.color="red";
        return;
    }

    //debe existir letra mayuscula 
    const regexMayuscula = /[A-Z]/;
    if(!regexMayuscula.test(pass1) && !regexMayuscula.test(pass2)){
        mensajes.textContent = "Las contraseñas deben contener una mayuscula";
        mensajes.style.color="red";
        return;
    }

    
    //debe existir un numero 
    const regexNumero = /[0-9]/;
    if(!regexNumero.test(pass1) && !regexNumero.test(pass2)){
        mensajes.textContent = "Las contraseñas deben contener un numero";
        mensajes.style.color="red";
        return;
    }


   //debe existir un numero 
    const regexCaracter = /[ _, ¿,?, #, -]/;
    if(!regexCaracter.test(pass1) && !regexCaracter.test(pass2)){
        mensajes.textContent = "Las contraseñas deben contener alguno de estos caracteres _ ¿ ? # -";
        mensajes.style.color="red";
        return;
    }


    //compruebas que las contraseñas no coincidan
    if (pass1 !== pass2) {
        mensajes.textContent = "Las contraseñas no coinciden";
        mensajes.style.color="red";
        return;
    }

    
    //llamas al usuario que esta introducido
    let user = localStorage.getItem("usuario");

    // Cargar arrays
    let arrayUsuarios = JSON.parse(localStorage.getItem("arrayUsuarios")) || [];
    let arrayPasswords = JSON.parse(localStorage.getItem("arrayPasswords")) || [];

    // Buscar si ya existe
    let pos = arrayUsuarios.indexOf(user);

    if (pos === -1) {
        // Usuario nuevo → lo añadimos
        arrayUsuarios.push(user);
        arrayPasswords.push(pass1);
    } 

    // Guardar arrays actualizados
    localStorage.setItem("arrayUsuarios", JSON.stringify(arrayUsuarios));
    localStorage.setItem("arrayPasswords", JSON.stringify(arrayPasswords));

    // Volver al index
    window.close();
};
   
