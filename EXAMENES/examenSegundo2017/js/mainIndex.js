/**
 * Lo primero es verificar que los usuarios son correctos 
 */
let usuario = document.getElementById("user"); 
let mensajes = document.getElementById("mensajes");

document.getElementById("login").onclick = function () {

    //para controlar los intentos del inicio de sesion
    if (!sessionStorage.getItem("intentos")) {
    sessionStorage.setItem("intentos", "0");
    }


    let user = usuario.value.trim();
    let pass = document.getElementById("pass").value.trim();


    if (user !== "rrhh" && user !== "almacen") {
        mensajes.textContent = "ERROR, el usuario " + user + " es erróneo";
    } else {
        //guardamos el usuario principal
        localStorage.setItem("usuario", user);

        //carga los arrays
        let arrayUsuarios = JSON.parse(localStorage.getItem("arrayUsuarios")) || [];
        let arrayPasswords = JSON.parse(localStorage.getItem("arrayPasswords")) || [];

        // Buscar si ya tiene contraseña
        let pos = arrayUsuarios.indexOf(user);

        //si es la primera vez pues nos piramos a registro
        if(pos === -1){
            window.open(
                "registro.html",
                "registro",
                "width=400,height=300,top=100,left=100"
            );
        }
            
        // Validar contraseña y si es mas de 3 vedes incorrexta desabilitamos todo
       if (arrayPasswords[pos] !== pass) {

        // sumar intento
        let intentos = parseInt(sessionStorage.getItem("intentos"));
        intentos++;
        sessionStorage.setItem("intentos", intentos);

        mensajes.textContent = "Contraseña incorrecta. Intento " + intentos + " de 3";

        // si llega a 3 → bloquear
        if (intentos >= 3) {
            mensajes.textContent = "Has superado los 3 intentos. Usuario bloqueado.";
            document.getElementById("user").disabled = true;
            document.getElementById("pass").disabled = true;
            document.getElementById("login").disabled = true;
        }

        return;
    }

         mensajes.textContent = "Login correcto";
    }
};


